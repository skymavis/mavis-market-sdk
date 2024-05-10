import EmptyState from '@components/common/empty-state/EmptyState';
import { CommonTokenData, Erc, getAllTokens, Order } from '@sky-mavis/mavis-market-core';
import { isEmpty, isNil } from 'lodash';
import { FC, useEffect, useState } from 'react';
import SkeletonCards from 'src/components/common/skeleton-cards/SkeletonCards';
import Typography from 'src/components/common/typography/Typography';
import TokenCard from 'src/components/tokens/token-card/TokenCard';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

import styles from './Inventory.module.scss';

interface TokenData {
  ercType: Erc;
  data: CommonTokenData;
}

const Inventory: FC = () => {
  const { chainId, connectedAccount } = useGetWalletConnectData();

  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onGetAllTokens = async () => {
    try {
      setIsLoading(true);
      if (!isNil(connectedAccount)) {
        const { tokens } = await getAllTokens({ chainId, owner: connectedAccount, from: 0, size: 50 });
        setTokens(tokens);
      }
    } catch (err) {
      console.error('[get_all_tokens_error]', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onGetAllTokens();
  }, [connectedAccount]);

  if (isLoading) {
    return (
      <div className={styles.inventory}>
        <Typography size="large">All tokens</Typography>
        <SkeletonCards />
      </div>
    );
  }

  if (isEmpty(tokens)) {
    return (
      <div className={styles.emptyState}>
        <EmptyState text="Tokens not found" />
      </div>
    );
  }

  return (
    <div className={styles.inventory}>
      <Typography size="large">All tokens</Typography>
      <div className={styles.tokens}>
        {tokens.map(token => {
          const { ercType, data } = token;
          const { name, tokenAddress, tokenId, orders, image } = data;
          const orderData = ercType === Erc.Erc721 ? (orders as Order) : (orders as Order[])?.[0];
          const { currentPrice, paymentToken } = orderData || {};

          return (
            <TokenCard
              key={`${tokenAddress}-${tokenId}`}
              imageUrl={image || ''}
              name={name || ''}
              tokenAddress={tokenAddress}
              tokenId={tokenId}
              listingPrice={currentPrice}
              paymentToken={paymentToken}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
