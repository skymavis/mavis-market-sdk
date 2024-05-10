import EmptyState from '@components/common/empty-state/EmptyState';
import Typography from '@components/common/typography/Typography';
import WillRender from '@components/common/will-render/WillRender';
import { CollectionData, Erc1155Token, getErc1155Balance, getErc1155Token } from '@sky-mavis/mavis-market-core';
import { isEmpty, isNil } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

import Attributes from '../attributes/Attributes';
import TokenDetailSkeleton from '../token-detail-skeleton/TokenDetailSkeleton';
import AllOrders from './all-orders/AllOrders';
import OwnerActions from './owner-actions/OwnerActions';

import styles from './Erc1155TokenDetail.module.scss';

interface Erc1155TokenDetailProps {
  collectionData: CollectionData;
  tokenId: string;
}

const Erc1155TokenDetail: FC<Erc1155TokenDetailProps> = props => {
  const { collectionData, tokenId } = props;
  const { tokenAddress } = collectionData;

  const [tokenData, setTokenData] = useState<Erc1155Token>({} as Erc1155Token);
  const [isLoading, setIsLoading] = useState(false);
  const [myErc1155TokenBalance, setMyErc1155TokenBalance] = useState(0);

  const { chainId, connectedAccount } = useGetWalletConnectData();

  const { name, image, traitDistribution, attributes } = tokenData;

  const onGetMyErc1155TokenBalance = async () => {
    try {
      setIsLoading(true);
      if (!isNil(connectedAccount)) {
        const balance = await getErc1155Balance({
          chainId,
          tokenAddress,
          tokenId,
          owner: connectedAccount,
        });
        setMyErc1155TokenBalance(Number(balance));
      }
    } catch (err) {
      console.error('[get_my_token_balance_error]', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onGetTokenDetail = async () => {
    try {
      const tokenData = await getErc1155Token({
        chainId,
        tokenAddress,
        tokenId,
      });

      setTokenData(tokenData);
    } catch (error) {
      console.error('[get_token_detail_error]', error);
    }
  };

  useEffect(() => {
    onGetMyErc1155TokenBalance();
  }, [connectedAccount]);

  useEffect(() => {
    onGetTokenDetail();
  }, []);

  if (isLoading) {
    return <TokenDetailSkeleton />;
  }

  if (isEmpty(tokenData)) {
    return (
      <div className={styles.erc721TokenDetail}>
        <EmptyState text="Token not found" />
      </div>
    );
  }

  return (
    <div className={styles.erc1155TokenDetail}>
      <img src={image || ''} className={styles.image} />
      <div className={styles.content}>
        <Typography size="large">{name}</Typography>
        <div className={styles.balance}>
          <Typography color="gray">Balance:</Typography>
          <Typography>{myErc1155TokenBalance} items</Typography>
        </div>
        <WillRender when={myErc1155TokenBalance > 0}>
          <OwnerActions
            collectionData={collectionData}
            tokenData={tokenData}
            myErc1155TokenBalance={myErc1155TokenBalance}
          />
        </WillRender>
        <Attributes attributes={attributes} traitDistribution={traitDistribution} />
        <AllOrders tokenData={tokenData} />
      </div>
    </div>
  );
};

export default Erc1155TokenDetail;
