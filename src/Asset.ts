const StonksAlpaca = require('./Alpaca');

class Asset {
  symbol: string = '';
  bars: [] = [];

  constructor(symbol: string) {
    if (!symbol) {
      throw new Error('symbol must be defined');
    }
    this.symbol = symbol;
  }

  getBars() {
    // ...
  }
}

module.exports = Asset;
