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
var currentVal = 0, oldVal = 0;
function fetchData(headers, params, baseurl) {
    return __awaiter(this, void 0, void 0, function () {
        var queryString, url;
        return __generator(this, function (_a) {
            queryString = new URLSearchParams(params).toString();
            url = "".concat(baseurl, "?").concat(queryString);
            return [2 /*return*/, fetch(url, {
                    headers: headers
                })
                    .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                    .then(function (data) {
                    // console.log({ data });
                    return data;
                })["catch"](function (error) {
                    console.error('Error fetching data:', error);
                })];
        });
    });
}
function fetchPrices() {
    return __awaiter(this, void 0, void 0, function () {
        var currentUnixTime, oneHourAgo, diff, status, percentage, headers_price, params_price, headers_tokenList, params_tokenList, headers_history, params_history, currentPrice, AhourAgo, TokenList, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentUnixTime = Math.floor(new Date().getTime() / 1000);
                    oneHourAgo = Math.floor((new Date().getTime() - 1800000) / 1000);
                    diff = 0, status = '', percentage = 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    headers_price = {
                        Authorization: 'Bearer YourAccessTokenHere',
                        'Content-Type': 'application/json',
                        'x-api-key': API_KEY
                    };
                    params_price = {
                        address: 'So11111111111111111111111111111111111111112'
                    };
                    headers_tokenList = {
                        // Authorization: 'Bearer YourAccessTokenHere',
                        // 'Content-Type': 'application/json',
                        'x-api-key': API_KEY,
                        'x-chain': 'solana'
                    };
                    params_tokenList = {
                        // address: 'So11111111111111111111111111111111111111112',
                        // quote_address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
                        // address_type: 'token',
                        // type: '15m',
                        // time_from: `${oneHourAgo}`,
                        // time_to: `${currentUnixTime}`,
                        sort_type: 'desc',
                        srot_by: 'mc'
                    };
                    headers_history = {
                        Authorization: 'Bearer YourAccessTokenHere',
                        'Content-Type': 'application/json',
                        'x-api-key': API_KEY
                    };
                    params_history = {
                        address: 'So11111111111111111111111111111111111111112',
                        type: '15m',
                        time_from: "".concat(oneHourAgo),
                        time_to: "".concat(currentUnixTime)
                    };
                    return [4 /*yield*/, fetchData(headers_price, params_price, price_endpoint)];
                case 2:
                    currentPrice = _a.sent();
                    return [4 /*yield*/, fetchData(headers_history, params_history, priceHistory)];
                case 3:
                    AhourAgo = _a.sent();
                    return [4 /*yield*/, fetchData(headers_tokenList, params_tokenList, tokenList_endpoint)];
                case 4:
                    TokenList = _a.sent();
                    console.log({ TokenList: TokenList });
                    // console.log({ currentPrice, AhourAgo });
                    currentVal = currentPrice.data.value;
                    oldVal = AhourAgo.data.items[0].value;
                    console.log({ oldVal: oldVal });
                    status =
                        currentVal > oldVal ? 'Buy' : currentVal < oldVal ? 'Sell' : 'None';
                    diff = Math.abs(currentVal - oldVal);
                    percentage = ((currentVal - oldVal) / oldVal) * 100;
                    updatePrices(diff, status, currentVal, percentage);
                    sliderBar(percentage * 100);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error fetching prices:', error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function updatePrices(diff, status, currentprice, percentage) {
    var buy = document.getElementById('buy');
    var buyElement = document.querySelector('.progress-bar2');
    buyElement.style.setProperty('--buy-width', "".concat((diff * 1000).toFixed(2), "px"));
    if (buy)
        buy.innerHTML =
            status == 'Buy'
                ? 'State = ' +
                    "".concat(status, ", ") +
                    'Increase = ' +
                    "".concat(diff.toFixed(2), ", ") +
                    'CurrentPrice = ' +
                    "".concat(currentprice.toFixed(2), " ") +
                    'Percentage = ' +
                    "".concat(percentage.toFixed(2))
                : status == 'Sell'
                    ? 'State = ' +
                        "".concat(status, ", ") +
                        'Decrease = ' +
                        "".concat(diff.toFixed(2), ", ") +
                        'CurrentPrice = ' +
                        "".concat(currentprice.toFixed(2), " ") +
                        'Percentage = ' +
                        "".concat(percentage.toFixed(2), " ")
                    : 'State = No Activity' +
                        'CurrentPrice = ' +
                        "".concat(currentprice.toFixed(2));
}
function convertHumanTimeToUnixTime(humanTime) {
    var unixTime = Date.parse(humanTime) / 1000; // Convert the humanTime to Unix time
    return unixTime;
}
var sliderBar = function (percentage) {
    var slider = document.getElementById('myRange');
    var valueDisplay = document.getElementById('valueDisplay');
    // console.log('sliderbar');
    // Set initial value display
    if (valueDisplay && slider) {
        valueDisplay.innerHTML = slider.value + '%';
        console.log(slider.value);
        // console.log('object not null');
        // Update value display position on slider input
        slider.addEventListener('input', function () {
            var newValue = ((+slider.value / 100) *
                (slider.offsetWidth - 10)); // Explicitly convert to number
            valueDisplay.style.left = newValue + 'px';
            valueDisplay.innerHTML = slider.value + '%';
        });
        // Auto change slider value
        // let value = 50; // Initial value
        // setInterval(function () {
        //   if (value < 100) {
        //     value++;
        //   } else {
        //     value = 0;
        //   }
        slider.value = percentage.toString();
        var newValue = ((slider.valueAsNumber / 100) *
            (slider.offsetWidth - 10)); // Explicitly convert to number
        valueDisplay.style.left = newValue + 'px';
        valueDisplay.innerHTML = slider.value + '%';
        // }, 100);
    }
};
setInterval(fetchPrices, 5000);
