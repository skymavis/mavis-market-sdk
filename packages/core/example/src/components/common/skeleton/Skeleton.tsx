import { Skeleton as NextUISkeleton } from '@nextui-org/react';
import { FC, ReactNode } from 'react';

import styles from './Skeleton.module.scss';

interface SkeletonProps {
  children: ReactNode;
}

const Skeleton: FC<SkeletonProps> = props => {
  const { children } = props;
  return <NextUISkeleton className={styles.skeleton}>{children}</NextUISkeleton>;
};

export default Skeleton;
