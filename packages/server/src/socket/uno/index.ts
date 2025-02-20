import socketIo from 'socket.io';
import { GAME, ROOM } from '../constant';
import { getRedisClient } from '@/connection/redis';
import { RoomDto } from './dto/room-dto';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { REDIS_PREFIX } from '@/constant';
import { Room } from './models';
import { SocketMeta } from '../types';

export const registryUnoSocketService = (
    socket: SocketMeta,
    io: socketIo.Server
) => {
    const redis = getRedisClient();

    socket.on(ROOM.JOIN, async (payload: RoomDto, callback: Function) => {
        try {
            // 将传入的数据转换为 JoinRoomDto 实例
            const joinRoomDto = plainToClass(RoomDto, payload);

            // 验证数据
            await validateOrReject(joinRoomDto);

            if (socket.meta) {
                socket.meta.gameType = GAME.UNO;
            }

            const { roomId, player } = payload;
            console.log('Join room:', roomId, player);

            if (socket.meta) {
                socket.meta.email = player.email;
            }

            // 获取房间信息
            let room: Room | null = await redis
                .get(`${REDIS_PREFIX}:uno:room:${roomId}`)
                .then(data => (data ? JSON.parse(data) : null));

            if (!room) {
                room = {
                    id: roomId,
                    hostId: player.email,
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
            room.players.push({ ...player, cards: [] });
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
            io.to(roomId).emit(ROOM.INFO, room);

            callback({ code: 0, message: 'Join room success' });
        } catch (error) {
            console.error('Validation failed:', error);
            socket.emit('error', { message: 'Invalid data', error });
            callback({ code: 500, message: '网络错误' });
        }
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
            player => player.email !== socket.meta?.email
        );
        if (room.players.length === 0) {
            await redis.del(`${REDIS_PREFIX}:uno:room:${roomId}`);
            console.log(`Room ${roomId} deleted as it is empty.`);
        } else {
            if (room.hostId === socket.meta?.email) {
                room.hostId = room.players[0].email;
                console.log(
                    `Host transferred to ${room.hostId} in room ${roomId}.`
                );
            }

            await redis.set(
                `${REDIS_PREFIX}:uno:room:${roomId}`,
                JSON.stringify(room)
            );
            io.to(roomId).emit(ROOM.INFO, room);
        }
    }
};
