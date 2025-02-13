import 'reflect-metadata';
import Koa from 'koa';

import { useKoaServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { routingConfigs } from '@/routes';
import { SERVER_PORT } from '@/config';
import { useConnection } from '@/connection';
import passport from 'koa-passport';
import http from 'http';
import socketIo from 'socket.io'; // 引入 socket.io
import { registrySocketService } from './socket';
import { useRedisConnection } from './connection/redis';
import logger from 'koa-logger';

const createServer = async () => {
    const koa = new Koa();

    await useConnection(koa);
    await useRedisConnection();
    koa.use(passport.initialize());

    // 使用 koa-logger 中间件
    koa.use(logger());

    // 重要：必须在所有routing-controllers操作前设置容器。
    // 包括引入控制器
    useContainer(Container);

    // 创建 HTTP 服务器
    const server = http.createServer(koa.callback());

    // 创建并配置 Socket.IO 实例
    const io = new socketIo.Server(server);

    // 注册 Socket.IO 服务
    registrySocketService(io);

    // 配置koa服务器
    useKoaServer(koa, routingConfigs);

    server.listen(SERVER_PORT, () => {
        console.log(`Server is up and running at port ${SERVER_PORT}`);
    });
};

createServer();
