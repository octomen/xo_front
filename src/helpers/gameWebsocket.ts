import { v4 as uuid } from 'uuid';

const SERVER_URL = 'ws://37.140.186.91:8000/game';

const wsGameMap: Map<string, WebSocket> = new Map();

export enum GameStatus {
    Move = 'MOVE',
    Waiting = 'WAITING',
    Won = 'WON',
    Lose = 'LOSE',
}
export enum BoardElements {
    X = 'x',
    O = 'o',
    N = 'n',
}
export type BoardRow = [BoardElements, BoardElements, BoardElements];
export type Board = [BoardRow, BoardRow, BoardRow];
export type GamePayload = {
    board: Board;
    status: GameStatus;
}
export enum ActionType {
    UpdateState = 'UPDATE_STATE'
}

export const createGameWebsocket = (gameId: string) => {
    if (wsGameMap.has(gameId)) {
        return wsGameMap.get(gameId)!;
    }

    wsGameMap.set(gameId, new WebSocket(`${SERVER_URL}/${gameId}/${uuid()}`));

    return wsGameMap.get(gameId)!;
};

export const removeGameWebsocket = (gameId: string) => {
    if (wsGameMap.has(gameId)) {
        wsGameMap.get(gameId)!.close(1000, 'Игра завершена');
    }

    return wsGameMap.delete(gameId);
};

export const parseGameWebsocketMessage = (data: string) => {
    return JSON.parse(data) as { type: ActionType, payload: GamePayload };
};

export const sendGameMove = (gameId: string, move: [number, number]) => {
    if (!wsGameMap.get(gameId)) {
        throw new Error(`игры с id=${gameId} не существует`);
    }

    wsGameMap.get(gameId)!.send(JSON.stringify(move));
};


