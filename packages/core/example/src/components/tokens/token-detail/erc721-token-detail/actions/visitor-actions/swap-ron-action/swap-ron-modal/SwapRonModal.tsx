import Button from '@components/common/button/Button';
import Price from '@components/common/price/Price';
import Typography from '@components/common/typography/Typography';
import WillRender from '@components/common/will-render/WillRender';
import { Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import {
  fetchOfferBalance,
  fetchPaymentTokenBalance,
  paymentTokens,
  unwrapRon,
  wrapRon,
} from '@sky-mavis/mavis-market-core';
import { isEmpty, isNil } from 'lodash';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

import styles from './SwapRonModal.module.scss';

interface SwapRonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwapSuccessfully: () => void;
}

const SwapRonModal: FC<SwapRonModalProps> = props => {
  const { isOpen, onClose, onSwapSuccessfully } = props;

  const [amount, setAmount] = useState('');
  const [isSwappingToWRon, setIsSwappingToWRon] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [ronBalance, setRonBalance] = useState('0');
  const [wronBalance, setWRonBalance] = useState('0');

  const { wallet, chainId, connectedAccount } = useGetWalletConnectData();

  const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const onSwap = async () => {
    try {
      if (isNil(wallet)) {
        return;
      }

      setIsLoading(true);
      if (isSwappingToWRon) {
        await wrapRon({ wallet, chainId, amount });
      } else {
        await unwrapRon({ wallet, chainId, amount });
      }
      onClose();
      onSwapSuccessfully();
    } catch (err: any) {
      setErrorMessage(err?.message || err);
    } finally {
      setIsLoading(false);
    }
  };

  const onGetBalance = async () => {
    if (isNil(connectedAccount)) {
      return;
    }

    const ronAddress = paymentTokens[chainId].RON.address;
    const ronBalance = await fetchPaymentTokenBalance(chainId, ronAddress, connectedAccount);
    const wRonBalance = await fetchOfferBalance(chainId, connectedAccount);

    setRonBalance(ronBalance.toString());
    setWRonBalance(wRonBalance.toString());
  };

  useEffect(() => {
    onGetBalance();
  }, [connectedAccount]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <Typography>Swap ron/wron</Typography>
            </ModalHeader>
            <ModalBody>
              <div className={styles.swapDetail}>
                <div className={styles.balance}>
                  <Typography color="gray" size="small">
                    Ron balance:
                  </Typography>
                  <Price amount={ronBalance} />
                </div>
                <div className={styles.balance}>
                  <Typography color="gray" size="small">
                    WRon balance:
                  </Typography>
                  <Price amount={wronBalance} isWRON />
                </div>
                <Input label="Value" value={amount} onChange={onChangeAmount} />
                <div className={styles.checkbox}>
                  <Checkbox
                    color="primary"
                    onValueChange={setIsSwappingToWRon}
                    isSelected={isSwappingToWRon}
                    aria-label="Swap ron to wron"
                  />
                  <Typography>Swap ron to wron</Typography>
                </div>
                <WillRender when={!isEmpty(errorMessage)}>
                  <Typography size="xSmall" color="danger">
                    {errorMessage}
                  </Typography>
                </WillRender>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button isLoading={isLoading} fullWidth color="primary" onPress={onSwap}>
                Confirm listing
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SwapRonModal;
