interface TokenPrice {
    address : string;
    unixTime: number;
    value: number;
}

export function calculateLiquidity(historicalPrices: TokenPrice[]): number {
  let liquidity: number = 0;
  for (let i = 0; i < historicalPrices.length - 1; i++) {
    const price1 = historicalPrices[i].value;
    const price2 = historicalPrices[i + 1].value;
    const timeDiff =
      historicalPrices[i + 1].unixTime - historicalPrices[i].unixTime;

    liquidity += ((price1 + price2) / 2) * timeDiff;
  }

  return liquidity;
}

// Example usage
// const tokenPrices: TokenPrice[] = [
//   {address : 'So11111111111111111111111111111111111111112', timestamp: 1, price: 100 },
//   {address : 'So11111111111111111111111111111111111111112', timestamp: 2, price: 110 },
//   {address : 'So11111111111111111111111111111111111111112', timestamp: 3, price: 120 },
//   {address : 'So11111111111111111111111111111111111111112', timestamp: 4, price: 130 },
// ];

// const liquidity = calculateLiquidity(tokenPrices);
// console.log(`Liquidity of cryptocurrency marketplace: ${liquidity}`);
