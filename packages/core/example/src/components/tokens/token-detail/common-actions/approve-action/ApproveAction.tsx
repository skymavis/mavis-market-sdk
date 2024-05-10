import Button from '@components/common/button/Button';
import { approveToken, ApproveTokenType } from '@sky-mavis/mavis-market-core';
import { isNil } from 'lodash';
import { FC, useState } from 'react';
import { useGetWalletConnectData } from 'src/hooks/useGetWalletConnectData';

interface ApproveActionProps {
  symbol: string | null;
  tokenAddress: string;
  tokenType: ApproveTokenType;
  onApproveSuccessfully: () => void;
  onApproveFailed: (errorMessage: string) => void;
}

const ApproveAction: FC<ApproveActionProps> = props => {
  const { symbol, tokenAddress, tokenType, onApproveSuccessfully, onApproveFailed } = props;

  const { chainId, wallet } = useGetWalletConnectData();

  const [isApproving, setIsApproving] = useState(false);

  const onApprove = async () => {
    if (!isNil(wallet)) {
      try {
        setIsApproving(true);
        await approveToken({ chainId, wallet, address: tokenAddress, tokenType });
        onApproveSuccessfully();
      } catch (err: any) {
        onApproveFailed(err?.message || err);
      } finally {
        setIsApproving(false);
      }
    }
  };

  return (
    <Button color="primary" isLoading={isApproving} fullWidth onClick={onApprove}>
      Approve {symbol}
    </Button>
  );
};

export default ApproveAction;
