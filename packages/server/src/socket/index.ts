import socketIo from 'socket.io';

export const registrySocketService = (io: socketIo.Server) => {
    io.on('connection', socket => {
        console.log('a user connected', socket.id);

        socket.on('disconnect', () => {
            console.log('user disconnected', socket.id);
        });
    });
};
