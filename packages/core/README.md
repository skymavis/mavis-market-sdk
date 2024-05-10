# Mavis market core

## Installation

With yarn

```
 yarn add @sky-mavis/mavis-market-core
```

With npm

```
 npm install @sky-mavis/mavis-market-core --save
```

## Usage

### Fetch data

#### _Get all collections_

```javascript
import { ChainId, getCollections } from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  from: 0,
  size: 10,
};

const { erc721Collections, erc1155Collections } = await getCollections(params);
```

#### _Get collection detail_

```javascript
import { ChainId, getCollection } from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  tokenAddress: '0x3fe52e39c3241ee5440a57edbb553563356b770c',
};

const collection = await getCollection(params);
```

#### _Get token metadata_

```javascript
import { ChainId, getTokenMetadata } from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  tokenAddress: '0x3fe52e39c3241ee5440a57edbb553563356b770c',
  showAttributes: true, // Optional
};

const tokenMetadata = await getTokenMetadata(params);
```

#### _Get all tokens_

```javascript
import {
  ChainId,
  AuctionType,
  ListingSortBy,
  getAllTokens,
} from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  owner: '0xce21e5ed74935379eda4d9120c3887423f960aac',
  from: 0,
  size: 1,
  auctionType: AuctionType.ForSale, // Optional
  sort: ListingSortBy.PriceAsc, // Optional
};

const { total, tokens } = await getAllTokens(params);
```

#### _Get erc721 tokens_

```javascript
import {
  ChainId,
  AuctionType,
  SortBy,
  getErc721Tokens,
} from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  tokenAddress: '0x3fe52e39c3241ee5440a57edbb553563356b770c',
  from: 0,
  size: 10,
  owner: '0xce21e5ed74935379eda4d9120c3887423f960aac', // Optional
  auctionType: AuctionType.NotForSale, // Optional
  criteria: [{ name: 'attribute_1', values: ['value_1', 'value_2'] }], // Optional
  sort: SortBy.SortBy, // Optional
  name: 'Cyberkongz', // Optional
  priceRange: {
    from: '1000000000000000000',
    to: '1000000000000000000',
  }, // Optional
  rangeCriteria: [
    {
      name: 'attribute_1',
      range: {
        from: '1000000000000000000',
        to: '1000000000000000000',
      },
    },
  ], // Optional
};

const { total, results } = await getErc721Tokens(params);
```

#### _Get erc721 token detail_

```javascript
import { ChainId, getErc721Token } from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  tokenAddress: '0x3fe52e39c3241ee5440a57edbb553563356b770c',
  tokenId: '982',
};

const data = await getErc721Token(params);
```

#### _Get erc721 token transfer history_

```javascript
import {
  ChainId,
  getErc721TokenTransferHistory,
} from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  tokenAddress: '0x3fe52e39c3241ee5440a57edbb553563356b770c',
  tokenId: '982',
  from: 0,
  size: 10,
};

const { total, results } = await getErc721TokenTransferHistory(params);
```

#### _Get erc1155 tokens_

```javascript
import {
  ChainId,
  AuctionType,
  SortBy,
  getErc1155Tokens,
} from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  tokenAddress: '0xb987afb62f67a317b5ddbc05c4ddba528a5dbd09',
  from: 0,
  size: 10,
  owner: '0xce21e5ed74935379eda4d9120c3887423f960aac', // Optional
  auctionType: AuctionType.NotForSale, // Optional
  criteria: [{ name: 'attribute_1', values: ['value_1', 'value_2'] }], // Optional
  sort: SortBy.PriceAsc, // Optional
  name: 'Cyberkongz', // Optional
};

const { total, results } = await getErc1155Tokens(params);
```

#### _Get erc1155 token detail_

```javascript
import { ChainId, getErc1155Token } from '@sky-mavis/mavis-market-core';
const params = {
  chainId: ChainId.testnet,
  tokenAddress: '0xb987afb62f67a317b5ddbc05c4ddba528a5dbd09',
  tokenId: '5',
};

const data = await getErc1155Token(params);
```

#### _Get erc1155 token transfer history_

```javascript
import {
  ChainId,
  getErc1155TokenTransferHistory,
} from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  tokenAddress: '0xb987afb62f67a317b5ddbc05c4ddba528a5dbd09',
  tokenId: '5',
  from: 0,
  size: 10,
};

const { total, results } = await getErc1155TokenTransferHistory(params);
```

#### _Get erc1155 balance_

```javascript
import { ChainId, getErc1155Balance } from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  tokenAddress: '0xb987afb62f67a317b5ddbc05c4ddba528a5dbd09',
  tokenId: '5',
  owner: '0xce21e5ed74935379eda4d9120c3887423f960aac',
};

const balance = await getErc1155Balance(params);
```

