import { useCustomWalletgo } from '@roninnetwork/walletgo';
import { ChainId } from '@sky-mavis/mavis-market-core';
import { isNil } from 'lodash';
import getConfig from 'next/config';
import { roninWalletContext } from 'pages/_app';
import { useMemo } from 'react';

export const useGetWalletConnectData = () => {
  const { account, walletProvider, deactivate } = useCustomWalletgo(roninWalletContext);
  const { publicRuntimeConfig } = getConfig();
  const { chainId } = publicRuntimeConfig;

  const wallet = useMemo(() => {
    const signer = walletProvider?.getSigner();

    if (isNil(walletProvider) || isNil(account) || isNil(signer)) {
      return null;
    }

    return {
      provider: signer,
      signer: signer,
      account: account?.toLowerCase(),
    };
  }, []);

  return {
    wallet,
    connectedAccount: account?.toLowerCase(),
    chainId: Number(chainId) as ChainId,
    disconnect: deactivate,
  };
};
