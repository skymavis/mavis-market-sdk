import Skeleton from '@components/common/skeleton/Skeleton';
import SkeletonCards from '@components/common/skeleton-cards/SkeletonCards';
import { FC } from 'react';

import styles from './TokensSkeleton.module.scss';

const TokensSkeleton: FC = () => {
  return (
    <div className={styles.tokenSkeleton}>
      <div className={styles.bannerContainer}>
        <Skeleton>
          <div className={styles.banner} />
        </Skeleton>
      </div>
      <SkeletonCards />
    </div>
  );
};

export default TokensSkeleton;