#### _Get erc721 order_

```javascript
import { ChainId, getErc721Order } from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  tokenAddress: '0x3fe52e39c3241ee5440a57edbb553563356b770c',
  tokenId: '982',
};

const order = await getErc721Order(params);
```

#### _Get erc1155 orders_

```javascript
import {
  ChainId,
  Erc1155SortBy,
  getErc1155Orders,
} from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  tokenAddress: '0xb987afb62f67a317b5ddbc05c4ddba528a5dbd09',
  tokenId: '5',
  from: 0,
  size: 10,
  maker: '0xce21e5ed74935379eda4d9120c3887423f960aac', // Optional,
  showInvalid: true, // Optional
  sort: Erc1155SortBy.PriceAsc, // Optional
};

const orders = await getErc1155Orders(params);
```

#### _Get order by hash_

```javascript
import { ChainId, getOrderByHash } from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  hash: 'f7c91f6f72b3fc2c19efea6abf34a6e713abc67c3beab9b152fa1f591b4472c8',
};

const order = await getOrderByHash(params);
```

#### _Get orders by address_

```javascript
import {
  ChainId,
  ListingSortBy,
  Erc,
  getOrdersByAddress,
} from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  account: '0xce21e5ed74935379eda4d9120c3887423f960aac',
  from: 0,
  size: 10,
  sort: ListingSortBy.PriceAsc, // Optional
  isValid: true, // Optional
  collectibleFilters: {
    tokenAddresses: ['0xb987afb62f67a317b5ddbc05c4ddba528a5dbd09'],
    erc: Erc.Erc1155,
  }, // Optional
};

const { total, quantity, data } = await getOrdersByAddress(params);
```

#### _Get offers_

```javascript
import { ChainId, getOffers } from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  tokenAddress: '0x3fe52e39c3241ee5440a57edbb553563356b770c',
  tokenId: '982',
  from: 0,
  size: 10,
};

const offers = await getOffers(params);
```

#### _Get offer detail_

```javascript
import { ChainId, getOffer } from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  hash: '1c91a5a0d8ef022344166e60e3da96ba819278fe496c4008bc0d028e8c9ab690',
};

const offer = await getOffer(params);
```

#### _Get sent offers_

```javascript
import {
  ChainId,
  getSentOffers,
  Erc,
  OfferSortBy,
} from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  from: 0,
  size: 10,
  account: '0xce21e5ed74935379eda4d9120c3887423f960aac',
  collectibleFilters: {
    tokenAddresses: ['0x3fe52e39c3241ee5440a57edbb553563356b770c'],
    erc: Erc.Erc721,
  }, // Optional
  isValid: true, // Optional
  sort: OfferSortBy.ExpiredAtAsc, // Optional
};

const { total, data } = await getSentOffers(params);
```

#### _Get received offers_

```javascript
import {
  ChainId,
  Erc,
  OfferSortBy,
  getReceivedOffers,
} from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  from: 0,
  size: 10,
  account: '0xce21e5ed74935379eda4d9120c3887423f960aac',
  collectibleFilters: {
    tokenAddresses: ['0x3fe52e39c3241ee5440a57edbb553563356b770c'],
    erc: Erc.Erc721,
  }, // Optional
  isValid: true, // Optional
  sort: OfferSortBy.ExpiredAtAsc, // Optional
};

const { total, data } = await getReceivedOffers(params);
```

#### _Get offers amount_

```javascript
import { ChainId, getOffersAmount } from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  account: '0xce21e5ed74935379eda4d9120c3887423f960aac',
};

const { receivedOffersAmount, sentOffersAmount } = await getOffersAmount(
  params
);
```

#### _Get offer by address_

```javascript
import { ChainId, getOfferByAddress } from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  tokenAddress: '0x3fe52e39c3241ee5440a57edbb553563356b770c',
  tokenId: '982',
  account: '0xce21e5ed74935379eda4d9120c3887423f960aac',
};

const offer = await getOfferByAddress(params);
```

#### _Get exchange rate_

```javascript
import { ChainId, getExchangeRate } from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
};

const exchangeRate = await getExchangeRate(params);
```

### Main actions

#### _Buy token_

