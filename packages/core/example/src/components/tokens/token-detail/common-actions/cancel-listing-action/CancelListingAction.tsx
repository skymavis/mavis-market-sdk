import Button from '@components/common/button/Button';
import { cancelOrder, Order } from '@sky-mavis/mavis-market-core';
import { isNil } from 'lodash';
import { FC, useState } from 'react';
import SuccessModal from 'src/components/tokens/success-modal/SuccessModal';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

interface CancelListingActionProps {
  order: Order | null;
}

const CancelListingAction: FC<CancelListingActionProps> = props => {
  const { order } = props;
  const { hash } = order || {};

  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  const { chainId, wallet } = useGetWalletConnectData();

  const onOpenSuccessModal = () => {
    setIsOpenSuccessModal(true);
  };

  const onCloseSuccessModal = () => {
    setIsOpenSuccessModal(false);
  };

  const onCancelListing = async () => {
    try {
      if (!isNil(wallet) && !isNil(hash)) {
        setIsCanceling(true);
        await cancelOrder({ chainId, wallet, hash });
        onOpenSuccessModal();
      }
    } catch (err) {
      console.error('[cancel_order_failed]', err);
    } finally {
      setIsCanceling(false);
    }
  };

  return (
    <>
      <Button color="primary" fullWidth isLoading={isCanceling} onClick={onCancelListing}>
        Cancel listing
      </Button>
      <SuccessModal title="Cancel order successfully" isOpen={isOpenSuccessModal} onClose={onCloseSuccessModal} />
    </>
  );
};

export default CancelListingAction;
