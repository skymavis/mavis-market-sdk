import Button from '@components/common/button/Button';
import Typography from '@components/common/typography/Typography';
import WillRender from '@components/common/will-render/WillRender';
import ApproveAction from '@components/tokens/token-detail/common-actions/approve-action/ApproveAction';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import {
  ApproveTokenType,
  checkIsErc721Approved,
  checkIsErc1155Approved,
  CollectionData,
  createOrder,
  Erc,
  getPaymentToken,
  paymentTokens,
  TokenData,
} from '@sky-mavis/mavis-market-core';
import { parseUnits } from 'ethers/lib/utils';
import { isEmpty, isNil } from 'lodash';
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

import styles from './ListingModal.module.scss';

interface ListingModalProps {
  maxQuantity?: number;
  tokenId: string;
  tokenType: Erc;
  collectionData: CollectionData;
  isOpen: boolean;
  onClose: () => void;
  onListingSuccessfully: () => void;
}

const ListingModal: FC<ListingModalProps> = props => {
  const { chainId, connectedAccount, wallet } = useGetWalletConnectData();

  const { tokenId, collectionData, tokenType, maxQuantity = 1, isOpen, onClose, onListingSuccessfully } = props;
  const { allowedPaymentTokens: allowedPaymentTokensAddresses, tokenAddress, collectionMetadata } = collectionData;
  const collectionName = collectionMetadata.collection_name || '';
  const defaultPaymentToken =
    getPaymentToken(chainId, allowedPaymentTokensAddresses?.[0] as string) || paymentTokens?.[chainId].RON;

  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [paymentToken, setPaymentToken] = useState(defaultPaymentToken);
  const [errorMessage, setErrorMessage] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCheckIsTokenApproved = async () => {
    if (connectedAccount) {
      try {
        if (!isNil(tokenAddress) && !isNil(connectedAccount)) {
          setIsLoading(true);
          if (tokenType === Erc.Erc1155) {
            const isApproved = await checkIsErc1155Approved(chainId, connectedAccount, tokenAddress);
            setIsApproved(isApproved);
            return;
          }

          const isApproved = await checkIsErc721Approved(chainId, connectedAccount, tokenAddress);
          setIsApproved(isApproved);
        }
      } catch (err: any) {
        setErrorMessage(err?.message || err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const onChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const onConfirm = async () => {
    try {
      if (!isNil(wallet)) {
        setErrorMessage('');
        setIsLoading(true);
        const parsedPrice = parseUnits(price, paymentToken.decimals).toString();
        await createOrder({
          chainId,
          wallet,
          tokenAddress,
          tokenId,
          paymentToken: paymentToken.address,
          price: parsedPrice,
          quantity: Number(quantity),
          duration: 30 * 24 * 3600,
        });
        onClose();
        onListingSuccessfully();
      }
    } catch (err: any) {
      setErrorMessage(err?.message || err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSelectPaymentToken = (tokenAddress: string | number) => {
    const selectedToken = getPaymentToken(chainId, tokenAddress as string);
    if (!isEmpty(selectedToken)) {
      setPaymentToken(selectedToken);
    }
  };

  const onApproveSuccessfully = () => {
    setIsApproved(true);
  };

  const onApproveFailed = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  const allowedPaymentTokens = useMemo(() => {
    return (allowedPaymentTokensAddresses || []).map(token => getPaymentToken(chainId, token) as TokenData);
  }, [allowedPaymentTokensAddresses]);

  useEffect(() => {
    onCheckIsTokenApproved();
  }, [connectedAccount, tokenAddress]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <Typography>List token</Typography>
            </ModalHeader>
            <ModalBody>
              <div className={styles.listingDetail}>
                <Input label="Price" value={price} onChange={onChangePrice} />
                <WillRender when={tokenType === Erc.Erc1155}>
                  <Input
                    type="number"
                    max={maxQuantity}
                    label="Quantity"
                    value={quantity}
                    onChange={onChangeQuantity}
                  />
                </WillRender>
                <Dropdown>
                  <DropdownTrigger>
                    <Input readOnly label="Token" value={paymentToken.symbol} className={styles.selectToken} />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Token" items={allowedPaymentTokens} onAction={onSelectPaymentToken}>
                    {token => {
                      const { address, symbol } = token;
                      return <DropdownItem key={address}>{symbol}</DropdownItem>;
                    }}
                  </DropdownMenu>
                </Dropdown>
                <WillRender when={!isEmpty(errorMessage)}>
                  <Typography size="xSmall" color="danger">
                    {errorMessage}
                  </Typography>
                </WillRender>
              </div>
            </ModalBody>
            <ModalFooter>
              <WillRender when={isApproved}>
                <Button fullWidth isLoading={isLoading} color="primary" onPress={onConfirm}>
                  Confirm listing
                </Button>
              </WillRender>
              <WillRender when={!isApproved}>
                <ApproveAction
                  symbol={collectionName}
                  tokenAddress={tokenAddress}
                  tokenType={ApproveTokenType.Erc721}
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

export default ListingModal;
