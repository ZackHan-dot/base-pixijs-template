import { useParams } from 'react-router';
import UnoGame from './uno';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const gameComponents: { [key: string]: React.FC } = {
    uno: UnoGame,
};

const GameWrapper = ({ children }: { children: React.ReactNode }) => {
    const [isStartGame, setStartGame] = useState(false);

    return (
        <div className="w-full h-full">
            {!isStartGame && (
                <Button
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    onClick={() => setStartGame(true)}
                >
                    开始游戏
                </Button>
            )}
            {isStartGame && children}
        </div>
    );
};

export default function GameDetail() {
    const { gameId } = useParams<{ gameId: string }>();
    const GameComponent = gameComponents[gameId!];

    return (
        <div className="px-5 py-2 h-full">
            <div className="bg-gray-800 w-full h-full rounded-sm relative">
                {GameComponent ? (
                    <GameWrapper>
                        <GameComponent />
                    </GameWrapper>
                ) : (
                    <p>未找到对应的游戏</p>
                )}
            </div>
        </div>
    );
}
