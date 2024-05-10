import Typography from '@components/common/typography/Typography';
import WillRender from '@components/common/will-render/WillRender';
import { CollectionData } from '@sky-mavis/mavis-market-core';
import { FC } from 'react';

import CollectionCard from './collection-card/CollectionCard';
import CollectionSkeleton from './collection-skeleton/CollectionSkeleton';

import styles from './Collections.module.scss';

interface CollectionsProps {
  title: string;
  collections: CollectionData[];
  isLoading: boolean;
}

const Collections: FC<CollectionsProps> = props => {
  const { title, collections, isLoading } = props;
  const sortedCollections = collections.sort((collection1, collection2) =>
    (collection2.collectionMetadata.collection_name || '').localeCompare(
      collection1.collectionMetadata.collection_name || '',
    ),
  );
  return (
    <div className={styles.collectionsContainer}>
      <Typography size="large" bold>
        {title}
      </Typography>
      <WillRender when={isLoading}>
        <CollectionSkeleton />
      </WillRender>
      <WillRender when={!isLoading}>
        <div className={styles.collections}>
          {sortedCollections.map(collection => (
            <CollectionCard data={collection} key={collection.tokenAddress} />
          ))}
        </div>
      </WillRender>
    </div>
  );
};

export default Collections;
