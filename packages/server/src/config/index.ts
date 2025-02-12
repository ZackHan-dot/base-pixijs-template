import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// 获取当前的 NODE_ENV，默认为 'development'
const env = process.env.NODE_ENV || 'development';

// 根据 NODE_ENV 加载相应的 .env 文件
const envFilePath = path.resolve(__dirname, `../.env.${env}`);

if (fs.existsSync(envFilePath)) {
    dotenv.config({ path: envFilePath });
} else {
    console.warn(
        `Environment file ${envFilePath} not found, loading default .env file`
    );
    // 如果没有找到相应的 .env 文件，加载默认的 .env 文件
    dotenv.config();
}

export const SERVER_PORT = process.env.SERVER_PORT || 3000;
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = process.env.SMTP_PORT;
export const SMTP_SECURE = process.env.SMTP_SECURE;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;
export const SMTP_FROM = process.env.SMTP_FROM;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const REDIS_URL = process.env.REDIS_URL;
