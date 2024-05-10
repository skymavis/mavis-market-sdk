import { CollectionData, Erc721Token, Offer } from '@sky-mavis/mavis-market-core';
import { FC } from 'react';
import { useCheckIsOwner } from 'src/hooks/useCheckIsOwner';

import OwnerActions from './owner-actions/OwnerActions';
import VisitorActions from './visitor-actions/VisitorActions';

interface ActionsProps {
  tokenData: Erc721Token;
  collectionData: CollectionData;
  myOffer?: Offer | null;
}

const Actions: FC<ActionsProps> = props => {
  const { tokenData, collectionData, myOffer } = props;
  const { owner } = tokenData;
  const isOwner = useCheckIsOwner(owner);

  if (isOwner) {
    return <OwnerActions tokenData={tokenData} collectionData={collectionData} />;
  }

  return <VisitorActions myOffer={myOffer} tokenData={tokenData} />;
};

export default Actions;
