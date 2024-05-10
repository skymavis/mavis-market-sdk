import Button from '@components/common/button/Button';
import SuccessModal from '@components/tokens/success-modal/SuccessModal';
import { Erc } from '@sky-mavis/mavis-market-core';
import { FC, useState } from 'react';

import GiftModal from './gift-modal/GiftModal';

interface GiftActionProps {
  tokenId: string;
  tokenAddress: string;
  tokenType: Erc;
  maxQuantity?: number;
}

const GiftAction: FC<GiftActionProps> = props => {
  const { tokenAddress, tokenType, maxQuantity, tokenId } = props;

  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [isOpenGiftModal, setIsOpenGiftModal] = useState(false);

  const onOpenGiftModal = () => {
    setIsOpenGiftModal(true);
  };

  const onCloseGiftModal = () => {
    setIsOpenGiftModal(false);
  };

  const onOpenSuccessModal = () => {
    setIsOpenSuccessModal(true);
  };

  const onCloseSuccessModal = () => {
    setIsOpenSuccessModal(false);
  };

  return (
    <>
      <Button variant="bordered" fullWidth onClick={onOpenGiftModal}>
        Gift
      </Button>
      <GiftModal
        tokenType={tokenType}
        tokenAddress={tokenAddress}
        tokenId={tokenId}
        maxQuantity={maxQuantity}
        isOpen={isOpenGiftModal}
        onClose={onCloseGiftModal}
        onGiftSuccessfully={onOpenSuccessModal}
      />
      <SuccessModal title="Gift successfully" isOpen={isOpenSuccessModal} onClose={onCloseSuccessModal} />
    </>
  );
};

export default GiftAction;
