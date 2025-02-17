import Tiptap from '@/components/tiptap';

export default function Home() {
    return (
        <div className="px-5 py-2">
            <p className="mt-2 text-center font-semibold font-douyin-sans">
                Welcome to HzyCoder !!!，👏👏👏👏👏👏
            </p>
            <div className="flex flex-1 min-h-[500px] flex-col gap-4 p-4 pt-0">
                <Tiptap />
            </div>
        </div>
    );
}
