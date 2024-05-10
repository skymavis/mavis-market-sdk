import Typography from '@components/common/typography/Typography';
import { FC } from 'react';

import styles from './EmptyState.module.scss';

interface EmptyStateProps {
  text: string;
}

const EmptyState: FC<EmptyStateProps> = props => {
  const { text } = props;

  return (
    <div className={styles.emptyState}>
      <img src="/static/images/not-found.png" className={styles.image} />
      <Typography size="medium">{text}</Typography>
    </div>
  );
};

export default EmptyState;
