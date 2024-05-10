import Button from '@components/common/button/Button';
import SuccessModal from '@components/tokens/success-modal/SuccessModal';
import { FC, useState } from 'react';

import SwapRonModal from './swap-ron-modal/SwapRonModal';

const SwapRonAction: FC = () => {
  const [isOpenSwapRonModal, setIsOpenSwapRonModal] = useState(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

  const onOpenSwapRonModal = () => {
    setIsOpenSwapRonModal(true);
  };

  const onCloseSwapRonModal = () => {
    setIsOpenSwapRonModal(false);
  };

  const onOpenSuccessModal = () => {
    setIsOpenSuccessModal(true);
  };

  const onCloseSuccessModal = () => {
    setIsOpenSuccessModal(false);
  };

  return (
    <>
      <Button variant="bordered" fullWidth onClick={onOpenSwapRonModal}>
        Swap ron/wron
      </Button>
      <SwapRonModal isOpen={isOpenSwapRonModal} onClose={onCloseSwapRonModal} onSwapSuccessfully={onOpenSuccessModal} />
      <SuccessModal title="Swap successfully" isOpen={isOpenSuccessModal} onClose={onCloseSuccessModal} />
    </>
  );
};

export default SwapRonAction;
