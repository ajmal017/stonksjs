const Alpaca = require('@alpacahq/alpaca-trade-api');

let cache;
const globalPaper = process.env.ALPACA_PAPER_TRADING !== undefined
  ? process.env.ALPACA_PAPER_TRADING
  : true;

const alpaca = (
  keyId = process.env.ALPACA_API_KEY,
  secretKey = process.env.ALPACA_API_SECRET,
  paper = globalPaper,
) => {
  if (!cache) {
    cache = new Alpaca({
      keyId,
      secretKey,
      paper,
    });
  }
  return cache;
};

module.exports = alpaca;
