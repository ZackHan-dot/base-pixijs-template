import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Home() {
    return (
        <div className="px-5 py-2">
            <Alert variant="info">
                <AlertTitle className="font-semibold">
                    Welcome to HzyCoder !!! 👏👏👏👏👏👏
                </AlertTitle>
                <AlertDescription>
                    "Build, Play, Connect — It's All About You."
                </AlertDescription>
            </Alert>
        </div>
    );
}
