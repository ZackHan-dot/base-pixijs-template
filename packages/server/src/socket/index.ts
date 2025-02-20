import socketIo from 'socket.io';
import { handleUnoDisconnect, registryUnoSocketService } from './uno';
import { GAME } from './constant';
import { SocketMeta } from './types';

export const registrySocketService = (io: socketIo.Server) => {
    io.on('connection', (socket: SocketMeta) => {
        console.log(`socket ${socket.id} connected`);
        socket.meta = {};

        registryUnoSocketService(socket, io);

        socket.on('disconnect', async () => {
            console.log(`socket ${socket.id} disconnected`, socket.meta);
            try {
                if (socket.meta?.gameType === GAME.UNO) {
                    await handleUnoDisconnect(socket, io);
                } else {
                    console.warn(`Unknown game type for socket ${socket.id}`);
                }
            } catch (error) {
                console.error('Error handling disconnect:', error);
            }
        });
    });
};
