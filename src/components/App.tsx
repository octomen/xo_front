import React from 'react';

import GameSplash from './GameSplash/GameSplash';

import styles from './App.module.css';

function App() {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                XO games are coming
            </header>
            <GameSplash/>
        </div>
    );
}

export default App;
