import { Socket } from 'socket.io';
import { ROOM } from '../constant';
import { getRedisClient } from '@/connection/redis';
import { RoomDto } from './dto/room-dto';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { REDIS_PREFIX } from '@/constant';
import { Room } from './models';

export const registryUnoSocketService = (socket: Socket) => {
    const redis = getRedisClient();

    socket.on(ROOM.JOIN, async (payload: RoomDto) => {
        try {
            // 将传入的数据转换为 JoinRoomDto 实例
            const joinRoomDto = plainToClass(RoomDto, payload);

            // 验证数据
            await validateOrReject(joinRoomDto);

            const { roomId, player } = payload;
            console.log('Join room:', roomId, player);

            // 获取房间信息
            let room: Room | null = await redis
                .get(`${REDIS_PREFIX}:uno:room:${roomId}`)
                .then(data => (data ? JSON.parse(data) : null));

            if (!room) {
                room = {
                    id: roomId,
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
            const roomJson = JSON.stringify(room);
            await redis.set(`${REDIS_PREFIX}:uno:room:${roomId}`, roomJson);

            // 将用户加入房间的 socket room
            socket.join(roomId);

            // 向房间内的其他客户端广播消息
            socket.to(roomId).emit(ROOM.INFO, roomJson);
        } catch (error) {
            console.error('Validation failed:', error);
            socket.emit('error', { message: 'Invalid data', error });
        }
    });
};
