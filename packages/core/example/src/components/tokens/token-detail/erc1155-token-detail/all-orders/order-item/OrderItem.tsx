import Price from '@components/common/price/Price';
import Typography from '@components/common/typography/Typography';
import WillRender from '@components/common/will-render/WillRender';
import BuyAction from '@components/tokens/token-detail/common-actions/buy-action/BuyAction';
import { Erc, Order } from '@sky-mavis/mavis-market-core';
import { isNil } from 'lodash';
import { FC } from 'react';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

import styles from './OrderItem.module.scss';

interface OrderItemProps {
  order: Order;
}

const OrderItem: FC<OrderItemProps> = props => {
  const { order } = props;
  const { maker, makerProfile, currentPrice, paymentToken, orderQuantity } = order;

  const { connectedAccount } = useGetWalletConnectData();

  return (
    <div className={styles.orderItem}>
      <div className={styles.detail}>
        <div className={styles.item}>
          <Typography size="xSmall" color="gray">
            From:
          </Typography>
          <Typography size="xSmall">{makerProfile?.name || maker}</Typography>
        </div>
        <div className={styles.item}>
          <Typography size="xSmall" color="gray">
            Listing price:
          </Typography>
          <Price amount={currentPrice} tokenAddress={paymentToken} />
        </div>
        <div className={styles.item}>
          <Typography size="xSmall" color="gray">
            Available quantity:
          </Typography>
          <Typography>{orderQuantity?.availableQuantity}</Typography>
        </div>
      </div>
      <WillRender when={!isNil(connectedAccount)}>
        <div>
          <BuyAction order={order} tokenType={Erc.Erc1155} />
        </div>
      </WillRender>
    </div>
  );
};

export default OrderItem;
