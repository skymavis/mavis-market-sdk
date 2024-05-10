import Skeleton from '@components/common/skeleton/Skeleton';
import { FC } from 'react';

import styles from './Card.module.scss';

const Card: FC = () => {
  return (
    <div className={styles.card}>
      <Skeleton>
        <div className={styles.image} />
      </Skeleton>
      <div className={styles.detail}>
        <Skeleton>
          <div className={styles.title} />
        </Skeleton>
        <Skeleton>
          <div className={styles.price} />
        </Skeleton>
      </div>
    </div>
  );
};

export default Card;
