require('dotenv').config();
const Alpaca = require('@alpacahq/alpaca-trade-api');

const keyId = process.env.ALPACA_API_KEY;
const secretKey = process.env.ALPACA_API_SECRET;
const USE_POLYGON = false;

const alpaca = new Alpaca({
  keyId,
  secretKey,
  paper: true,
  usePolygon: USE_POLYGON,
});
(async () => {
  // try {
  //   // minute, 1Min, 5Min, 15Min, day or 1D
  //   const data = await alpaca.getBars('day', 'SPY,AALP');
  //   console.log(data);
  // } catch (error) {
  //   console.error(error);
  // }

  // get percentage change
  // const symbols = ['SPY'];
  // const limit = 10;
  // const promises = symbols.map((symbol) => alpaca.getBars('1Min', symbol, { limit }));
  // const [json] = await Promise.all(promises);
  // const data = json[symbols[0]];
  // const change = (data[limit - 1].c - data[0].o) / data[0].o;
  // console.log(change);

  // try {
  //   // symbol, date string (2018-02-02)
  //   const data = await alpaca.getAggregates('SPY', 'min');
  //   console.log(data);
  // } catch (error) {
  //   console.error(error);
  // }
})();
