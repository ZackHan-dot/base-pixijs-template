import { REDIS_URL } from '@/config';
import Redis from 'ioredis';
import { Container } from 'typedi';

export const useRedisConnection = async () => {
    const redisClient = new Redis(REDIS_URL!);
    Container.set('redis', redisClient);
};
