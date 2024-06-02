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
const token_address = '25hAyBQfoDhfWx9ay6rarbgvWGwDdNqcHsXS3jQ3mTDJ';
let currentVal: any = 0,
  oldVal: any = 0,
  bar_percent: number = 0;

//Function to fetch data form Server
async function fetchServerData(headers: any, params: any, baseurl: string) {
  // Implementation of fetching data from API
  let url: string = '';
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url = `${baseurl}?${queryString}`;
  } else {
    url = baseurl;
  }

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
      return data;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// Function to fetch data from Birdeye API endpoint
async function fetchData(headers: any, params: any, baseurl: string) {
  // Implementation of fetching data from API
  const queryString = new URLSearchParams(params).toString();
  const url = `${baseurl}?${queryString}`;

  return fetch(url, {
    headers: headers,
  })
    .then((response) => {
      //--Save data to database--
      // fetch(url, {
      //   method: 'POST',
      //   headers: headers,
      //   body: JSON.stringify(dataToSave),
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error('Network response was not ok');
      //     }
      //     return response.json();
      //   })
      //   .then((data) => {
      //     console.log('Data saved successfully:', data);
      //   })
      //   .catch((error) => {
      //     console.error('Error saving data to backend:', error);
      //   });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// Function to fetch prices from API
async function fetchPrices() {
  // Implementation of fetching prices from API
  let diff: number = 0,
    status: string = '',
    percentage: number = 0;
  let selectedToken: any = {};
  try {
    const headers_price = {
      Authorization: 'Bearer YourAccessTokenHere',
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    };
    const params_price = {
      address: token_address,
    };
    const headers_tokenList = {
      'x-api-key': API_KEY,
      'x-chain': 'solana',
    };
    const params_tokenList = {
      sort_type: 'desc',
      srot_by: 'mc',
    };
    const currentPrice = await fetchData(
      headers_price,
      params_price,
      price_endpoint,
    );
    const TokenList = await fetchData(
      headers_tokenList,
      params_tokenList,
      tokenList_endpoint,
    );
    if (TokenList)
      Object.assign(
        selectedToken,
        tokenFilter(TokenList.data.tokens, 'MANEKI')[0],
      );
    const liquidity = selectedToken.liquidity;
    const marketCap = selectedToken.mc;
    currentVal = currentPrice.data.value;
    status =
      currentVal > oldVal ? 'Buy' : currentVal < oldVal ? 'Sell' : 'None';
    diff = Math.abs(currentVal - oldVal);
    percentage = ((currentVal - oldVal) / oldVal) * 100;
    bar_percent = bar_percent + percentage;
    if (percentage == Infinity) bar_percent = 0;
    console.log({ percentage, bar_percent });
    oldVal = updatePrices(
      diff,
      status,
      currentVal,
      percentage,
      liquidity,
      marketCap,
    );
    sliderBar(bar_percent);
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
}

// Function to update prices and display on UI
function updatePrices(
  diff: number,
  pStatus: string,
  currentprice: number,
  percentage: number,
  pLiquidity: any,
  marketCap: any,
) {
  // Implementation of updating prices and status
  const transaction = document.getElementById('transaction') as HTMLDivElement;
  const status = document.getElementById('status') as HTMLDivElement;
  const price = document.getElementById('price') as HTMLDivElement;
  const liquidity = document.getElementById('liquidity') as HTMLDivElement;
  const marketcap = document.getElementById('marketcap') as HTMLDivElement;

  transaction.innerHTML = pStatus;
  status.innerHTML = diff.toFixed(9) + '';
  price.innerHTML = currentprice.toFixed(9) + '';
  liquidity.innerHTML = pLiquidity.toFixed(9) + '';
  marketcap.innerHTML = marketCap.toFixed(9) + '';

  return currentprice;
}

// Function to convert human readable time to Unix time
function convertHumanTimeToUnixTime(humanTime: string): number {
  // Implementation of converting human time to Unix time
  const unixTime = Date.parse(humanTime) / 1000; // Convert the humanTime to Unix time
  return unixTime;
}

// Function to initialize and update slider bar UI
const sliderBar = (percentage: number) => {
  // Implementation of slider bar UI
  const slider = document.getElementById('myRange') as HTMLInputElement;
  const valueDisplay = document.getElementById(
    'valueDisplay',
  ) as HTMLDivElement;

  if (valueDisplay && slider) {
    //range = min + max of <input type='range'>
    const range: number = 20;
    // Auto change slider value
    slider.value = percentage.toString();
    const newValue = ((Math.abs(slider.valueAsNumber + range / 2) / range) *
      (slider.offsetWidth - 30)) as number; // Explicitly convert to number
    valueDisplay.style.left = newValue + 'px';
    valueDisplay.innerHTML = slider.valueAsNumber.toFixed(2) + '%';
  }
};

//Function to filter Specified token
const tokenFilter = (tokenList: any, tokenSymbol: string) => {
  const Maneki = tokenList.filter((ele: any) => ele.symbol === tokenSymbol);
  if (Maneki) return Maneki;
};

// Interval to fetch prices every 5 seconds
setInterval(fetchPrices, 2000);
