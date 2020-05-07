const Series = require('./Series');
const auth = require('./helpers/alpaca');

class BaseStrategy {
  symbols = {};
  config = {};
  alpaca = auth();

  constructor(symbols = [], config = {}) {
    this.config = config;
    const symbolsArray = Array.isArray(symbols) ? symbols : [symbols];
    symbolsArray.forEach(this.initSymbol);
  }

  initSymbol = (symbol) => {
    if (!(symbol in this.symbols)) {
      this.symbols[symbol] = {
        times: new Series(),
        open: new Series(),
        close: new Series(),
        high: new Series(),
        low: new Series(),
        volume: new Series(),
        indicators: {},
        bought: false,
        change: 0,
      };
    }
  }

  async setAllPriceChanges(symbol, limit = 10) {
    const response = await this.alpaca.getBars('1Min', symbol, { limit }))
  }

  async setPriceChange() {
    const limit = 10;
    const promises = Object.keys(this.symbols)
      .map((symbol) => this.alpaca.getBars('1Min', symbol, { limit }));
    const response = await Promise.all(promises);
    response.forEach((object) => {
      const symbol = Object.keys(object)[0];
      const data = object[symbol];
      if (!data.length) return;
      const lastBar = data[data.length - 1];
      const firstBar = data[0];
      // console.log({ lastBar, firstBar });
      this.symbols[symbol].change = (lastBar.c - firstBar.o) / firstBar.o;
    });
  }

  addBar(symbol, bar, callback) {
    this.symbols[symbol].times.push((new Date(bar.t * 1000)).getTime());
    this.symbols[symbol].open.push(bar.o);
    this.symbols[symbol].close.push(bar.c);
    this.symbols[symbol].high.push(bar.h);
    this.symbols[symbol].low.push(bar.l);
    this.symbols[symbol].volume.push(bar.v);

    if (callback) {
      callback({
        symbol,
        bar,
        buy: this.buy(symbol),
        sell: this.sell(symbol),
      });
    }
  }

  async addHistory(symbol, bars) {
    if (Array.isArray(bars)) {
      bars.forEach((bar) => {
        this.addBar(symbol, bar);
      });
    }
    await this.setPriceChange();
  }

  buy() {
    // ...
  }

  sell() {
    // ...
  }
}

module.exports = BaseStrategy;
