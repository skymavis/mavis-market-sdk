import WillRender from '@components/common/will-render/WillRender';
import { BuyAction } from '@components/tokens/token-detail/common-actions';
import { Erc, Erc721Token, Offer, Order } from '@sky-mavis/mavis-market-core';
import { isNil } from 'lodash';
import { FC } from 'react';

import MakeOfferAction from './make-offer-action/MakeOfferAction';
import SwapRonAction from './swap-ron-action/SwapRonAction';

import styles from './VisitorActions.module.scss';

interface VisitorActionsProps {
  tokenData: Erc721Token;
  myOffer?: Offer | null;
}

const VisitorActions: FC<VisitorActionsProps> = props => {
  const { tokenData, myOffer } = props;
  const order = tokenData?.order;
  const hasOrder = !isNil(order);
  const hasOffer = !isNil(myOffer);

  return (
    <div className={styles.visitorActions}>
      <WillRender when={hasOrder}>
        <BuyAction order={order || ({} as Order)} tokenType={Erc.Erc721} />
      </WillRender>
      <WillRender when={!hasOffer}>
        <MakeOfferAction tokenData={tokenData} />
      </WillRender>
      <SwapRonAction />
    </div>
  );
};

export default VisitorActions;
