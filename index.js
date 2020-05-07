require('dotenv').config();
const Stonks = require('./lib/Stonks');

(async () => {
  const stonks = new Stonks(
    process.env.ALPACA_API_KEY,
    process.env.ALPACA_API_SECRET,
    process.env.ALPACA_PAPER_TRADING,
  );
  const output = await stonks.run();
  // eslint-disable-next-line no-console
  console.log(output);
})();
