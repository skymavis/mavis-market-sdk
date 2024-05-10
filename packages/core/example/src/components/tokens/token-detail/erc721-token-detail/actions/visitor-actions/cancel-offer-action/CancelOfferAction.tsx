import Button from '@components/common/button/Button';
import { cancelOffer, Offer } from '@sky-mavis/mavis-market-core';
import { isNil } from 'lodash';
import { FC, useState } from 'react';
import SuccessModal from 'src/components/tokens/success-modal/SuccessModal';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

interface CancelOfferActionProps {
  offer: Offer | null;
}

const CancelOfferAction: FC<CancelOfferActionProps> = props => {
  const { offer } = props;
  const { hash } = offer || {};

  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  const { chainId, wallet } = useGetWalletConnectData();

  const onOpenSuccessModal = () => {
    setIsOpenSuccessModal(true);
  };

  const onCloseSuccessModal = () => {
    setIsOpenSuccessModal(false);
  };

  const onCancelOffer = async () => {
    try {
      if (!isNil(wallet) && !isNil(hash)) {
        setIsCanceling(true);
        await cancelOffer({ chainId, wallet, hash });
        onOpenSuccessModal();
      }
    } catch (err) {
      console.error('[cancel_offer_failed]', err);
    } finally {
      setIsCanceling(false);
    }
  };

  return (
    <>
      <Button fullWidth isLoading={isCanceling} variant="bordered" onClick={onCancelOffer}>
        Cancel offer
      </Button>
      <SuccessModal title="Cancel offer successfully" isOpen={isOpenSuccessModal} onClose={onCloseSuccessModal} />
    </>
  );
};

export default CancelOfferAction;
