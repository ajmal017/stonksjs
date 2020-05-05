const Series = require('./Series');

class Symbol {
  constructor(symbol) {
    this.symbol = symbol;
    this.times = new Series();
    this.open = new Series();
    this.high = new Series();
    this.low = new Series();
    this.close = new Series();
    this.indicators = {};
    this.bought = false;
  }
}

module.exports = Symbol;
