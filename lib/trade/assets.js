const getAccount = require('../account/getAccount');
const getAssetHistory = require('../assets/getAssetHistory');
const getPositionSymbols = require('../positions/getPositionSymbols');
const { stocksToWatch } = require('../helpers/constants');
// const scrape = require('../scrape');

module.exports = async (cash) => {
  let buyingPower = cash;
  if (!buyingPower) {
    const account = await getAccount();
    buyingPower = account.buyingPower;
  }
  const positions = await getPositionSymbols();
  // const stocksToWatch = await scrape();
  const symbols = [...new Set([
    ...positions,
    ...stocksToWatch,
  ])];
  const assets = await getAssetHistory(symbols, 'minute', { limit: 1 });
  const data = Object.entries(assets)
    // .filter(([, [{ close }]]) => close < buyingPower / 2)
    .filter(([, [{ close }]]) => close < buyingPower)
    .reduce((output, [key, [object]]) => ({
      ...output,
      [key]: object,
    }), {});
  return Object.keys(data);
};
