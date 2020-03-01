import React from 'react';

import styles from './XOField.module.css';

type Props = {
    width: number;
    height: number;
    renderElement: (x: number, y: number) => React.ReactNode
};
const XOField: React.FC<Props> = ({ width, height, renderElement }) => {
    const cssVars = {
        '--xo-game-width': width,
        '--xo-game-height': height,
    };

    const elements = Array(width * height)
        .fill(null)
        .map((_, index) => {
            const x = index % height;
            const y = Math.floor(index / width);

            return renderElement(x, y);
        });

    return (
        <div className={styles.container} style={cssVars as React.CSSProperties}>
            {elements}
        </div>
    );
};

export default XOField;
