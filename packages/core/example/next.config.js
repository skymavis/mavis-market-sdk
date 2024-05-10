const withTM = require('next-transpile-modules')(['@roninnetwork/walletgo', '@sky-mavis/mavis-market-core']);

const chainId = process.env.CHAIN_ID;

const nextConfig = withTM({
  reactStrictMode: true,
  env: {
    chainId,
  },
  publicRuntimeConfig: {
    chainId,
  },
});

module.exports = nextConfig;
