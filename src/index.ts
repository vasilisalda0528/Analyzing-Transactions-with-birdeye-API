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
  oldVal: any = 0;

// Function to fetch data from API endpoint
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
  const currentUnixTime = Math.floor(new Date().getTime() / 1000);
  const oneHourAgo = Math.floor((new Date().getTime() - 60000) / 1000);
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
    const headers_history = {
      Authorization: 'Bearer YourAccessTokenHere',
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    };
    const params_history = {
      address: token_address,
      type: '1m',
      time_from: `${oneHourAgo}`,
      time_to: `${currentUnixTime}`,
    };

    const currentPrice = await fetchData(
      headers_price,
      params_price,
      price_endpoint,
    );
    console.log({ currentPrice });
    const AhourAgo = await fetchData(
      headers_history,
      params_history,
      priceHistory,
    );
    const TokenList = await fetchData(
      headers_tokenList,
      params_tokenList,
      tokenList_endpoint,
    );
    console.log({ AhourAgo });
    if (TokenList)
      Object.assign(
        selectedToken,
        tokenFilter(TokenList.data.tokens, 'MANEKI')[0],
      );
    console.log({ selectedToken });
    const liquidity = selectedToken.liquidity;
    const marketCap = selectedToken.mc;
    console.log({ liquidity, marketCap });
    currentVal = currentPrice.data.value;
    oldVal = AhourAgo.data.items[0] ? AhourAgo.data.items[0].value : oldVal;
    // console.log({ oldVal });
    status =
      currentVal > oldVal ? 'Buy' : currentVal < oldVal ? 'Sell' : 'None';
    diff = Math.abs(currentVal - oldVal);
    percentage = ((currentVal - oldVal) / oldVal) * 100;
    updatePrices(diff, status, currentVal, percentage, liquidity, marketCap);
    // oldVal = updatePrices(
    //   diff,
    //   status,
    //   currentVal,
    //   percentage,
    //   liquidity,
    //   marketCap,
    // );
    sliderBar(percentage);
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

  // return currentprice;
}

// Function to convert human readable time to Unix time
function convertHumanTimeToUnixTime(humanTime: string): number {
  // Implementation of converting human time to Unix time
  const unixTime = Date.parse(humanTime) / 1000; // Convert the humanTime to Unix time
  return unixTime;
}

// Function to initialize and update slider bar UI
const sliderBar = (percentage: number) => {
  let lPercent: number = 0,
    sliderRange: number = 0;
  // Implementation of slider bar UI
  const slider = document.getElementById('myRange') as HTMLInputElement;
  const valueDisplay = document.getElementById(
    'valueDisplay',
  ) as HTMLDivElement;
  const scaleLeft = document.getElementById('left') as HTMLDivElement;
  const scaleRight = document.getElementById('right') as HTMLDivElement;

  if (valueDisplay && slider) {
    if (percentage >= Math.pow(10, -1)) {
      sliderRange = 10;
    } else if (percentage >= Math.pow(10, -2)) {
      sliderRange = 100;
    } else if (percentage >= Math.pow(10, -3)) {
      sliderRange = 1000;
    } else {
      sliderRange = 10000;
    }
    console.log({ sliderRange, percentage });
    lPercent = percentage * sliderRange;
    scaleLeft.innerHTML = Math.pow(10, (-sliderRange * 10) / 10) + '';
    scaleRight.innerHTML = Math.pow(10, sliderRange / 10) + '';
    // Auto change slider value
    slider.value = lPercent.toString();
    const newValue = ((Math.abs(slider.valueAsNumber + 100) / 200) *
      (slider.offsetWidth - 10)) as number; // Explicitly convert to number
    valueDisplay.style.left = newValue + 'px';
    valueDisplay.innerHTML = slider.valueAsNumber / sliderRange + '%';
  }
};

//Function to filter Maneki token
const tokenFilter = (tokenList: any, tokenSymbol: string) => {
  const Maneki = tokenList.filter((ele) => ele.symbol === tokenSymbol);
  if (Maneki) return Maneki;
};

// Interval to fetch prices every 5 seconds
setInterval(fetchPrices, 2000);
