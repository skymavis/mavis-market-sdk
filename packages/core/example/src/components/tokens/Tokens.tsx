import EmptyState from '@components/common/empty-state/EmptyState';
import WillRender from '@components/common/will-render/WillRender';
import {
  CollectionData,
  Erc,
  Erc721Token,
  Erc1155Token,
  getCollection,
  getErc721Tokens,
  getErc1155Tokens,
  SortBy,
} from '@sky-mavis/mavis-market-core';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

import TokenBanner from './token-banner/TokenBanner';
import TokenCard from './token-card/TokenCard';
import TokensSkeleton from './tokens-skeleton/TokensSkeleton';

import styles from './Tokens.module.scss';

const Tokens: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tokens, setTokens] = useState<Erc721Token[] | Erc1155Token[]>([]);
  const [collectionData, setCollectionData] = useState<CollectionData>({} as CollectionData);

  const { chainId } = useGetWalletConnectData();
  const router = useRouter();
  const collectionAddress = router.query.collectionAddress as string;

  const getTokens = async () => {
    try {
      setIsLoading(true);
      const collectionData = await getCollection({
        chainId,
        tokenAddress: collectionAddress,
      });

      const { erc } = collectionData;

      if (erc === Erc.Erc721) {
        const { results } = await getErc721Tokens({
          from: 0,
          size: 50,
          chainId,
          tokenAddress: collectionAddress,
          sort: SortBy.PriceAsc,
        });

        setTokens(results);
        setCollectionData(collectionData);

        return;
      }

      const { results } = await getErc1155Tokens({
        from: 0,
        size: 50,
        chainId,
        tokenAddress: collectionAddress,
        sort: SortBy.PriceAsc,
      });

      setTokens(results);
      setCollectionData(collectionData);

      return;
    } catch (err) {
      console.error(['[get_tokens_error]', err]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isEmpty(collectionAddress)) {
      getTokens();
    }
  }, [collectionAddress]);

  if (isLoading) {
    return <TokensSkeleton />;
  }

  if (isEmpty(collectionData)) {
    return (
      <div className={styles.emptyState}>
        <EmptyState text="Collection not found" />
      </div>
    );
  }

  return (
    <div className={styles.tokensContainer}>
      <TokenBanner collectionData={collectionData} />
      <WillRender when={isEmpty(tokens)}>
        <EmptyState text="Tokens not found" />
      </WillRender>
      <WillRender when={!isEmpty(tokens)}>
        <div className={styles.tokens}>
          {tokens.map(token => {
            const { name, tokenAddress, tokenId, image } = token;
            const orderData =
              collectionData?.erc === Erc.Erc721 ? (token as Erc721Token).order : (token as Erc1155Token).orders?.[0];
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
      </WillRender>
    </div>
  );
};

export default Tokens;
