import WillRender from '@components/common/will-render/WillRender';
import { CollectionData, Erc, Erc721Token } from '@sky-mavis/mavis-market-core';
import { isNil } from 'lodash';
import { FC } from 'react';
import { CancelListingAction, GiftAction, ListingAction } from 'src/components/tokens/token-detail/common-actions';

import styles from './OwnerActions.module.scss';

interface OwnerActionsProps {
  tokenData: Erc721Token;
  collectionData: CollectionData;
}

const OwnerActions: FC<OwnerActionsProps> = props => {
  const { tokenData, collectionData } = props;
  const { order, tokenAddress, tokenId } = tokenData;
  const hasOrder = !isNil(order);

  return (
    <div className={styles.ownerActions}>
      <WillRender when={hasOrder}>
        <CancelListingAction order={order} />
      </WillRender>
      <WillRender when={!hasOrder}>
        <ListingAction tokenType={Erc.Erc721} tokenId={tokenId} collectionData={collectionData} />
      </WillRender>
      <GiftAction tokenAddress={tokenAddress} tokenId={tokenId} tokenType={Erc.Erc721} />
    </div>
  );
};

export default OwnerActions;
