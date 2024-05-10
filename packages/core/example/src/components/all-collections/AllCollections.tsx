import { CollectionData, getCollections } from '@sky-mavis/mavis-market-core';
import { FC, useEffect, useState } from 'react';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

import Collections from './collections/Collections';

import styles from './AllCollections.module.scss';

const AllCollections: FC = () => {
  const [erc721Collections, setErc721Collections] = useState<CollectionData[]>([]);
  const [erc1155Collections, setErc1155Collections] = useState<CollectionData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { chainId } = useGetWalletConnectData();

  const getAllCollections = async () => {
    try {
      setIsLoading(true);
      const { erc721Collections, erc1155Collections } = await getCollections({
        chainId,
        from: 0,
        size: 50,
      });
      setErc721Collections(erc721Collections);
      setErc1155Collections(erc1155Collections);
    } catch (err) {
      console.error('[get_all_collections_error]', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCollections();
  }, []);

  return (
    <div className={styles.allCollections}>
      <Collections title="Erc721 collections" isLoading={isLoading} collections={erc721Collections} />
      <Collections title="Erc1155 collections" isLoading={isLoading} collections={erc1155Collections} />
    </div>
  );
};

export default AllCollections;
