import { useParams } from 'react-router';
import UnoGame from './uno';

const gameComponents: { [key: string]: React.FC } = {
    uno: UnoGame,
};

export default function GameDetail() {
    const { gameId } = useParams<{ gameId: string }>();
    const GameComponent = gameComponents[gameId!];

    return (
        <div className="px-5 py-2">
            {GameComponent ? <GameComponent /> : <p>未找到对应的游戏</p>}
        </div>
    );
}
