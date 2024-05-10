import { getPaymentToken, paymentTokens, wRonToken } from '@sky-mavis/mavis-market-core';
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { isNil } from 'lodash';
import { FC, useMemo } from 'react';
import Typography from 'src/components/common/typography/Typography';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';
import { roundingNumber } from 'src/utils/roundingNumberUtil';

import styles from './Price.module.scss';

interface PriceProps {
  amount: string | null;
  tokenAddress?: string;
  isWRON?: boolean;
}

const Price: FC<PriceProps> = props => {
  const { chainId } = useGetWalletConnectData();

  const defaultTokenAddress = paymentTokens[chainId].RON.address;
  const { amount, tokenAddress = defaultTokenAddress, isWRON } = props;

  const token = isWRON ? wRonToken[chainId] : getPaymentToken(chainId, tokenAddress);
  const { imageUrl, decimals } = token || {};

  const price = useMemo(() => {
    if (isNil(amount)) {
      return null;
    }
    return formatUnits(BigNumber.from(amount), decimals);
  }, [amount, decimals]);

  const displayedPrice: string = useMemo(() => {
    if (isNil(price)) {
      return '--';
    }
    return roundingNumber(price);
  }, [price]);

  return (
    <div className={styles.price}>
      <img src={imageUrl} className={styles.logo} />
      <Typography>{displayedPrice}</Typography>
    </div>
  );
};

export default Price;
