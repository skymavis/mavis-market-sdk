import Price from '@components/common/price/Price';
import Typography from '@components/common/typography/Typography';
import WillRender from '@components/common/will-render/WillRender';
import { CollectionData, Erc, Erc1155Token, getOrdersByAddress, Order } from '@sky-mavis/mavis-market-core';
import { isNil } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { CancelListingAction, GiftAction, ListingAction } from 'src/components/tokens/token-detail/common-actions';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

import styles from './OwnerActions.module.scss';

interface OwnerActionsProps {
  collectionData: CollectionData;
  tokenData: Erc1155Token;
  myErc1155TokenBalance: number;
}

const OwnerActions: FC<OwnerActionsProps> = props => {
  const { collectionData, tokenData, myErc1155TokenBalance } = props;
  const { tokenAddress } = collectionData;
  const { tokenId } = tokenData;

  const [myOrder, setMyOrder] = useState<Order | null>(null);
  const { currentPrice, paymentToken } = myOrder || {};
  const hasOrder = !isNil(myOrder);

  const { chainId, connectedAccount } = useGetWalletConnectData();

  const onGetMyOrder = async () => {
    try {
      if (!isNil(connectedAccount)) {
        const { data } = await getOrdersByAddress({
          chainId,
          account: connectedAccount,
          from: 0,
          size: 4,
          collectibleFilters: {
            tokenAddresses: [tokenAddress],
            erc: Erc.Erc1155,
          },
        });

        const myOrder = data?.[0];

        if (!isNil(myOrder)) {
          setMyOrder(myOrder);
        }
      }
    } catch (err) {
      console.error(['get_my_listing_error'], err);
    }
  };

  useEffect(() => {
    onGetMyOrder();
  }, [connectedAccount]);

  return (
    <div className={styles.ownerActions}>
      <div className={styles.yourListing}>
        <Typography color="gray">Your listing:</Typography>
        <Price amount={currentPrice as string} tokenAddress={paymentToken} />
      </div>
      <div className={styles.actions}>
        <WillRender when={hasOrder}>
          <CancelListingAction order={myOrder} />
        </WillRender>
        <WillRender when={!hasOrder}>
          <ListingAction
            tokenType={Erc.Erc1155}
            tokenId={tokenId}
            collectionData={collectionData}
            maxQuantity={myErc1155TokenBalance}
          />
        </WillRender>
        <GiftAction
          tokenAddress={tokenAddress}
          tokenId={tokenId}
          tokenType={Erc.Erc1155}
          maxQuantity={myErc1155TokenBalance}
        />
      </div>
    </div>
  );
};

export default OwnerActions;
