import { Socket } from 'socket.io';

export interface SocketMeta extends Socket {
    meta?: Record<string, any>;
}
