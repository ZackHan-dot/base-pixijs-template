import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export default function UnoGame() {
    const socket = useRef<Socket>();
    const [formData, setFormData] = useState({
        nickname: '',
        roomId: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        socket.current = io();
        // 连接成功
        socket.current?.on('connect', () => {
            console.log('Connected to server');
        });

        // 处理服务器发送的消息
        socket.current?.on('message', message => {
            console.log('Message from server:', message);
        });

        // 断开连接
        socket.current?.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // 清理函数，在组件卸载时断开连接
        return () => {
            socket.current?.off('connect');
            socket.current?.off('message');
            socket.current?.off('disconnect');
            socket.current?.disconnect();
        };
    }, []);
    return (
        <div className="flex justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Uno</CardTitle>
                    <CardDescription>
                        风靡全球的纸牌游戏，支持2-10人游玩！！！
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">昵称</Label>
                                <Input
                                    id="nickname"
                                    name="nickname"
                                    value={formData.nickname}
                                    placeholder="请输入昵称"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">房间号</Label>
                                <Input
                                    id="roomId"
                                    name="roomId"
                                    value={formData.roomId}
                                    placeholder="请输入房间号"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button>加入房间</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
