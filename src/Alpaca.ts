const Alpaca = require('@alpacahq/alpaca-trade-api');

let cache;

class StonksAlpaca {
  alpaca = null;

  constructor(key: string, secret: string, paper: boolean = true) {
    if (!cache) {
      this.alpaca = new Alpaca({
        keyId: key,
        secretKey: secret,
        paper,
      });
      cache = this;
    }
    return cache;
  }
}

module.exports = StonksAlpaca;

// const instance = new StonksAlpaca(
//   process.env.ALPACA_API_KEY,
//   process.env.ALPACA_API_SECRET,
//   process.env.ALPACA_PAPER_TRADING
// );
// Object.freeze(instance);

// return instance;
