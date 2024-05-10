import Typography from '@components/common/typography/Typography';
import { CollectionData } from '@sky-mavis/mavis-market-core';
import { FC } from 'react';

import styles from './TokenBanner.module.scss';

interface TokenBannerProps {
  collectionData: CollectionData;
}

const TokenBanner: FC<TokenBannerProps> = props => {
  const { collectionData } = props;
  const {
    collection_name: collectionName,
    studio_name: studioName,
    banner,
    avatar,
  } = collectionData?.collectionMetadata || {};

  return (
    <div className={styles.tokenBanner}>
      <div className={styles.bannerContainer}>
        <div className={styles.overlay} />
        <img src={banner || ''} className={styles.banner} />
      </div>
      <div className={styles.content}>
        <img src={avatar || ''} className={styles.avatar} />
        <div className={styles.collectionName}>
          <Typography size="large">{collectionName}</Typography>
          <Typography color="gray">by {studioName}</Typography>
        </div>
      </div>
    </div>
  );
};

export default TokenBanner;
