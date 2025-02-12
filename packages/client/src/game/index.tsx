import { setEngine } from '@/game/app/getEngine';
import { LoadScreen } from '@/game/app/screens/LoadScreen';
import { RoomScreen } from '@/game/app/screens/RoomScreen';
import { userSettings } from '@/game/app/utils/userSettings';
import { CreationEngine } from '@/game/engine/engine';

/**
 * Importing these modules will automatically register there plugins with the engine.
 */
import '@pixi/sound';
import { useEffect, useRef } from 'react';
// import "@esotericsoftware/spine-pixi-v8";

// Create a new creation engine instance
const engine = new CreationEngine();
setEngine(engine);

export default function Game() {
    const pixiContainerRef = useRef<HTMLDivElement | null>(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (pixiContainerRef.current && !initialized.current) {
            initialized.current = true;
            const initEngine = async () => {
                // Initialize the creation engine instance
                await engine.init({
                    background: '#1E1E1E',
                    resizeOptions: {
                        minWidth: 768,
                        minHeight: 1024,
                        letterbox: false,
                    },
                    dom: pixiContainerRef.current!,
                });

                // Initialize the user settings
                userSettings.init();

                // Show the load screen
                await engine.navigation.showScreen(LoadScreen);
                // Show the main screen once the load screen is dismissed
                await engine.navigation.showScreen(RoomScreen);
            };
            initEngine();
        }
    }, []);
    return <div ref={pixiContainerRef}></div>;
}
