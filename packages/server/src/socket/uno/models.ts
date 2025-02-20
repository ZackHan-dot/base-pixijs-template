export interface Card {
    color: 'red' | 'yellow' | 'green' | 'blue' | 'black';
    value: number | 'skip' | 'reverse' | 'draw2' | 'draw4' | 'wild';
}

export interface Player {
    email: string;
    name: string;
    cards: Card[];
}

export interface Room {
    id: string;
    status: 'waiting' | 'playing';
    players: Player[];
    currentPlayer: string;
    currentCard: Card | null;
    direction: 'clockwise' | 'anticlockwise';
    drawPile: Card[];
    discardPile: Card[];
}
