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
