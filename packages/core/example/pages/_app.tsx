import Layout from '@components/common/layout/Layout';
import { NextUIProvider } from '@nextui-org/react';
import { createWalletgoContext, WalletgoProvider } from '@roninnetwork/walletgo';
import { AppProps } from 'next/app';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';

import '../styles/index.scss';

export const roninWalletContext = createWalletgoContext('RoninWalletContext');

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const { chainId } = publicRuntimeConfig;

  return (
    <NextUIProvider navigate={router.push}>
      <ThemeProvider defaultTheme="dark">
        <WalletgoProvider defaultChainId={Number(chainId)} context={roninWalletContext}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WalletgoProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}

export default MyApp;