```javascript
import {
  ChainId,
  paymentTokens,
  Token,
  ApproveTokenType,
  fetchPaymentTokenBalance,
  getOrder,
  checkIsErc721OrderValid,
  getTokensNeedToApprove,
  checkIsErc20Approved,
  buyToken
} from '@sky-mavis/mavis-market-core';

const wethAddress = paymentTokens[chainId][Token.WETH].address;
const ronAddress = paymentTokens[chainId][Token.RON].address;
const account = '0xce21e5ed74935379eda4d9120c3887423f960aac';
const chainId = ChainId.testnet;
const amount = '1000000000000000000';
const hash = 'f7c91f6f72b3fc2c19efea6abf34a6e713abc67c3beab9b152fa1f591b4472c8';

const wallet = createWalletClient();

// token balances
const wethBalance = await fetchPaymentTokenBalance(
  chainId,
  wethAddress,
  account
);
const isInsufficientBalance = await checkIsInsufficientBalance(
  chainId,
  wethAddress,
  account,
  amount
);

// check order is valiad
const checkIsOrderValid = async () => {
  const order = await getOrder({ chainId, hash });
  const isValid = await checkIsErc721OrderValid(chainId, order);
};


// approve token
const checkIsTokenApproved = async () => {
  const tokens = await getTokensNeedToApprove(
    chainId,
    account,
    wethAddress,
    ronAddress,
    amount
  );
  const isFirstTokenApproved = await checkIsErc20Approved(
    chainId,
    account,
    tokens[0].address,
    amount
  );
};

const params = {
  wallet,
  chainId,
  address: wethAddress,
  tokenType: ApproveTokenType.Erc20,
};
const tx = await approveToken(params);


// buy
const deadline = parseInt(`${new Date().getTime() / 1000 + 30 * 60}`); // 30 minutes

const params = {
  wallet,
  chainId,
  hash,
  selectedTokenAddress: wethAddress,
  deadline, // seconds,
};
const tx = await buyToken(params);
```

#### _Create order_

```javascript
import { 
  ChainId, 
  ApproveTokenType, 
  checkIsErc721Approved,
  approveToken
} from '@sky-mavis/mavis-market-core';
import * as functions from '@sky-mavis/mavis-market-core';

const wethAddress = paymentTokens[chainId][Token.WETH].address;
const tokenAddress = '0x3fe52e39c3241ee5440a57edbb553563356b770c';
const chainId = ChainId.testnet;

const wallet = createWalletClient();

// check token is approved
const isApproved = await functions.checkIsErc721Approved(
  chainId,
  account,
  tokenAddress
);

//approve token
const params = {
  wallet,
  chainId,
  address: tokenAddress,
  tokenType: ApproveTokenType.Erc721,
};

const tx = await approveToken(params);

// create order
const params = {
  wallet,
  chainId,
  tokenAddress,
  tokenId: '982',
  paymentToken: wethAddress,
  price: '1000000000000000000',
  duration: 1000000, // seconds
};
const order = await createOrder(params);
};
```

#### _Cancel order_

```javascript
import { 
  ChainId,
  cancelOrder,
} from '@sky-mavis/mavis-market-core';
import * as functions from '@sky-mavis/mavis-market-core';

const wallet = createWalletClient();
const params = {
  wallet,
  chainId: ChainId.testnet,
  hash: 'f7c91f6f72b3fc2c19efea6abf34a6e713abc67c3beab9b152fa1f591b4472c8',
};

const tx = await cancelOrder(params);
```

#### _Gift_

```javascript
import { ChainId, giftToken } from '@sky-mavis/mavis-market-core';

const wallet = createWalletClient();

const params = {
  wallet,
  chainId: ChainId.testnet,
  tokenId: '982',
  tokenAddress: '0x3fe52e39c3241ee5440a57edbb553563356b770c',
  receiverAddress: '0x1ef7a5fefc14fd7f48c31cca651741549a692183',
};
const tx = await giftToken(params);
```

#### _Wrap ron, unwrap ron_

```javascript
import { ChainId, wrapRon, unwrapRon } from '@sky-mavis/mavis-market-core';

// wrap RON
const wallet = createWalletClient();
const params = {
  wallet,
  chainId: ChainId.testnet,
  amount: '10',
};
const tx = await functions.wrapRon(params);

// unwrap RON
const wallet = createWalletClient();
const params = {
  wallet,
  chainId: ChainId.testnet,
  amount: '10',
};
const tx = await functions.unwrapRon(params);
```

#### Create offer

```javascript
import { 
  ChainId,
  checkIsInsufficientOfferBalance,
  checkIsWRonTokenApproved,
  approveToken,
} from '@sky-mavis/mavis-market-core';

const chainId = ChainId.testnet;
const account = '0xce21e5ed74935379eda4d9120c3887423f960aac';
const amount = '1000000000000000000';
const wRonAddress = wRonToken[chainId].address;

const isInsufficientOfferBalance = await functions.checkIsInsufficientOfferBalance(chainId, account, amount);
const isWronApproved = await checkIsWRonTokenApproved(
  chainId,
  account,
  amount,
};
if(!isWronApproved) {
  const params = {
    wallet,
    chainId,
    address: wRonAddress,
    tokenType: ApproveTokenType.WRon,
  };
  const tx = await approveToken(params);
}

// create offer
const wallet = createWalletClient();
const params = {
  wallet,
  chainId,
  tokenId: '529',
  tokenAddress: '0x3fe52e39c3241ee5440a57edbb553563356b770c',
  price: '1000000000000000000',
  duration: 10000, // seconds
};
const offer = await functions.makeOffer(params);
};
```

