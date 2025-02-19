import { useNavigate } from 'react-router';

const GameGallery = () => {
    const navigate = useNavigate();
    return (
        <div>
            <p className="text-xl mb-2 font-source-han-sans">游戏</p>
            <div className="custom-grid">
                <div
                    className="relative cursor-pointer rounded-sm overflow-hidden h-fit"
                    onClick={() => navigate('/gamehall/uno')}
                >
                    <img
                        src="/UNO_Logo.png"
                        alt="Uno"
                        className="w-full object-cover"
                    />
                    <div className="bg-black text-white p-4">
                        <p className="text-base font-source-han-sans">UNO</p>
                        <p className="text-xs text-gray-600">经典的Uno游戏</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameGallery;
