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
        <div className="flex flex-col items-center">
            {!isStartGame && (
                <div className="flex justify-center items-center">
                    <Button onClick={() => setStartGame(true)}>开始游戏</Button>
                </div>
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
            <div className="bg-gray-800 h-full rounded-sm relative flex justify-center items-center">
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