#### _Accept offer_

```javascript
import { ChainId, acceptOffer } from '@sky-mavis/mavis-market-core';

const wallet = createWalletClient();
const params = {
  wallet,
  chainId: ChainId.testnet,
  hash: '1c91a5a0d8ef022344166e60e3da96ba819278fe496c4008bc0d028e8c9ab690',
};
const tx = await functions.acceptOffer(params);
```

#### _Cancel offer_

```javascript
import { ChainId, cancelOffer } from '@sky-mavis/mavis-market-core';
import * as functions from '@sky-mavis/mavis-market-core';

const cancelOffer = async () => {
  const wallet = createWalletClient();

  const params = {
    wallet,
    chainId: ChainId.testnet,
    hash: '1c91a5a0d8ef022344166e60e3da96ba819278fe496c4008bc0d028e8c9ab690',
  };

  const tx = await functions.cancelOffer(params);
};
```

#### _Refresh metadata_

```javascript
import { ChainId, refreshMetadata } from '@sky-mavis/mavis-market-core';

const params = {
  chainId: ChainId.testnet,
  tokenAddress: '0xb987afb62f67a317b5ddbc05c4ddba528a5dbd09',
  tokenId: '5',
};
refreshMetadata(params);
```

### Utilities functions

#### _Create wallet client_

```javascript
import { ChainId } from '@sky-mavis/mavis-market-core';

const createWalletClient = () => {
  const web3Provider = new ethers.providers.Web3Provider(window.ronin.provider);
  const { signer, provider } = web3Provider;

  return {
    account: '0xce21e5ed74935379eda4d9120c3887423f960aac',
    signer,
    provider,
  };
};
```

#### _Get rate_

```javascript
import {
  ChainId,
  paymentTokens,
  Token,
  getRate,
} from '@sky-mavis/mavis-market-core';

const exchangeRate = await getExchangeRate();
const ronSymbol = paymentTokens[chainId][Token.RON].symbol;

const rate = getRate(ronSymbol, exchangeRate);
```

#### _Get config_

```javascript
import { getConfig } from '@sky-mavis/mavis-market-core';

const configs = getConfig(ChainId.testnet);
```

#### _Get swap config_

```javascript
import {
  ChainId,
  paymentTokens,
  Token,
  getSwapConfig,
} from '@sky-mavis/mavis-market-core';

const chainId = ChainId.testnet;
const ronAddress = paymentTokens[chainId][Token.RON].address;

const swapConfig = getSwapConfig(chainId, ronAddress);
```

#### _Get payment tokens_

```javascript
import { ChainId, getPaymentTokens } from '@sky-mavis/mavis-market-core';

const chainId = ChainId.testnet;

const tokens = getPaymentTokens(chainId);
```

#### _Get offer token_

```javascript
import { ChainId, wRonToken } from '@sky-mavis/mavis-market-core';

const chainId = ChainId.testnet;
const offerToken = wRonToken[chainId].address;
```

#### _Get swap token data_

```javascript
import {
  ChainId,
  paymentTokens,
  Token,
  getSwapTokenData,
} from '@sky-mavis/mavis-market-core';

const wethAddress = paymentTokens[chainId][Token.WETH].address;
const ronAddress = paymentTokens[chainId][Token.RON].address;

const params = {
  chainId: ChainId.testnet,
  inputTokenAddress: wethAddress,
  outputTokenAddress: ronAddress,
  amount: '1000000000000000000',
};

const {
  swappedAmount,
  maximumSent,
  liquidityProviderFee,
  liquidityProviderFeePercent,
  priceImpactPercent,
  slippageTolerance,
} = await getSwapTokenData(params);
```

#### _Convert amount to usd_

```javascript
import {
  ChainId,
  paymentTokens,
  Token,
  getExchangeRate,
  convertAmountToUsd,
} from '@sky-mavis/mavis-market-core';
import * as functions from '@sky-mavis/mavis-market-core';

const amount = '1000000000000000000';
const ronSymbol = paymentTokens[chainId][Token.RON].symbol;

const exchangeRate = await getExchangeRate(ChainId.testnet);

const usdPrice = convertAmountToUsd(amount, ronSymbol, exchangeRate);
```
