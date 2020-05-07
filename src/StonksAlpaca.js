const Alpaca = require('@alpacahq/alpaca-trade-api');

let cache;

class StonksAlpaca {
  constructor() {
    this.validateKeys();

    if (!cache) {
      this.alpaca = new Alpaca({
        keyId: process.env.ALPACA_API_KEY,
        secretKey: process.env.ALPACA_API_SECRET,
        paper: process.env.ALPACA_PAPER_TRADING,
      });
      cache = this;
    }
    return cache.alpaca;
  }

  validateKeys() {
    const requiredKeys = [
      'ALPACA_API_KEY',
      'ALPACA_API_SECRET',
      'ALPACA_PAPER_TRADING',
    ];
    requiredKeys.forEach((key) => {
      if (process.env[key] === undefined) {
        throw new Error(`${key} not defined`);
      }
    });
  }
}

module.exports = StonksAlpaca;
