import WillRender from '@components/common/will-render/WillRender';
import { Offer } from '@sky-mavis/mavis-market-core';
import { FC } from 'react';

import OfferItem from './offer-item/OfferItem';

import styles from './Offers.module.scss';

interface OffersProps {
  offers: Offer[];
  owner: string;
}

const Offers: FC<OffersProps> = props => {
  const { offers, owner } = props;

  return (
    <div className={styles.offers}>
      {offers.map((offer, index) => (
        <div key={offer.hash}>
          <WillRender when={index > 0}>
            <div className={styles.divider} />
          </WillRender>
          <OfferItem owner={owner} offer={offer} />
        </div>
      ))}
    </div>
  );
};

export default Offers;
