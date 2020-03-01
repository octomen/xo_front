import React from 'react';

import XOGame from './XOGame/XOGame';

import styles from './App.module.css';

function App() {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                Величайшая победа – победа над самим собой!
            </header>
            <XOGame />
        </div>
    );
}

export default App;
