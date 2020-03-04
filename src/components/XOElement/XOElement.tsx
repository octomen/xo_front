import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { mix } from '../../helpers/classnames';
import { BoardElements } from '../../helpers/gameWebsocket';

import styles from './XOElement.module.css';

const classes = {
    appear: styles['element-appear'],
    appearActive: styles['element-appear-active'],
    appearDone: styles['element-appear-done'],
    exit: styles['element-exit'],
    exitActive: styles['element-exit-active'],
    exitDone: styles['element-exit-done'],
};

export type Props = {
    type?: BoardElements
};
const XOElement: React.FC<Props> = ({ type }) => {
    return (
        <CSSTransition
            in={Boolean(type)}
            appear
            mountOnEnter
            timeout={1000}
            classNames={classes}
        >
            <div className={mix(styles.element, type && styles[type])}>
                {type ? type === BoardElements.O ? 'O' : 'X' : '' }
            </div>
        </CSSTransition>
    );
};

export default XOElement;
