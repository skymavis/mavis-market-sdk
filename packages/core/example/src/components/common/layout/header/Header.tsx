import Button from '@components/common/button/Button';
import WillRender from '@components/common/will-render/WillRender';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { isNil } from 'lodash';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';
import { truncateAddress } from 'src/utils/addressUtil';

import styles from './Header.module.scss';

interface HeaderProps {
  onConnectWallet: () => void;
}

const Header: FC<HeaderProps> = props => {
  const { onConnectWallet } = props;

  const router = useRouter();
  const { connectedAccount, disconnect } = useGetWalletConnectData();

  const onRedirectToHomepage = () => {
    router.push('/');
  };

  const handleSelectMenu = (key: string) => {
    if (key === 'disconnect') {
      disconnect();
      return;
    }
    if (key === 'inventory') {
      router.push('/inventory');
      return;
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <div className={styles.logo} onClick={onRedirectToHomepage}>
          <img src="https://cdn.skymavis.com/skymavis-home/public//homepage/core-value.png" width={40} />
          New Mavis Market
        </div>
        <WillRender when={isNil(connectedAccount)}>
          <Button color="primary" onClick={onConnectWallet}>
            Connect wallet
          </Button>
        </WillRender>
        <WillRender when={!isNil(connectedAccount)}>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">{truncateAddress(connectedAccount)}</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" onAction={key => handleSelectMenu(key as string)}>
              <DropdownItem key="inventory">Inventory</DropdownItem>
              <DropdownItem key="disconnect" className="text-danger" color="danger">
                Disconnect
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </WillRender>
      </div>
    </div>
  );
};

export default Header;
