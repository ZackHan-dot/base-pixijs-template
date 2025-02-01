import { useNavigate } from 'react-router';

const GameGallery = () => {
    const navigate = useNavigate();
    return (
        <div>
            <p className="text-xl mb-2 font-douyin-sans">游戏</p>
            <div
                className="inline-block bg-white border cursor-pointer"
                onClick={() => navigate('/gamehall/uno')}
            >
                <img
                    src="/UNO_Logo.svg"
                    alt="Uno"
                    className="w-[120px] m-2 object-cover"
                />
                <div className="bg-gray-600 text-white text-center p-2 mt-2">
                    Uno
                </div>
            </div>
        </div>
    );
};

export default GameGallery;
