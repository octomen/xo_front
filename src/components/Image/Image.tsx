import React, { useCallback, useState } from 'react';

import { mix } from '../../helpers/classnames';

import styles from './Image.module.css';

export type Props = {
    src: string;
    stubClassName?: string;
};

const isCached = (src: string) => {
    const image = new Image();
    image.src = src;

    return image.complete;
};

const ImageComponent: React.FC<Props> = ({ src, stubClassName }) => {
    const [isStubVisible, setStubVisible] = useState(!isCached(src));

    const onResponse = useCallback(() => {
        setStubVisible(false);
    }, [setStubVisible]);

    return (
        <div className={styles.container}>
            <img className={styles.image} src={src} alt="" onLoad={onResponse} onError={onResponse}/>
            <div className={mix(styles.stub, isStubVisible && styles['stub-visible'], stubClassName)} />
        </div>
    );
};

export default ImageComponent;
