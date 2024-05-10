import Button from '@components/common/button/Button';
import Price from '@components/common/price/Price';
import WillRender from '@components/common/will-render/WillRender';
import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import {
  ApproveTokenType,
  checkIsWRonTokenApproved,
  Erc721Token,
  fetchOfferBalance,
  makeOffer,
  wRonToken,
} from '@sky-mavis/mavis-market-core';
import { parseUnits } from 'ethers/lib/utils';
import { isEmpty, isNil } from 'lodash';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import Typography from 'src/components/common/typography/Typography';
import ApproveAction from 'src/components/tokens/token-detail/common-actions/approve-action/ApproveAction';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

import styles from './MakeOfferModal.module.scss';

interface MakeOfferModalProps {
  tokenData: Erc721Token;
  isOpen: boolean;
  onClose: () => void;
  onMakeOfferSuccessfully: () => void;
}

const MakeOfferModal: FC<MakeOfferModalProps> = props => {
  const { tokenData, isOpen, onClose, onMakeOfferSuccessfully } = props;

  const { chainId, connectedAccount, wallet } = useGetWalletConnectData();
  const { tokenAddress, tokenId } = tokenData;

  const wRon = wRonToken[chainId];

  const [offerBalance, setOfferBalance] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const onApproveSuccessfully = () => {
    setIsApproved(true);
  };

  const onCheckIsTokenApproved = async () => {
    if (connectedAccount) {
      try {
        setIsLoading(true);
        const offerBalance = await fetchOfferBalance(chainId, connectedAccount);
        const isApproved = await checkIsWRonTokenApproved(chainId, connectedAccount, offerBalance.toString());

        setIsApproved(isApproved);
        setOfferBalance(offerBalance.toString());
      } catch (err: any) {
        setErrorMessage(err?.message || err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onApproveFailed = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  const onMakeOffer = async () => {
    try {
      if (!isNil(wallet)) {
        setErrorMessage('');
        setIsLoading(true);
        const parsedPrice = parseUnits(price, wRon.decimals).toString();
        await makeOffer({
          chainId,
          wallet,
          tokenAddress,
          tokenId,
          price: parsedPrice,
          duration: 30 * 24 * 3600,
        });
        onClose();
        onMakeOfferSuccessfully();
      }
    } catch (err: any) {
      setErrorMessage(err?.message || err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onCheckIsTokenApproved();
  }, [connectedAccount]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <Typography>Make offer</Typography>
            </ModalHeader>
            <ModalBody>
              <div className={styles.offerDetail}>
                <div className={styles.balance}>
                  <Typography color="gray">Offer balance:</Typography>
                  <Price isWRON amount={offerBalance || '0'} />
                </div>
                <Input label="Offer price" value={price} onChange={onChangePrice} />
                <WillRender when={!isEmpty(errorMessage)}>
                  <Typography size="xSmall" color="danger">
                    {errorMessage}
                  </Typography>
                </WillRender>
              </div>
            </ModalBody>
            <ModalFooter>
              <WillRender when={isApproved}>
                <Button fullWidth isLoading={isLoading} color="primary" onPress={onMakeOffer}>
                  Make offer
                </Button>
              </WillRender>
              <WillRender when={!isApproved}>
                <ApproveAction
                  symbol="WRON"
                  tokenAddress={wRon.address}
                  tokenType={ApproveTokenType.WRon}
                  onApproveSuccessfully={onApproveSuccessfully}
                  onApproveFailed={onApproveFailed}
                />
              </WillRender>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MakeOfferModal;
