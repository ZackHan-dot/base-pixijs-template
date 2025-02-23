import socketIo from 'socket.io';
import { GAME, ROOM } from '../constant';
import { getRedisClient } from '@/connection/redis';
import { RoomDto } from './dto/room-dto';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { REDIS_PREFIX } from '@/constant';
import { Room } from './models';
import { SocketMeta } from '../types';
import { getUnoDrawPile, shuffle } from './core';

export const registryUnoSocketService = (
    socket: SocketMeta,
    io: socketIo.Server
) => {
    const redis = getRedisClient();

    socket.on(ROOM.JOIN, async (payload: RoomDto) => {
        try {
            // 将传入的数据转换为 JoinRoomDto 实例
            const joinRoomDto = plainToClass(RoomDto, payload);

            // 验证数据
            await validateOrReject(joinRoomDto);

            if (socket.meta) {
                socket.meta.gameType = GAME.UNO;
            }

            const { roomId, player } = payload;
            console.log('Join room:', roomId, player, socket.meta);

            if (socket.meta) {
                socket.meta.id = player.id;
            }

            // 获取房间信息
            let room: Room | null = await redis
                .get(`${REDIS_PREFIX}:uno:room:${roomId}`)
                .then(data => (data ? JSON.parse(data) : null));

            if (!room) {
                room = {
                    id: roomId,
                    hostId: player.id,
                    status: 'waiting',
                    players: [],
                    currentPlayer: '',
                    currentCard: null,
                    direction: 'clockwise',
                    drawPile: [],
                    discardPile: [],
                };
            }

            // 将用户加入房间
            if (!room.players.some(p => p.id === player.id)) {
                room.players.push({ ...player, cards: [] });
            }

            await redis.set(
                `${REDIS_PREFIX}:uno:room:${roomId}`,
                JSON.stringify(room)
            );

            // 将用户加入房间的 socket room
            socket.join(roomId);

            if (socket.meta) {
                socket.meta.roomId = roomId;
            }

            // 向房间内的全部客户端广播消息
            io.to(roomId).emit(ROOM.INFO, { room, type: 'join' });
        } catch (error) {
            console.error('Validation failed:', error);
            socket.emit('error', { message: 'Invalid data', error });
        }
    });

    socket.on(ROOM.START, async (roomId: string) => {
        if (!roomId) {
            socket.emit('error', { message: 'Invalid roomId' });
            return;
        }

        const room = await redis
            .get(`${REDIS_PREFIX}:uno:room:${roomId}`)
            .then(data => (data ? JSON.parse(data) : null));
        if (!room) {
            socket.emit('error', { message: 'Room not found' });
            return;
        }
        if (room?.players?.length < 2 || room?.players?.length > 10) {
            socket.emit('error', { message: 'The game needs 2-10 players' });
            return;
        }
        if (room?.status !== 'waiting') {
            socket.emit('error', { message: 'The game has already started' });
            return;
        }
        room.players = shuffle([...room.players]);
        room.status = 'playing';
        room.currentPlayer = room.players[0].id;
        room.direction = 'clockwise';
        const totalCards = getUnoDrawPile();
        for (let i = 0; i < room.players.length; i++) {
            room.players[i].cards = totalCards.splice(0, 7);
        }
        room.drawPile = totalCards;
        room.currentCard = room.drawPile.pop() || null;
        room.discardPile = [room.currentCard];

        await redis.set(
            `${REDIS_PREFIX}:uno:room:${roomId}`,
            JSON.stringify(room)
        );

        io.to(roomId).emit(ROOM.START, room);
    });
};

export const handleUnoDisconnect = async (
    socket: SocketMeta,
    io: socketIo.Server
) => {
    const redis = getRedisClient();
    // Uno 游戏的断开处理逻辑
    const roomId = socket.meta?.roomId;

    let room: Room | null = await redis
        .get(`${REDIS_PREFIX}:uno:room:${roomId}`)
        .then(data => (data ? JSON.parse(data) : null));

    if (room) {
        room.players = room.players.filter(
            player => player.id !== socket.meta?.id
        );
        if (room.players.length === 0) {
            await redis.del(`${REDIS_PREFIX}:uno:room:${roomId}`);
            console.log(`Room ${roomId} deleted as it is empty.`);
        } else {
            if (room.hostId === socket.meta?.id) {
                room.hostId = room.players[0].id;
                console.log(
                    `Host transferred to ${room.hostId} in room ${roomId}.`
                );
            }

            await redis.set(
                `${REDIS_PREFIX}:uno:room:${roomId}`,
                JSON.stringify(room)
            );
            io.to(roomId).emit(ROOM.INFO, { room, type: 'leave' });
        }
    }
};
