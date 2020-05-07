// @flow
require('dotenv').config();
const Alpaca = require('@alpacahq/alpaca-trade-api');

class Asset {
  symbol: string = '';
  alpaca: Alpaca;
  bars: [] = [];

  constructor(symbol: string) {
    if (!symbol) {
      throw new Error('symbol must be defined');
    }
    this.symbol = symbol;
    this.alpaca = new Alpaca({
      keyId: process.env.ALPACA_API_KEY,
      secretKey: process.env.ALPACA_API_SECRET,
      paper: process.env.ALPACA_PAPER_TRADING,
    });
  }

  parseDataObject(object: Object): Object {
    const {
      t: timestamp,
      o: open,
      h: high,
      l: low,
      c: close,
      v: volume,
    } = object;
    const date = new Date(timestamp * 1000);
    return {
      timestamp,
      date,
      open,
      high,
      low,
      close,
      volume,
    };
  }

  async getBars(interval: string = 'day', options: Object = {}): Promise<[]> {
    const settings = {
      limit: 5,
      ...options,
    };
    const response = await this.alpaca.getBars(interval, this.symbol, settings);
    // const output = {};
    // symbol.forEach((string) => {
    //   output[string] = getAssetHistoryObject(response, string, false);
    // });
    // return output;
    return this.bars;
  }
}

(async () => {
  const asset = new Asset('AALP');
  const bars = await asset.getBars();
  console.log({ asset, bars });
})();

module.exports = Asset;
