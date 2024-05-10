import Button from '@components/common/button/Button';
import Typography from '@components/common/typography/Typography';
import WillRender from '@components/common/will-render/WillRender';
import ApproveAction from '@components/tokens/token-detail/common-actions/approve-action/ApproveAction';
import SelectPaymentTokens from '@components/tokens/token-detail/common-actions/buy-action/select-payment-tokens/SelectPaymentTokens';
import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import {
  ApproveTokenType,
  buyToken,
  Erc,
  getPaymentToken,
  getSwapTokenData,
  getTokensNeedToApprove,
  Order,
  paymentTokens,
  TokenData,
} from '@sky-mavis/mavis-market-core';
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { isEmpty, isNil } from 'lodash';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';
import { roundingNumber } from 'src/utils/roundingNumberUtil';

import styles from './BuyModal.module.scss';

interface BuyModalProps {
  order: Order;
  tokenType: Erc;
  isOpen: boolean;
  onClose: () => void;
  onBuySuccessfully: () => void;
}

const BuyModal: FC<BuyModalProps> = props => {
  const { order, tokenType, isOpen, onClose, onBuySuccessfully } = props;
  const { paymentToken, currentPrice, orderQuantity, hash } = order;

  const { chainId, connectedAccount, wallet } = useGetWalletConnectData();
  const defaultPaymentToken = paymentTokens[chainId].RON.address;

  const [errorMessage, setErrorMessage] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [selectedTokenAddress, setSelectedTokenAddress] = useState(defaultPaymentToken);
  const [tokensNeedToApprove, setTokensNeedToApprove] = useState<TokenData[]>([]);
  const [swappedAmount, setSwappedAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const selectedToken = getPaymentToken(chainId, selectedTokenAddress);
  const paymentPrice = BigNumber.from(currentPrice || '0')
    .mul(parseInt(quantity) || 0)
    .toString();

  const onChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const onSelectPaymentToken = (tokenAddress: string) => {
    if (!isLoading) {
      setSelectedTokenAddress(tokenAddress);
    }
  };

  const onGetSwappedTokenAmount = async () => {
    if (!isNil(paymentToken) && !isNil(paymentPrice)) {
      try {
        setIsLoading(true);
        if (selectedTokenAddress.toLowerCase() === paymentToken.toLowerCase()) {
          const parsedAmount = formatUnits(BigNumber.from(paymentPrice), selectedToken?.decimals);
          setSwappedAmount(parsedAmount);
          return;
        }

        const { swappedAmount } = await getSwapTokenData({
          chainId,
          inputTokenAddress: selectedTokenAddress,
          outputTokenAddress: paymentToken,
          amount: paymentPrice,
        });

        const parsedAmount = formatUnits(BigNumber.from(swappedAmount), selectedToken?.decimals);
        setSwappedAmount(parsedAmount);
      } catch {
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onGetTokensNeedToApprove = async () => {
    if (!isNil(connectedAccount) && !isNil(paymentToken) && !isNil(paymentPrice)) {
      try {
        setErrorMessage('');
        setIsLoading(true);
        const tokens = await getTokensNeedToApprove(
          chainId,
          connectedAccount as string,
          selectedTokenAddress,
          paymentToken,
          paymentPrice,
        );
        setTokensNeedToApprove(tokens);
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

  const onApproveSuccessfully = () => {
    const newTokensNeedToApprove = [...tokensNeedToApprove];
    newTokensNeedToApprove.shift();
    setTokensNeedToApprove([...newTokensNeedToApprove]);
  };

  const onBuy = async () => {
    const deadline = parseInt(`${new Date().getTime() / 1000 + 30 * 60}`);

    if (!isNil(wallet) && !isNil(order)) {
      try {
        setIsLoading(true);
        setErrorMessage('');
        await buyToken({
          chainId,
          wallet,
          hash,
          selectedTokenAddress,
          deadline: deadline.toString(),
          quantity: Number(quantity),
        });
        onClose();
        onBuySuccessfully();
      } catch (err: any) {
        setErrorMessage(err.message || err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    onGetSwappedTokenAmount();
  }, [selectedTokenAddress, quantity]);

  useEffect(() => {
    onGetTokensNeedToApprove();
  }, [connectedAccount, selectedTokenAddress]);

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <Typography>Buy token</Typography>
            </ModalHeader>
            <ModalBody>
              <div className={styles.listingDetail}>
                <WillRender when={tokenType === Erc.Erc1155}>
                  <Input
                    type="number"
                    max={orderQuantity?.availableQuantity || 0}
                    label="Quantity"
                    value={quantity}
                    onChange={onChangeQuantity}
                  />
                </WillRender>
                <SelectPaymentTokens
                  selectedTokenAddress={selectedTokenAddress}
                  onSelectPaymentToken={onSelectPaymentToken}
                />
                <WillRender when={!isLoading}>
                  <Typography color="gray">
                    Buy with {roundingNumber(swappedAmount, 4)} {selectedToken?.symbol}
                  </Typography>
                </WillRender>
                <WillRender when={isLoading}>
                  <Typography color="gray">Buy with ...</Typography>
                </WillRender>
                <WillRender when={!isEmpty(errorMessage)}>
                  <Typography size="xSmall" color="danger">
                    {errorMessage}
                  </Typography>
                </WillRender>
              </div>
            </ModalBody>
            <ModalFooter>
              <WillRender when={!isEmpty(tokensNeedToApprove)}>
                <ApproveAction
                  symbol={tokensNeedToApprove[0]?.symbol}
                  tokenAddress={tokensNeedToApprove[0]?.address}
                  tokenType={ApproveTokenType.Erc20}
                  onApproveSuccessfully={onApproveSuccessfully}
                  onApproveFailed={onApproveFailed}
                />
              </WillRender>
              <WillRender when={isEmpty(tokensNeedToApprove)}>
                <Button isLoading={isLoading} fullWidth color="primary" onClick={onBuy}>
                  Buy
                </Button>
              </WillRender>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BuyModal;
