import Typography from '@components/common/typography/Typography';
import { Tab, Tabs } from '@nextui-org/react';
import { paymentTokens } from '@sky-mavis/mavis-market-core';
import { FC, Key } from 'react';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

import styles from './SelectPaymentTokens.module.scss';

interface SelectPaymentTokensProps {
  selectedTokenAddress: string;
  onSelectPaymentToken: (tokenAddress: string) => void;
}

const SelectPaymentTokens: FC<SelectPaymentTokensProps> = props => {
  const { selectedTokenAddress, onSelectPaymentToken } = props;
  const { chainId } = useGetWalletConnectData();

  const tokens = paymentTokens[chainId];

  const onSelect = (tokenAddress: Key) => {
    onSelectPaymentToken(tokenAddress as string);
  };

  return (
    <Tabs className={styles.tabs} selectedKey={selectedTokenAddress} onSelectionChange={onSelect}>
      {Object.entries(tokens).map(([, token]) => {
        const { address, imageUrl, symbol } = token;
        return (
          <Tab
            key={address}
            title={
              <div className={styles.token}>
                <img src={imageUrl} className={styles.image} />
                <Typography size="xSmall">{symbol}</Typography>
              </div>
            }
          />
        );
      })}
    </Tabs>
  );
};

export default SelectPaymentTokens;
