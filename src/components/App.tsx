import React, { useCallback } from 'react';

import XOGame from './XOGame/XOGame';

import styles from './App.module.css';

function App() {
    const onGameCreate = useCallback(() => {
        window.location.reload();
    }, []);

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                Величайшая победа – победа над самим собой!
            </header>
            <XOGame id='123' onGameCreate={onGameCreate} />
        </div>
    );
}

export default App;
