// Fisher-Yates 洗牌算法
export function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 随机生成一个索引
        [array[i], array[j]] = [array[j], array[i]]; // 交换元素
    }
    return array;
}

export function getUnoDrawPile() {
    const colors = ['red', 'yellow', 'green', 'blue'];
    const values = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'skip',
        'reverse',
        'draw2',
    ];
    const wilds = ['wild', 'draw4'];

    const cards: any[] = [];
    for (const color of colors) {
        for (const value of values) {
            cards.push({ color, value });
            if (value !== '0') {
                cards.push({ color, value });
            }
        }
    }
    for (const wild of wilds) {
        cards.push(...Array(4).fill({ color: 'black', value: wild }));
    }

    return shuffle(cards);
}
