import 'reflect-metadata';
import Koa from 'koa';

import { useKoaServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { routingConfigs } from '@/routes';
import { SERVER_PORT } from '@/config';
import { useConnection } from '@/connection';
import passport from 'koa-passport';

const createServer = async () => {
    const koa = new Koa();

    await useConnection(koa);
    koa.use(passport.initialize());

    // 重要：必须在所有routing-controllers操作前设置容器。
    // 包括引入控制器
    useContainer(Container);

    //创建和运行服务
    const app = useKoaServer(koa, routingConfigs);
    app.listen(SERVER_PORT);
    console.log(`Server is up and running at port ${SERVER_PORT}`);
};

createServer();
