import Typography from '@components/common/typography/Typography';
import { CollectionData } from '@sky-mavis/mavis-market-core';
import { useRouter } from 'next/router';
import { FC } from 'react';

import styles from './CollectionCard.module.scss';

interface CollectionCardProps {
  data: CollectionData;
}

const CollectionCard: FC<CollectionCardProps> = props => {
  const { data } = props;
  const { collectionMetadata, tokenAddress } = data;
  const { collection_name, studio_name, avatar, banner } = collectionMetadata || {};

  const router = useRouter();

  const onClickCard = () => {
    router.push(`/tokens/${tokenAddress}`);
  };

  return (
    <div className={styles.collectionCard} onClick={onClickCard}>
      <img src={banner || ''} alt="" className={styles.banner} />
      <div className={styles.avatarContainer}>
        <img src={avatar || ''} alt="" className={styles.avatar} />
      </div>
      <div className={styles.footer}>
        <Typography className={styles.collectionName}>{collection_name}</Typography>
        <Typography color="gray" className={styles.collectionName}>
          {studio_name}
        </Typography>
      </div>
    </div>
  );
};

export default CollectionCard;
