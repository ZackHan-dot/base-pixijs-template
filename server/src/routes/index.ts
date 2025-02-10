import { resolve } from 'path';
import { RoutingControllersOptions } from 'routing-controllers';
export const routingConfigs: RoutingControllersOptions = {
    defaultErrorHandler: false,
    controllers: [resolve(__dirname, '../controllers/*.ts')],
    middlewares: [resolve(__dirname, '../middlewares/*.ts')],
    interceptors: [resolve(__dirname, '../interceptors/*.ts')],
    // auto validate entity item
    // learn more: https://github.com/typestack/class-validator
    validation: true,
};
