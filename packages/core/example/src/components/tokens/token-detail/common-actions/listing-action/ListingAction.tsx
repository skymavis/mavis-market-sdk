import Button from '@components/common/button/Button';
import { CollectionData, Erc } from '@sky-mavis/mavis-market-core';
import { FC, useState } from 'react';
import SuccessModal from 'src/components/tokens/success-modal/SuccessModal';

import ListingModal from './listing-modal/ListingModal';

interface ListingActionProps {
  maxQuantity?: number;
  tokenId: string;
  tokenType: Erc;
  collectionData: CollectionData;
}

const ListingAction: FC<ListingActionProps> = props => {
  const { maxQuantity, tokenId, tokenType, collectionData } = props;

  const [isOpenListingModal, setIsOpenListingModal] = useState(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

  const onOpenListingModal = () => {
    setIsOpenListingModal(true);
  };

  const onCloseListingModal = () => {
    setIsOpenListingModal(false);
  };

  const onOpenSuccessModal = () => {
    setIsOpenSuccessModal(true);
  };

  const onCloseSuccessModal = () => {
    setIsOpenSuccessModal(false);
  };

  return (
    <>
      <Button fullWidth color="primary" onClick={onOpenListingModal}>
        List
      </Button>
      <ListingModal
        tokenId={tokenId}
        tokenType={tokenType}
        maxQuantity={maxQuantity}
        collectionData={collectionData}
        isOpen={isOpenListingModal}
        onClose={onCloseListingModal}
        onListingSuccessfully={onOpenSuccessModal}
      />
      <SuccessModal title="Listing successfully" isOpen={isOpenSuccessModal} onClose={onCloseSuccessModal} />
    </>
  );
};

export default ListingAction;
