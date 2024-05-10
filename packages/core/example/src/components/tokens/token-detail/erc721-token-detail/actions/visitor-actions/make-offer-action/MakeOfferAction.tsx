import Button from '@components/common/button/Button';
import { Erc721Token } from '@sky-mavis/mavis-market-core';
import { FC, useState } from 'react';
import SuccessModal from 'src/components/tokens/success-modal/SuccessModal';

import MakeOfferModal from './make-offer-modal/MakeOfferModal';

interface MakeOfferActionProps {
  tokenData: Erc721Token;
}

const MakeOfferAction: FC<MakeOfferActionProps> = props => {
  const { tokenData } = props;

  const [isOpenMakeOfferModal, setIsOpenMakeOfferModal] = useState(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

  const onOpenMakeOfferModal = () => {
    setIsOpenMakeOfferModal(true);
  };

  const onCloseMakeOfferModal = () => {
    setIsOpenMakeOfferModal(false);
  };

  const onOpenSuccessModal = () => {
    setIsOpenSuccessModal(true);
  };

  const onCloseSuccessModal = () => {
    setIsOpenSuccessModal(false);
  };

  return (
    <>
      <Button variant="bordered" fullWidth onClick={onOpenMakeOfferModal}>
        Make offer
      </Button>
      <MakeOfferModal
        tokenData={tokenData}
        isOpen={isOpenMakeOfferModal}
        onClose={onCloseMakeOfferModal}
        onMakeOfferSuccessfully={onOpenSuccessModal}
      />
      <SuccessModal title="Make offer successfully" isOpen={isOpenSuccessModal} onClose={onCloseSuccessModal} />
    </>
  );
};

export default MakeOfferAction;
