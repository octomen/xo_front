import React, { useCallback } from 'react';

import XOField from '../XOField/XOField';
import XOElement from '../XOElement/XOElement';

import { mix } from '../../helpers/classnames';
import { BoardElements, GameStatus, removeGameWebsocket, sendGameMove } from '../../helpers/gameWebsocket';
import { useGame } from '../../hooks/useGame';

import styles from './XOGame.module.css';

const generateElementKey = (x: number, y: number, type: BoardElements) => `${x}-${y}-${type}`;

const isGameFinished = (status: GameStatus) => [GameStatus.Lose, GameStatus.Won].includes(status);

type ElementProps = {
    x: number;
    y: number;
    type: BoardElements;
    onClick: (x: number, y: number) => void;
    className?: string;
};
const Element: React.FC<ElementProps> = props => {
    const { x, y, type, className } = props;
    const onClick = useCallback(() => {
        props.onClick(props.x, props.y);
    }, [props]);

    return (
        <div
            key={generateElementKey(x, y, type)}
            className={styles.container}
            onClick={onClick}
        >
            <div className={mix(styles.element, className)} >
                <XOElement type={type} />
            </div>
        </div>
    );
};
type Props = {
    id: string;
    onGameCreate: () => void;
}
const XOGame: React.FC<Props> = ({ id, onGameCreate }) => {
    const game = useGame(id);

    const onElementClick = useCallback((x: number, y: number) => {
        if (!game) {
            return;
        }

        const { board } = game;
        const element = board[y][x];

        if (element !== BoardElements.N || isGameFinished(game.status)) {
            return;
        }

        sendGameMove(id, [x, y]);
    }, [game, id]);

    const renderElement = useCallback((x: number, y: number) => {
        if (!game) {
            return null;
        }

        return (
            <Element
                key={generateElementKey(x, y, game.board[y][x])}
                x={x}
                y={y}
                type={game.board[y][x]}
                onClick={onElementClick}
                className={isGameFinished(game.status) ? styles['winner-element'] : ''}
            />
        );
    }, [game, onElementClick]);

    const onRestartGame = useCallback(() => {
        removeGameWebsocket(id);

        onGameCreate();
    }, [id, onGameCreate]);

    return (
        <div className={styles.game}>
            <XOField
                width={3}
                height={3}
                renderElement={renderElement}
            />
            <div className={styles['game-info']}>
                {game && isGameFinished(game.status) && (
                    <div className={styles.winner}>
                        {game.status === GameStatus.Won ?
                            'Вы победили!' :
                            'Вы проиграли'
                        }
                    </div>
                )}
                <button onClick={onRestartGame} className={styles.restart}>Играть заново</button>
            </div>
        </div>
    );
};

export default XOGame;
