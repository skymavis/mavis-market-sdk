import WillRender from '@components/common/will-render/WillRender';
import { CollectionData, Erc, getCollection } from '@sky-mavis/mavis-market-core';
import { isEmpty, isNil } from 'lodash';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

import Erc721TokenDetail from './erc721-token-detail/Erc721TokenDetail';
import Erc1155TokenDetail from './erc1155-token-detail/Erc1155TokenDetail';

const TokenDetail: FC = () => {
  const [collectionData, setCollectionData] = useState<CollectionData>();

  const { chainId } = useGetWalletConnectData();
  const router = useRouter();
  const query = router.query;
  const { collectionAddress, tokenId } = query;
  const { erc } = collectionData || {};

  const onGetCollectionData = async () => {
    try {
      const collectionData = await getCollection({
        chainId,
        tokenAddress: collectionAddress as string,
      });

      setCollectionData(collectionData);
    } catch (error) {
      console.error('[get_token_data_error]', error);
    }
  };

  useEffect(() => {
    if (!isEmpty(collectionAddress) && !isEmpty(tokenId)) {
      onGetCollectionData();
    }
  }, [collectionAddress, tokenId]);

  if (isNil(collectionData) || isEmpty(tokenId)) {
    return null;
  }

  return (
    <div>
      <WillRender when={erc === Erc.Erc721}>
        <Erc721TokenDetail tokenId={tokenId as string} collectionData={collectionData} />
      </WillRender>
      <WillRender when={erc === Erc.Erc1155}>
        <Erc1155TokenDetail tokenId={tokenId as string} collectionData={collectionData} />
      </WillRender>
    </div>
  );
};

export default TokenDetail;
