import Koa from 'koa';
import { resolve } from 'path';
import { Container } from 'typeorm-typedi-extensions';
import { createConnection, useContainer as useTypeOrmContainer } from 'typeorm';
import {
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USERNAME,
} from '@/config';

export const useConnection = async (koa: Koa) => {
    /** Tell TypeORM to use the container provided by this lib to resolve it's dependencies. */
    useTypeOrmContainer(Container);

    const connection = await createConnection({
        type: 'mysql',
        host: DB_HOST,
        port: +DB_PORT,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        entities: [resolve(__dirname, '../models/*.ts')],
        synchronize: false,
        logging: true,
        logger: 'advanced-console',
    });

    koa.on('close', connection.close);
};
