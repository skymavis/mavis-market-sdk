import Typography from '@components/common/typography/Typography';
import WillRender from '@components/common/will-render/WillRender';
import { Erc1155Token, getErc1155Orders, Order } from '@sky-mavis/mavis-market-core';
import { isEmpty, isNil } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

import OrderItem from './order-item/OrderItem';

import styles from './AllOrders.module.scss';

interface AllOrdersProps {
  tokenData: Erc1155Token;
}

const AllOrders: FC<AllOrdersProps> = props => {
  const { tokenData } = props;
  const { tokenAddress, tokenId } = tokenData;

  const [orders, setOrders] = useState<Order[]>([]);

  const { chainId } = useGetWalletConnectData();

  const onGetAllOrders = async () => {
    try {
      if (!isNil(tokenAddress) && !isNil(tokenId)) {
        const orders = await getErc1155Orders({ chainId, tokenAddress, tokenId, from: 0, size: 50 });
        setOrders(orders);
      }
    } catch (err) {
      console.error('[get_all_orders_error]', err);
    }
  };

  useEffect(() => {
    onGetAllOrders();
  }, [tokenAddress, tokenId]);

  return (
    <div className={styles.allOrders}>
      <Typography size="medium">All orders</Typography>
      <WillRender when={!isEmpty(orders)}>
        <div className={styles.orders}>
          {orders.map((order, index) => (
            <div key={order.hash}>
              <WillRender when={index > 0}>
                <div className={styles.divider} />
              </WillRender>
              <OrderItem order={order} />
            </div>
          ))}
        </div>
      </WillRender>
      <WillRender when={isEmpty(orders)}>No offers found</WillRender>
    </div>
  );
};

export default AllOrders;
