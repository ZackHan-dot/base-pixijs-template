import socketIo from 'socket.io';
import { registryUnoSocketService } from './uno';

export const registrySocketService = (io: socketIo.Server) => {
    io.on('connection', socket => {
        console.log(`socket ${socket.id} connected`);

        registryUnoSocketService(socket);

        socket.on('disconnect', reason => {
            console.log(`socket ${socket.id} disconnected due to ${reason}`);
        });
    });
};
