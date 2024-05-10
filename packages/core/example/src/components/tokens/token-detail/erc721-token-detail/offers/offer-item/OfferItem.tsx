import Button from '@components/common/button/Button';
import Price from '@components/common/price/Price';
import Typography from '@components/common/typography/Typography';
import WillRender from '@components/common/will-render/WillRender';
import SuccessModal from '@components/tokens/success-modal/SuccessModal';
import { acceptOffer, Offer } from '@sky-mavis/mavis-market-core';
import { isEmpty, isNil } from 'lodash';
import { FC, useState } from 'react';
import { useCheckIsOwner } from 'src/hooks/useCheckIsOwner';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

import styles from './OfferItem.module.scss';

interface OfferItemProps {
  offer: Offer;
  owner: string;
}

const OfferItem: FC<OfferItemProps> = props => {
  const { offer, owner } = props;
  const { maker, makerProfile, currentPrice, hash } = offer;

  const [isAccepting, setIsAccepting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

  const isOwner = useCheckIsOwner(owner);
  const { wallet, chainId } = useGetWalletConnectData();

  const onOpenSuccessModal = () => {
    setIsOpenSuccessModal(true);
  };

  const onCloseSuccessModal = () => {
    setIsOpenSuccessModal(false);
  };

  const onAcceptOffer = async () => {
    try {
      if (!isNil(wallet) && !isNil(chainId)) {
        setErrorMessage('');
        setIsAccepting(true);
        await acceptOffer({ chainId, wallet, hash });
        onOpenSuccessModal();
      }
    } catch (err: any) {
      setErrorMessage(err?.message || err);
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <div className={styles.offerItem}>
      <div className={styles.detail}>
        <div className={styles.item}>
          <Typography size="xSmall" color="gray">
            From:
          </Typography>
          <Typography size="xSmall">{makerProfile?.name || maker}</Typography>
        </div>
        <div className={styles.item}>
          <Typography size="xSmall" color="gray">
            Offer price:
          </Typography>
          <Price amount={currentPrice} isWRON />
        </div>
        <WillRender when={!isEmpty(errorMessage)}>
          <Typography color="danger" size="xSmall">
            {errorMessage}
          </Typography>
        </WillRender>
      </div>
      <WillRender when={isOwner}>
        <Button variant="bordered" isLoading={isAccepting} onClick={onAcceptOffer}>
          Accept offer
        </Button>
      </WillRender>
      <SuccessModal title="Accept offer successfully" isOpen={isOpenSuccessModal} onClose={onCloseSuccessModal} />
    </div>
  );
};

export default OfferItem;
