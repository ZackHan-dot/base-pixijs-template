import 'reflect-metadata';

import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { SERVER_PORT } from './config';
import { useContainer as typeOrmUseContainer } from 'typeorm';

// 重要：必须在所有routing-controllers操作前设置容器。
// 包括引入控制器
useContainer(Container);
typeOrmUseContainer(Container);

//创建和运行服务
createExpressServer({
    controllers: [__dirname + '/controllers/*.ts'],
    middlewares: [__dirname + '/middlewares/*.ts'],
    interceptors: [__dirname + '/interceptors/*.ts'],
}).listen(SERVER_PORT);

console.log(`Server is up and running at port ${SERVER_PORT}`);
