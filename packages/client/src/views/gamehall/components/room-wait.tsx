// 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果

import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@/components/ui/avatar';
import { AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const RoomWait: React.FC = () => {
    const players = [
        {
            id: 1,
            name: '林雨薇',
            avatar: 'https://ai-public.mastergo.com/ai/img_res/ea84a1cd2e4591a7088e2da825e3717e.jpg',
            isReady: true,
            isHost: true,
            level: 28,
        },
        {
            id: 2,
            name: '赵子轩',
            avatar: 'https://ai-public.mastergo.com/ai/img_res/fd7ac3778583bb951a1c8029fe61cd95.jpg',
            isReady: true,
            isHost: false,
            level: 15,
        },
        {
            id: 3,
            name: '黄梓晨',
            avatar: 'https://ai-public.mastergo.com/ai/img_res/c4ddf05badb18870fb0145dd0ca492c9.jpg',
            isReady: false,
            isHost: false,
            level: 42,
        },
        {
            id: 4,
            name: '张雪莹',
            avatar: 'https://ai-public.mastergo.com/ai/img_res/976e11767cc01f6210b1cb3a5c2a50d6.jpg',
            isReady: false,
            isHost: false,
            level: 33,
        },
    ];

    return (
        <div className="h-full flex items-center justify-center p-6">
            <Card className="w-full p-8 bg-white shadow-lg rounded-sm">
                <div className="flex flex-col h-full">
                    {/* 房间信息头部 */}
                    <div className="flex justify-between items-center mb-8 border-b pb-6">
                        <div className="flex items-center gap-6">
                            <h1 className="text-3xl font-bold">
                                房间号：8675 9234
                            </h1>
                            <Badge
                                variant="secondary"
                                className="text-lg px-4 py-1"
                            >
                                等待中
                            </Badge>
                        </div>
                        <Button className="!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                            开始游戏
                        </Button>
                    </div>

                    {/* 玩家列表 */}
                    <ScrollArea className="flex-grow">
                        <div className="grid grid-cols-2 gap-6">
                            {players.map(player => (
                                <div
                                    key={player.id}
                                    className="flex items-center justify-between bg-gray-50 rounded-xl p-6"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <Avatar className="h-20 w-20">
                                                <AvatarImage
                                                    src={player.avatar}
                                                    alt={player.name}
                                                />
                                                <AvatarFallback>
                                                    {player.name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            {player.isHost && (
                                                <div className="absolute -top-2 -right-2">
                                                    <i className="fas fa-crown text-yellow-400 text-2xl"></i>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xl font-semibold">
                                                    {player.name}
                                                </h3>
                                                <span className="text-gray-500">
                                                    Lv.{player.level}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                {player.isReady ? (
                                                    <Badge className="bg-green-500">
                                                        已准备
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-gray-200 text-gray-600"
                                                    >
                                                        未准备
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {!player.isHost && (
                                        <Button
                                            variant="outline"
                                            className="!rounded-button whitespace-nowrap border-2 border-gray-200"
                                        >
                                            <i className="fas fa-user-minus mr-2"></i>
                                            移出房间
                                        </Button>
                                    )}
                                </div>
                            ))}
                            {/* 空位占位 */}
                            {Array.from({ length: 4 - players.length }).map(
                                (_, index) => (
                                    <div
                                        key={`empty-${index}`}
                                        className="flex items-center justify-center bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200"
                                    >
                                        <div className="text-gray-400 flex flex-col items-center">
                                            <i className="fas fa-user-plus text-3xl mb-2"></i>
                                            <span>等待加入</span>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </ScrollArea>

                    {/* 房间信息底部 */}
                    <div className="mt-8 pt-6 border-t">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Badge variant="outline" className="px-4 py-2">
                                    <i className="fas fa-users mr-2"></i>
                                    4/8 玩家
                                </Badge>
                                <Badge variant="outline" className="px-4 py-2">
                                    <i className="fas fa-clock mr-2"></i>
                                    创建于 10:30
                                </Badge>
                            </div>
                            <Button
                                variant="destructive"
                                className="!rounded-button whitespace-nowrap"
                            >
                                <i className="fas fa-sign-out-alt mr-2"></i>
                                退出房间
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default RoomWait;
