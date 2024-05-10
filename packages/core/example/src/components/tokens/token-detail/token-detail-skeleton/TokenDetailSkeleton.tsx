import Skeleton from '@components/common/skeleton/Skeleton';
import { FC } from 'react';

import styles from './TokenDetailSkeleton.module.scss';

const TokenDetailSkeleton: FC = () => {
  return (
    <div className={styles.tokenDetailSkeleton}>
      <div className={styles.imageContainer}>
        <Skeleton>
          <div className={styles.image} />
        </Skeleton>
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <Skeleton>
            <div className={styles.title} />
          </Skeleton>
        </div>
        <div className={styles.box}>
          <div className={styles.container}>
            <Skeleton>
              <div className={styles.listingDetail} />
            </Skeleton>
          </div>
          <div className={styles.actions}>
            <div className={styles.container}>
              <Skeleton>
                <div className={styles.action} />
              </Skeleton>
            </div>
            <div className={styles.container}>
              <Skeleton>
                <div className={styles.action} />
              </Skeleton>
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.list}>
            <div className={styles.container}>
              <Skeleton>
                <div className={styles.item} />
              </Skeleton>
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.list}>
            <div className={styles.container}>
              <Skeleton>
                <div className={styles.item} />
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetailSkeleton;
