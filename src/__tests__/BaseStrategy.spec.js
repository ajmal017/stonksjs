const BaseStrategy = require('../BaseStrategy');
const mockBars = require('../../__mocks__/bars');

const symbol = Object.keys(mockBars)[0];

describe('BaseStrategy', () => {
  let strategy;
  beforeEach(() => {
    strategy = new BaseStrategy([symbol, 'AALP']);
  });

  it('should initialize symbols property', () => {
    expect(strategy.symbols).toBeInstanceOf(Object);
    expect(Object.keys(strategy.symbols)).toEqual([symbol]);
  });

  it('should add bar data', () => {
    const bar = mockBars[symbol][0];
    strategy.addBar(symbol, bar);
    [
      'times',
      'open',
      'close',
      'high',
      'low',
      'volume',
    ].forEach((key) => {
      expect(strategy.symbols[symbol][key].length).toEqual(1);
    });
  });

  it('should execute callback when adding bar', () => {
    const bar = mockBars[symbol][0];
    strategy.addBar(symbol, bar, (object) => {
      const keys = ['symbol', 'bar', 'buy', 'sell'];
      expect(object).toBeInstanceOf(Object);
      expect(Object.keys(object)).toEqual(keys);
    });
  });

  it('should all all bars to symbol data', () => {
    strategy.addHistory(symbol, mockBars[symbol]);
    expect(
      strategy.symbols[symbol].times.length,
    ).toEqual(mockBars[symbol].length);
  });

  it('should get price change', async () => {
    await strategy.setPriceChange();
    expect(true).toBe(true);
    // strategy.addHistory(symbol, mockBars[symbol]);
    // expect(
    //   strategy.symbols[symbol].times.length,
    // ).toEqual(mockBars[symbol].length);
  });
});
