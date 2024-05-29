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
  const oneHourAgo = Math.floor((new Date().getTime() - 1800000) / 1000);
  let diff: number = 0,
    status: string = '',
    percentage: number = 0;
  try {
    const headers_price = {
      Authorization: 'Bearer YourAccessTokenHere',
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    };
    const params_price = {
      address: 'So11111111111111111111111111111111111111112',
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
    const TokenList = await fetchData(
      headers_tokenList,
      params_tokenList,
      tokenList_endpoint,
    );
    console.log({ TokenList });
    currentVal = currentPrice.data.value;
    oldVal = AhourAgo.data.items[0].value;
    console.log({ oldVal });
    status =
      currentVal > oldVal ? 'Buy' : currentVal < oldVal ? 'Sell' : 'None';
    diff = Math.abs(currentVal - oldVal);
    percentage = ((currentVal - oldVal) / oldVal) * 100;
    updatePrices(diff, status, currentVal, percentage);
    sliderBar(percentage * 100);
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
}

// Function to update prices and display on UI
function updatePrices(
  diff: number,
  status: string,
  currentprice: number,
  percentage: number,
) {
  // Implementation of updating prices and status
  const buy = document.getElementById('buy');
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
  const valueDisplay = document.getElementById('valueDisplay') as HTMLElement;
  const buyBar = document.querySelector('.buy') as HTMLDivElement;

  // Set initial value display
  if (valueDisplay && slider) {
    valueDisplay.innerHTML = slider.value + '%';
    console.log(slider.value);
    // Update value display position on slider input
    slider.addEventListener('input', function () {
      const value = parseInt(slider.value);
      const newValue = ((+slider.value / 100) *
        (slider.offsetWidth - 10)) as number; // Explicitly convert to number
      valueDisplay.style.left = newValue + 'px';
      valueDisplay.innerHTML = slider.value + '%';
      buyBar.style.width = Math.abs(value) + '%';
      if (value < 0) {
        buyBar.style.backgroundColor = '#EF476F';
      } else {
        buyBar.style.backgroundColor = '#2ECC40';
      }
      // valueDisplay.innerText = value;
    });

    // Auto change slider value
    slider.value = percentage.toString();
    const newValue = ((slider.valueAsNumber / 100) *
      (slider.offsetWidth - 10)) as number; // Explicitly convert to number
    valueDisplay.style.left = newValue + 'px';
    valueDisplay.innerHTML = slider.value + '%';
  }
};

// Interval to fetch prices every 5 seconds
setInterval(fetchPrices, 1000);
