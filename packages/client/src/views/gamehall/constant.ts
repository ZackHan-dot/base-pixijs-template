export enum ROOM {
    INFO = 'ROOM_INFO', // 房间信息
    CREATE = 'ROOM_CREATE', // 创建房间
    JOIN = 'ROOM_JOIN', // 加入房间
    LEAVE = 'ROOM_LEAVE', // 离开房间
    START = 'ROOM_START', // 开始游戏
}

export enum PLAYER {
    INFO = 'PLAYER_INFO', // 玩家信息
    READY = 'PLAYER_READY', // 准备
    UNREADY = 'PLAYER_UNREADY', // 取消准备
}

export enum UNO {
    INFO = 'UNO_INFO', // 游戏信息
    PLAY = 'UNO_PLAY', // 出牌
    DRAW = 'UNO_DRAW', // 抓牌
    PASS = 'UNO_PASS', // 过牌
    PENALTY = 'UNO_PENALTY', // 惩罚
    CHANGE_COLOR = 'UNO_CHANGE_COLOR', // 换色
    DECLARE = 'UNO_DECLARE', // 声明
}
