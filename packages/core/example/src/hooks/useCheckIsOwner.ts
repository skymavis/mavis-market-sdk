import { isNil } from 'lodash';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

export const useCheckIsOwner = (owner?: string | null) => {
  const { connectedAccount } = useGetWalletConnectData();

  return !isNil(owner) && connectedAccount?.toLowerCase() === owner?.toLowerCase();
};
