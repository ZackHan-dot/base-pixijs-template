export interface Card {
    color: 'red' | 'yellow' | 'green' | 'blue' | 'black';
    value:
        | '0'
        | '1'
        | '2'
        | '3'
        | '4'
        | '5'
        | '6'
        | '7'
        | '8'
        | '9'
        | 'skip'
        | 'reverse'
        | 'draw2'
        | 'draw4'
        | 'wild';
}

export interface Player {
    id: number;
    name: string;
    cards: Card[];
    avatar?: string;
}

export interface Room {
    id: string;
    hostId: number;
    status: 'waiting' | 'playing';
    players: Player[];
    currentPlayer: string;
    currentCard: Card | null;
    direction: 'clockwise' | 'anticlockwise';
    drawPile: Card[]; // 抓牌堆
    discardPile: Card[]; // 弃牌堆
}
