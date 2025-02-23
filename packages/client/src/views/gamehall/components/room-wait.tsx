// 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果

import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@/components/ui/avatar';
import { AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users } from 'lucide-react';
import { useSelector } from 'react-redux';

interface ComponentProps {
    roomInfo: {
        id: string;
        hostId: null;
        status: string; // 'waiting' | 'playing'
        players: {
            id: number;
            name: string;
            avatar: string;
        }[];
    };
    handleStartGame?: () => void;
}

const RoomWait: React.FC<ComponentProps> = ({ roomInfo, handleStartGame }) => {
    const userId = useSelector(
        (state: { auth: { id: number } }) => state.auth?.id
    );

    return (
        <div className="h-full flex items-center justify-center p-6">
            <Card className="w-full p-8 bg-white shadow-lg rounded-sm">
                <div className="flex flex-col h-full">
                    {/* 房间信息头部 */}
                    <div className="flex justify-between items-center mb-8 border-b pb-6">
                        <div className="flex items-center gap-6">
                            <h1 className="text-3xl font-bold">
                                房间号：{roomInfo?.id}
                            </h1>
                            <Badge
                                variant="secondary"
                                className="text-lg px-4 py-1"
                            >
                                {roomInfo?.status === 'playing'
                                    ? '游戏中'
                                    : '等待中'}
                            </Badge>
                        </div>
                        {userId === roomInfo?.hostId && (
                            <Button
                                className="!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
                                onClick={handleStartGame}
                            >
                                开始游戏
                            </Button>
                        )}
                    </div>

                    {/* 玩家列表 */}
                    <ScrollArea className="flex-grow">
                        <div className="grid grid-cols-2 gap-6">
                            {roomInfo?.players?.map(player => (
                                <div
                                    key={player.name}
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
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xl font-semibold">
                                                    {player.name}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                {player.id ===
                                                    roomInfo?.hostId && (
                                                    <Badge className="bg-black">
                                                        房主
                                                    </Badge>
                                                )}
                                                <Badge className="bg-green-500">
                                                    已准备
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* 空位占位 */}
                            {Array.from({
                                length: 4 - (roomInfo?.players.length || 0),
                            }).map((_, index) => (
                                <div
                                    key={`empty-${index}`}
                                    className="flex items-center justify-center bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200"
                                >
                                    <div className="text-gray-400 flex flex-col items-center">
                                        <i className="fas fa-user-plus text-3xl mb-2"></i>
                                        <span>等待加入</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* 房间信息底部 */}
                    <div className="mt-8 pt-6 border-t">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Badge variant="outline" className="px-4 py-2">
                                    <Users width={15} className="mr-1" />
                                    {roomInfo?.players?.length || 0}/10 玩家
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default RoomWait;
