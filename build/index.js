"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var API_KEY = 'cd96201ae90a4ddb917aa2a994b6bd5c';
var token = '';
var price_endpoint = 'https://public-api.birdeye.so/defi/price';
var priceHistory = 'https://public-api.birdeye.so/defi/history_price';
var tradesToken_endpoint = 'https://public-api.birdeye.so/defi/txs/token';
var ohlcv_encpoint = 'https://public-api.birdeye.so/defi/ohlcv';
var ohclvBase_endpoint = 'https://public-api.birdeye.so/defi/ohlcv/base_quote';
var token_endpoint = 'https://public-api.birdeye.so/defi/tokenlist';
var market_endpoint = 'https://dev-public-api.birdeye.so/defi/v2/markets';
var tokenOverview_endpoint = 'https://public-api.birdeye.so/defi/token_overview';
var tokenList_endpoint = 'https://public-api.birdeye.so/defi/tokenlist';
var listSupportedchain_endpoint = 'https://public-api.birdeye.so/v1/wallet/list_supported_chain';
var token_address = '25hAyBQfoDhfWx9ay6rarbgvWGwDdNqcHsXS3jQ3mTDJ';
var currentVal = 0, oldVal = 0, bar_percent = 0;
//Function to fetch data form Server
function fetchServerData(headers, params, baseurl) {
    return __awaiter(this, void 0, void 0, function () {
        var url, queryString;
        return __generator(this, function (_a) {
            url = '';
            if (params) {
                queryString = new URLSearchParams(params).toString();
                url = "".concat(baseurl, "?").concat(queryString);
            }
            else {
                url = baseurl;
            }
            return [2 /*return*/, fetch(url, {
                    headers: headers,
                })
                    .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                    .then(function (data) {
                    return data;
                })
                    .catch(function (error) {
                    console.error('Error fetching data:', error);
                })];
        });
    });
}
// Function to fetch data from Birdeye API endpoint
function fetchData(headers, params, baseurl) {
    return __awaiter(this, void 0, void 0, function () {
        var queryString, url;
        return __generator(this, function (_a) {
            queryString = new URLSearchParams(params).toString();
            url = "".concat(baseurl, "?").concat(queryString);
            return [2 /*return*/, fetch(url, {
                    headers: headers,
                })
                    .then(function (response) {
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
                    .then(function (data) {
                    return data;
                })
                    .catch(function (error) {
                    console.error('Error fetching data:', error);
                })];
        });
    });
}
// Function to fetch prices from API
function fetchPrices() {
    return __awaiter(this, void 0, void 0, function () {
        var currentUnixTime, oneHourAgo, diff, status, percentage, selectedToken, headers_price, params_price, headers_tokenList, params_tokenList, currentPrice, TokenList, liquidity, marketCap, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUnixTime = Math.floor(new Date().getTime() / 1000);
                    oneHourAgo = Math.floor((new Date().getTime() - 60000) / 1000);
                    diff = 0, status = '', percentage = 0;
                    selectedToken = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    headers_price = {
                        Authorization: 'Bearer YourAccessTokenHere',
                        'Content-Type': 'application/json',
                        'x-api-key': API_KEY,
                    };
                    params_price = {
                        address: token_address,
                    };
                    headers_tokenList = {
                        'x-api-key': API_KEY,
                        'x-chain': 'solana',
                    };
                    params_tokenList = {
                        sort_type: 'desc',
                        srot_by: 'mc',
                    };
                    return [4 /*yield*/, fetchData(headers_price, params_price, price_endpoint)];
                case 2:
                    currentPrice = _a.sent();
                    return [4 /*yield*/, fetchData(headers_tokenList, params_tokenList, tokenList_endpoint)];
                case 3:
                    TokenList = _a.sent();
                    if (TokenList)
                        Object.assign(selectedToken, tokenFilter(TokenList.data.tokens, 'MANEKI')[0]);
                    liquidity = selectedToken.liquidity;
                    marketCap = selectedToken.mc;
                    currentVal = currentPrice.data.value;
                    status =
                        currentVal > oldVal ? 'Buy' : currentVal < oldVal ? 'Sell' : 'None';
                    diff = Math.abs(currentVal - oldVal);
                    percentage = ((currentVal - oldVal) / oldVal) * 100;
                    bar_percent = bar_percent + percentage;
                    if (percentage == Infinity)
                        bar_percent = 0;
                    console.log({ percentage: percentage, bar_percent: bar_percent });
                    oldVal = updatePrices(diff, status, currentVal, percentage, liquidity, marketCap);
                    sliderBar(bar_percent);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error fetching prices:', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Function to update prices and display on UI
function updatePrices(diff, pStatus, currentprice, percentage, pLiquidity, marketCap) {
    // Implementation of updating prices and status
    var transaction = document.getElementById('transaction');
    var status = document.getElementById('status');
    var price = document.getElementById('price');
    var liquidity = document.getElementById('liquidity');
    var marketcap = document.getElementById('marketcap');
    transaction.innerHTML = pStatus;
    status.innerHTML = diff.toFixed(9) + '';
    price.innerHTML = currentprice.toFixed(9) + '';
    liquidity.innerHTML = pLiquidity.toFixed(9) + '';
    marketcap.innerHTML = marketCap.toFixed(9) + '';
    return currentprice;
}
// Function to convert human readable time to Unix time
function convertHumanTimeToUnixTime(humanTime) {
    // Implementation of converting human time to Unix time
    var unixTime = Date.parse(humanTime) / 1000; // Convert the humanTime to Unix time
    return unixTime;
}
// Function to initialize and update slider bar UI
var sliderBar = function (percentage) {
    // Implementation of slider bar UI
    var slider = document.getElementById('myRange');
    var valueDisplay = document.getElementById('valueDisplay');
    if (valueDisplay && slider) {
        // Auto change slider value
        slider.value = (percentage * 10).toString();
        var newValue = ((Math.abs(slider.valueAsNumber + 50) / 100) *
            (slider.offsetWidth - 30)); // Explicitly convert to number
        valueDisplay.style.left = newValue + 'px';
        valueDisplay.innerHTML = (slider.valueAsNumber / 10).toFixed(2) + '%';
    }
};
//Function to filter Specified token
var tokenFilter = function (tokenList, tokenSymbol) {
    var Maneki = tokenList.filter(function (ele) { return ele.symbol === tokenSymbol; });
    if (Maneki)
        return Maneki;
};
// Interval to fetch prices every 5 seconds
setInterval(fetchPrices, 2000);
