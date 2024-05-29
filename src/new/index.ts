const API_KEY = 'cd96201ae90a4ddb917aa2a994b6bd5c';
const token = '';
const price_endpoint = 'https://public-api.birdeye.so/defi/price';
const priceHistory = 'https://public-api.birdeye.so/defi/history_price';
const tradesToken_endpoint = 'https://public-api.birdeye.so/defi/txs/token';
const ohlcv_encpoint = 'https://public-api.birdeye.so/defi/ohlcv';
const ohclvBase_endpoint =
  'https://public-api.birdeye.so/defi/ohlcv/base_quote';
const token_endpoint = 'https://public-api.birdeye.so/defi/tokenlist';
const market_endpoint = 'https://dev-public-api.birdeye.so/defi/v2/markets';
const tokenOverview_endpoint =
  'https://public-api.birdeye.so/defi/token_overview';
const tokenList_endpoint = 'https://public-api.birdeye.so/defi/tokenlist';
const listSupportedchain_endpoint =
  'https://public-api.birdeye.so/v1/wallet/list_supported_chain';
let currentVal: any = 0,
  oldVal: any = 0;

async function fetchData(headers: any, params: any, baseurl: string) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${baseurl}?${queryString}`;

  return fetch(url, {
    headers: headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // console.log({ data });
      return data;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

async function fetchPrices() {
  const currentUnixTime = Math.floor(new Date().getTime() / 1000);
  const oneHourAgo = Math.floor((new Date().getTime() - 1800000) / 1000);
  let diff: number = 0,
    status: string = '',
    percentage: number = 0;

  // console.log('Current Unix Time: ' + currentUnixTime);
  // console.log('Time 1 hour ago: ' + oneHourAgo);

  try {
    const headers_price = {
      Authorization: 'Bearer YourAccessTokenHere',
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    };
    const params_price = {
      address: 'So11111111111111111111111111111111111111112',
      // quote_address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      // address_type: 'token',
      // type: '15m',
      // time_from: `${oneHourAgo}`,
      // time_to: `${currentUnixTime}`,
      // sort_type:'desc',
      // srot_by:'v24hUSD',
      // offset : 0,
      // limit : 10
    };
    const headers_history = {
      Authorization: 'Bearer YourAccessTokenHere',
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    };
    const params_history = {
      address: 'So11111111111111111111111111111111111111112',
      type: '15m',
      time_from: `${oneHourAgo}`,
      time_to: `${currentUnixTime}`,
    };

    const currentPrice = await fetchData(
      headers_price,
      params_price,
      price_endpoint,
    );
    const AhourAgo = await fetchData(
      headers_history,
      params_history,
      priceHistory,
    );

    // console.log({ currentPrice, AhourAgo });
    currentVal = currentPrice.data.value;
    oldVal = AhourAgo.data.items[0].value;
    console.log({ oldVal });
    status =
      currentVal > oldVal ? 'Buy' : currentVal < oldVal ? 'Sell' : 'None';
    diff = Math.abs(currentVal - oldVal);
    percentage = ((currentVal - oldVal) / oldVal) * 100;
    // console.log('percentage:', ((currentVal - oldVal) / oldVal) * 100);
    updatePrices(diff, status, currentVal, percentage);
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
}

function updatePrices(
  diff: number,
  status: string,
  currentprice: number,
  percentage: number,
) {
  const buy = document.getElementById('buy');
  const buyElement = document.querySelector('.progress-bar2') as HTMLElement;
  buyElement.style.setProperty('--buy-width', `${(diff * 1000).toFixed(2)}px`);
  if (buy)
    buy.innerHTML =
      status == 'Buy'
        ? 'State = ' +
          `${status}, ` +
          'Increase = ' +
          `${diff.toFixed(2)}, ` +
          'CurrentPrice = ' +
          `${currentprice.toFixed(2)} ` +
          'Percentage = ' +
          `${percentage.toFixed(2)}`
        : status == 'Sell'
        ? 'State = ' +
          `${status}, ` +
          'Decrease = ' +
          `${diff.toFixed(2)}, ` +
          'CurrentPrice = ' +
          `${currentprice.toFixed(2)} ` +
          'Percentage = ' +
          `${percentage.toFixed(2)} `
        : 'State = No Activity' +
          'CurrentPrice = ' +
          `${currentprice.toFixed(2)}`;
}

function convertHumanTimeToUnixTime(humanTime: string): number {
  const unixTime = Date.parse(humanTime) / 1000; // Convert the humanTime to Unix time
  return unixTime;
}

setInterval(fetchPrices, 5000);
