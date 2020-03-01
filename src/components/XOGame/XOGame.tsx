import React, { useCallback, useState } from 'react';

import styles from './XOGame.module.css';

import XOField from '../XOField/XOField';
import XOElement from '../XOElement/XOElement';
import {
    GameState,
    GameStateStatus,
    generatePosition,
    getGameState,
    XOElementType,
    XOGameField,
} from '../../helpers/game';
import { mix } from '../../helpers/classnames';

const generateElementKey = (x: number, y: number, type?: XOElementType) => (
    `${generatePosition(x, y)}${type ? `-${type}` : ''}`
);

type ElementProps = {
    x: number;
    y: number;
    onClick: (x: number, y: number) => void;
    type?: XOElementType;
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

const XOGame: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>({ status: GameStateStatus.Process });
    const [symbol, setSymbol] = useState(XOElementType.X);
    const [game, setGame] = useState<XOGameField>({});

    const onElementClick = useCallback((x: number, y: number) => {
        const position = generatePosition(x, y);

        if (game[position] || gameState.status === GameStateStatus.Cancelled) {
            return;
        }

        const updatedGame = { ...game, [position]: symbol };

        setGame(updatedGame);
        setSymbol(symbol === XOElementType.O ? XOElementType.X : XOElementType.O);
        setGameState(getGameState(updatedGame));
    }, [game, gameState.status, symbol, setSymbol, setGame, setGameState]);

    const renderElement = useCallback((x: number, y: number) => {
        const position = generatePosition(x, y);
        const isOnWinnerRange = ('range' in gameState) &&
            gameState.range.some(key => key === position);

        return (
            <Element
                key={generateElementKey(x, y, game[position])}
                x={x}
                y={y}
                type={game[position]}
                onClick={onElementClick}
                className={isOnWinnerRange ? styles['winner-element'] : ''}
            />
        );
    }, [game, onElementClick, gameState.status]);

    const onRestartGame = useCallback(() => {
        setGameState({ status: GameStateStatus.Process });
        setGame({});
    }, [setGame]);

    return (
        <div className={styles.game}>
            <XOField
                width={3}
                height={3}
                renderElement={renderElement}
            />
            {gameState.status === GameStateStatus.Cancelled && (
                <div className={styles['game-info']}>
                    {('winner' in gameState) && (
                        <div className={styles.winner}>
                            Победили {gameState.winner.toUpperCase()}
                        </div>
                    )}
                    <button onClick={onRestartGame} className={styles.restart}>Играть заново</button>
                </div>
            )}
        </div>
    );
};

export default XOGame;
