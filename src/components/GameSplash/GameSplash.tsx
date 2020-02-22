import React from 'react';

import Image from '../Image/Image';

import styles from './GameSplash.module.css';

const GameSplash: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.splash}>
                <div className={styles.image}>
                    <Image
                        src={require('./assets/game.png')}
                        stubClassName={styles.stub}
                    />
                </div>
            </div>
        </div>
    );
};

export default GameSplash;
