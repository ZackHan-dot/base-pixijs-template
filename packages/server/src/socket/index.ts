import socketIo from 'socket.io';

export const registrySocketService = (io: socketIo.Server) => {
    io.on('connection', socket => {
        console.log('a user connected');
    });
};
