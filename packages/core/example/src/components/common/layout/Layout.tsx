import Footer from '@components/common/layout/footer/Footer';
import Header from '@components/common/layout/header/Header';
import { createRoninWallets, WalletWidget } from '@roninnetwork/walletgo';
import { roninWalletContext } from 'pages/_app';
import { FC, ReactNode, useState } from 'react';

import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const WC_PROJECT_ID = 'd2ef97836db7eb390bcb2c1e9847ecdc';

const Layout: FC<LayoutProps> = props => {
  const { children } = props;

  const [showWidget, setShowWidget] = useState(false);

  const onOpenWalletWidget = () => {
    setShowWidget(true);
  };

  const onCloseWalletWidget = () => {
    setShowWidget(false);
  };

  return (
    <div className={styles.layout}>
      <WalletWidget
        customContext={roninWalletContext}
        isOpen={showWidget}
        onClose={onCloseWalletWidget}
        wallets={createRoninWallets({
          projectId: WC_PROJECT_ID,
          clientMeta: {
            name: 'Mavis marketplace',
            description: 'Mavis marketplace',
            icons: ['https://cdn.skymavis.com/skymavis-home/public/favicon.ico'],
            url: 'https://marketplace.skymavis.com',
          },
          ethereumWallets: false,
        })}
      />
      <div>
        <Header onConnectWallet={onOpenWalletWidget} />
        <div className={styles.content}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
