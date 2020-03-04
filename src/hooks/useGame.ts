import { useEffect, useState } from 'react';

import {
    ActionType,
    GamePayload,
    createGameWebsocket,
    parseGameWebsocketMessage,
    removeGameWebsocket
} from '../helpers/gameWebsocket';

export function useGame(gameId: string) {
    const [game, setGame] = useState<GamePayload>();

    useEffect(() => {
        const gameWS = createGameWebsocket(gameId);

        gameWS.onmessage = (event) => {
            try {
                const { type, payload } = parseGameWebsocketMessage(event.data);

                if (type === ActionType.UpdateState ) {
                    setGame(payload);
                }
            } catch (error) {
                console.error(`Не удалось распарсить сообщение`, error);
            }
        };
        gameWS.onclose = (event) => {
            removeGameWebsocket(gameId);
            console.info('Соединение закрыто:', event);
        };
        gameWS.onerror = (error) => {
            console.error(`Ошибка соединения`, error);
        };

        return () => {
            gameWS.close(1000, 'Изменился идентификатор игры');
        };
    }, [gameId]);

    return game;
}
