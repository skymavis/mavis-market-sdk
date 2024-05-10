import Skeleton from '@components/common/skeleton/Skeleton';
import { FC } from 'react';

import styles from './Card.module.scss';

const Card: FC = () => {
  return (
    <div className={styles.card}>
      <Skeleton>
        <div className={styles.banner} />
      </Skeleton>
      <div className={styles.avatarContainer}>
        <Skeleton>
          <div className={styles.avatar} />
        </Skeleton>
      </div>
      <div className={styles.detail}>
        <div className={styles.titleContainer}>
          <Skeleton>
            <div className={styles.title} />
          </Skeleton>
        </div>
        <div className={styles.titleContainer}>
          <Skeleton>
            <div className={styles.title} />
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default Card;
