export enum XOElementType {
    X = 'x',
    O = 'o'
}

export const generatePosition = (x: number, y: number) => `${x}-${y}`;

export type XOGameField = {
    [key: string]: XOElementType;
}
export type XORange = [string, string, string];
const winnerRange: Array<XORange> = [
    [0, 1, 2].map(x => generatePosition(x, 0)) as XORange,
    [0, 1, 2].map(x => generatePosition(x, 1)) as XORange,
    [0, 1, 2].map(x => generatePosition(x, 2)) as XORange,
    [0, 1, 2].map(y => generatePosition(0, y)) as XORange,
    [0, 1, 2].map(y => generatePosition(1, y)) as XORange,
    [0, 1, 2].map(y => generatePosition(2, y)) as XORange,
    [0, 1, 2].map(c => generatePosition(c, c)) as XORange,
    [0, 1, 2].map(c => generatePosition(c, 2 - c)) as XORange,
];

export enum GameStateStatus {
    Cancelled = 'cancelled',
    Process = 'process',
}
export type GameState =
    | { status: GameStateStatus.Cancelled, winner: XOElementType, range: XORange }
    | { status: GameStateStatus.Cancelled }
    | { status: GameStateStatus.Process }
export const getGameState = (game: XOGameField): GameState => {
    for (const range of winnerRange) {
        let xoType = game[range[0]];

        if (xoType && range.every(key => game[key] === xoType)) {
            return { status: GameStateStatus.Cancelled, winner: xoType, range };
        }
    }

    if (Object.keys(game).length === 9) {
        return { status: GameStateStatus.Cancelled };
    }

    return { status: GameStateStatus.Process };
};
