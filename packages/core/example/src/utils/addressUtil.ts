import { utils } from 'ethers/lib';

const { isAddress } = utils;

export const truncateAddress = (address = '') => {
  if (!address || !isAddress(address)) {
    return '';
  }
  const frontText = address.slice(0, 5);
  const middleText = '.'.repeat(3);
  const endText = address.slice(-4);
  return `${frontText}${middleText}${endText}`;
};
