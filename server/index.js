const Koa = require('koa');
const Router = require('koa-router');
const Http = require('http');
const socket = require('socket.io');
const GameServer = require('./src/game.js');
const app = new Koa();
const router = new Router();

const server = Http.createServer(app.callback());

const io = socket(server);

router.get('/', ctx => {
    ctx.body = 'Hello World';
});

app.use(router.routes()).use(router.allowedMethods());

GameServer.init(io);

// 启动服务器
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
