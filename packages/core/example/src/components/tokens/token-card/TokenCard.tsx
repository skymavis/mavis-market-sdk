import Price from '@components/common/price/Price';
import Typography from '@components/common/typography/Typography';
import { useRouter } from 'next/router';
import { FC } from 'react';

import styles from './TokenCard.module.scss';

interface TokenCardProps {
  imageUrl: string;
  tokenAddress: string;
  tokenId: string;
  name: string;
  listingPrice?: string | null;
  paymentToken?: string;
}

const TokenCard: FC<TokenCardProps> = props => {
  const { tokenAddress, tokenId, name, listingPrice, paymentToken, imageUrl } = props;

  const router = useRouter();

  const onClickCard = () => {
    router.push(`/tokens/${tokenAddress}/${tokenId}`);
  };

  return (
    <div className={styles.tokenCard} onClick={onClickCard}>
      <div className={styles.imageWrapper}>
        <div className={styles.image}>
          <img src={imageUrl} />
        </div>
      </div>
      <div className={styles.footer}>
        <Typography className={styles.tokenName}>{name}</Typography>
        <Price tokenAddress={paymentToken} amount={listingPrice as string} />
      </div>
    </div>
  );
};

export default TokenCard;
