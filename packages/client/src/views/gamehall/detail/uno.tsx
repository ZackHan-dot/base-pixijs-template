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
import { io, Socket } from 'socket.io-client';
import { PLAYER_STATUS, ROOM } from '../constant';
import { useSelector } from 'react-redux';

export default function UnoGame() {
    const socket = useRef<Socket>();
    const [formData, setFormData] = useState({
        nickname: '',
        roomId: '',
    });
    const userEmail = useSelector(
        (state: { auth: { email: string } }) => state.auth.email
    );
    const [playerStatus, setPlayerStatus] = useState<PLAYER_STATUS>(
        PLAYER_STATUS.IDEA
    );
    const [roomInfo, setRoomInfo] = useState({
        id: '',
        hostId: '',
        status: 'waiting',
        players: [],
        currentPlayer: '',
        currentCard: null,
        direction: 'clockwise',
        drawPile: [],
        discardPile: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleJoinRoom = () => {
        socket.current?.emit(
            ROOM.JOIN,
            {
                roomId: formData.roomId,
                player: {
                    email: userEmail,
                    name: formData.nickname,
                },
            },
            (response: { code: number }) => {
                console.log(response, '加入房间响应');
                if (!response.code) {
                    setPlayerStatus(PLAYER_STATUS.JOINED_ROOM);
                }
            }
        );
    };

    useEffect(() => {
        socket.current = io();

        // 连接服务器
        socket.current?.on('connect', () => {
            console.log('Connected to server');
        });

        // 处理服务器发送的消息
        socket.current?.on(ROOM.INFO, data => {
            console.log('room info:', data);
            setRoomInfo(data);
        });

        // 断开连接
        socket.current?.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // 清理函数，在组件卸载时断开连接
        return () => {
            socket.current?.disconnect();
            socket.current?.off('connect');
            socket.current?.off(ROOM.INFO);
            socket.current?.off('disconnect');
        };
    }, []);
    return (
        <div className="uno-game">
            {playerStatus === PLAYER_STATUS.IDEA && (
                <Card className="w-[350px] rounded-sm">
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
                        <Button onClick={handleJoinRoom}>加入房间</Button>
                    </CardFooter>
                </Card>
            )}
            {playerStatus === PLAYER_STATUS.JOINED_ROOM && (
                <Card className="w-full rounded-sm">
                    <CardHeader>
                        <CardTitle>房间信息</CardTitle>
                        <CardContent>
                            <div>房间号：{roomInfo.id}</div>
                            <div>房主：{roomInfo.hostId}</div>
                            <div>房间状态：{roomInfo.status}</div>
                            {roomInfo.players?.map(
                                (player: { email: string }) => {
                                    return <div key={player!.email}></div>;
                                }
                            )}
                        </CardContent>
                    </CardHeader>
                </Card>
            )}
        </div>
    );
}
