import { Input } from '@pixi/ui';
import { Container, Texture } from 'pixi.js';
import { engine } from '../getEngine';
import { Button } from '../ui/Button';

export class RoomScreen extends Container {
    /** Assets bundles required by this screen */
    public static assetBundles = ['main'];
    public roomContainer: Container;
    private roomId: number | null = null;
    constructor() {
        super();

        this.roomContainer = new Container();
        this.addChild(this.roomContainer);

        const playerNameInput = new Input({
            bg: Texture.from('rounded-rectangle.png'),
            nineSliceSprite: [34, 34, 34, 34],
            placeholder: '请输入您的大名',
            padding: {
                top: 11,
                right: 11,
                bottom: 11,
                left: 11,
            },
        });
        playerNameInput.width = 250;
        playerNameInput.height = 80;
        playerNameInput.x =
            engine().screen.width * 0.5 - playerNameInput.width * 0.5 - 320;
        playerNameInput.y = engine().screen.height * 0.5 - 300;
        playerNameInput.onChange.connect(value => {
            console.log('playerNameInput.onChange.connect', value);
        });
        this.roomContainer.addChild(playerNameInput);

        const input = new Input({
            bg: Texture.from('rounded-rectangle.png'),
            nineSliceSprite: [34, 34, 34, 34],
            placeholder: '请输入房间号',
            padding: {
                top: 11,
                right: 11,
                bottom: 11,
                left: 11,
            }, // alternatively you can use [11, 11, 11, 11] or [11, 11] or just 11
        });
        input.width = 350;
        input.height = 80;
        input.x = engine().screen.width * 0.5 - input.width * 0.5;
        input.y = engine().screen.height * 0.5 - 300;
        input.onChange.connect(value => {
            this.roomId = parseInt(value);
        });
        this.roomContainer.addChild(input);

        const joinRoombutton = new Button({
            text: '加入房间',
            width: 180,
            height: 80,
        });
        joinRoombutton.x = engine().screen.width * 0.5 + 270;
        joinRoombutton.y = engine().screen.height * 0.5 - 257;
        joinRoombutton.onPress.connect(this.handleJoinRoom.bind(this));
        this.roomContainer.addChild(joinRoombutton);

        // engine().socket.on('room/joined', (roomId: number) => {
        //     console.log(`roomId`);
        // });
    }

    public async show() {
        console.log('RoomScreen.show');
    }

    public async hide() {}

    public async handleJoinRoom() {
        if (!this.roomId) return;
        console.log('handleJoinRoom', this.roomId);
        engine().socket.emit('room/join', this.roomId);
    }
}
