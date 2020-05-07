const Alpaca = require('@alpacahq/alpaca-trade-api');

// let cache;
const globalPaper = process.env.ALPACA_PAPER_TRADING !== undefined
  ? process.env.ALPACA_PAPER_TRADING
  : true;

class BassClass {
  constructor(
    keyId = process.env.ALPACA_API_KEY,
    secretKey = process.env.ALPACA_API_SECRET,
    paper = globalPaper,
  ) {
    if (!keyId || !secretKey) {
      throw new Error('keyId and secretKey are required');
    }

    this.alpaca = new Alpaca({
      keyId,
      secretKey,
      paper,
    });
  }
}

module.exports = BassClass;
