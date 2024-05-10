import { FC } from 'react';

import Card from './card/Card';

import styles from './SkeletonCards.module.scss';

const SkeletonCards: FC = () => {
  return (
    <div className={styles.skeleton}>
      {Array.from(Array(20).keys()).map(index => (
        <Card key={index} />
      ))}
    </div>
  );
};

export default SkeletonCards;
