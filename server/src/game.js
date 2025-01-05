const API_ENUM = require('./const');
class GameServer {
    static instance;
    constructor(io) {
        this.io = io;
        this.rooms = {};
    }

    static init(io) {
        if (!GameServer.instance) {
            GameServer.instance = new GameServer(io);
        }
        GameServer.instance.io.on(
            'connection',
            GameServer.instance.connection.bind(GameServer.instance)
        );
    }

    connection(socket) {
        console.log('A player connected: ', socket.id);
        socket.on(API_ENUM.ROOM_JOIN, roomId =>
            this.handlePlayerJoin(roomId, socket)
        );

        socket.on('disconnect', () => this.disconnect(socket));
    }

    disconnect(socket) {
        console.log('A player disconnected: ', socket.id);
        this.handlePlayerLeave(socket.id);
    }

    handlePlayerJoin(roomId, socket) {
        if (!this.rooms[roomId]) {
            // 创建房间并加入玩家
            this.rooms[roomId] = {
                players: [socket.id],
                gameState: 'waiting',
            };
            socket.join(roomId);
            socket.emit('room/joined', roomId); // 成功创建房间
            console.log(`Room ${roomId} created with player ${socket.id}`);
        } else {
            this.rooms[roomId].players.push(socket.id);
            socket.join(roomId);
            socket.emit('room/joined', roomId); // 成功加入房间
            this.io.to(roomId).emit('player/joined', socket.id); // 通知其他玩家
            console.log(`${socket.id} joined room ${roomId}`);
        }
    }

    handlePlayerLeave(playerId) {
        for (const roomId in this.rooms) {
            const room = this.rooms[roomId];
            const playerIndex = room.players.indexOf(playerId);
            if (playerIndex !== -1) {
                room.players.splice(playerIndex, 1);
                this.io.to(roomId).emit('player/left', playerId); // 通知其他玩家
                console.log(`${playerId} left room ${roomId}`);

                if (room.players.length === 0) {
                    delete this.rooms[roomId];
                    console.log(`Room ${roomId} deleted as no players remain`);
                }
            }
        }
    }
}

module.exports = GameServer;
