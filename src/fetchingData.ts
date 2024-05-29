import axios from 'axios';
import { calculateLiquidity } from './liquidityCalculation';

// API key for accessing the Birdeye API
// const API_KEY = 'your_api_key_here';
const API_KEY = '78746b06e6cb4dc7985e96152cb6a8c3';
const token = '';
const price_endpoint = 'https://public-api.birdeye.so/defi/price';
const priceHistory = 'https://public-api.birdeye.so/defi/history_price';
const tradesToken_endpoint = 'https://public-api.birdeye.so/defi/txs/token';
const ohlcv_encpoint = 'https://public-api.birdeye.so/defi/ohlcv';
const ohclvBase_endpoint = 'https://public-api.birdeye.so/defi/ohlcv/base_quote';
const token_endpoint = 'https://public-api.birdeye.so/defi/tokenlist';
const market_endpoint = 'https://dev-public-api.birdeye.so/defi/v2/markets';
const tokenOverview_endpoint = 'https://public-api.birdeye.so/defi/token_overview';
const tokenList_endpoint = 'https://public-api.birdeye.so/defi/tokenlist';
const listSupportedchain_endpoint = "https://public-api.birdeye.so/v1/wallet/list_supported_chain";
// Function to fetch buy/sell data from the marketplace site for Solana
const fetchSolanaData = async () => {
  const response = await axios.get(listSupportedchain_endpoint, {
    headers: {
      // 'x-api-key': API_KEY,
      // 'Content-Type': 'application/json',
      'accept' : 'application/json',
      // eslint-disable-next-line prettier/prettier
      // 'Authorization' : 'Bearer ' + API_KEY,
    },
    params: {
      // address: 'So11111111111111111111111111111111111111112',
      // quote_address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      // address_type: 'token',
      // type: '15m',
      // time_from: 1716487767,
      // time_to: 1716574167,
      // sort_type:'desc',
      // srot_by:'v24hUSD',
      // offset : 0,
      // limit : 10
    },
  });
  return response.data;
};

// Function to fetch liquidity data from the marketplace site for BSC
const fetchBscLiquidityData = async () => {
  const response = await axios.get('https://api.birdeye.io/bsc/liquidity', {
    headers: {
      'x-api-key': API_KEY,
    },
  });
  return response.data;
};

// Function to fetch market cap data from the marketplace site for Base chain
const fetchBaseChainMarketCap = async () => {
  const response = await axios.get('https://api.birdeye.io/base/market-cap', {
    headers: {
      'x-api-key': API_KEY,
    },
  });
  return response.data;
};
// Main function to fetch and display data for Solana, BSC, and Base chain
export const fetchData = async () => {
  try {
    const solanaData = await fetchSolanaData();
    console.log('Solana Buy/Sell Data:', solanaData.data.tokens || 'none');
    // const liquidity = calculateLiquidity(solanaData.data.items);
    // console.log(`Liquidity of cryptocurrency marketplace: ${liquidity}`);
  } catch (err) {
    console.log('timeout!!');
  }
  // const bscLiquidityData = await fetchBscLiquidityData();
  // console.log('BSC Liquidity Data:', bscLiquidityData);

  // const baseChainMarketCap = await fetchBaseChainMarketCap();
  // console.log('Base Chain Market Cap:', baseChainMarketCap);
  // console.log('hi vasili, I am here');
};

export const fetchMarketDataPeriodically = () => {
  fetchData();
  setInterval(fetchData, 0.1 * 60 * 1000); // Fetch data every 6 seconds
};
