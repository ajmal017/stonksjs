const Alpaca = require('@alpacahq/alpaca-trade-api');
const parseResponse = require('./helpers/parseResponse');
const logger = require('./helpers/logger');

class Order {
  id = null;
  clientOrderId = null;
  createdAt = null;
  updatedAt = null;
  submittedAt = null;
  filledAt = null;
  expiredAt = null;
  canceledAt = null;
  failedAt = null;
  assetId = null;
  symbol = null;
  assetClass = null;
  qty = null;
  filledQty = null;
  type = null;
  side = null;
  timeInForce = null;
  limitPrice = null;
  stopPrice = null;
  filledAvgPrice = null;
  status = null;
  extendedHours = null;
  legs = null;
  alpaca = null;

  constructor(options) {
    const object = typeof options === 'string'
      ? { symbol: options }
      : { ...options };
    if (object) {
      this.setProps(object);
    }

    this.alpaca = new Alpaca({
      keyId: process.env.keyId,
      secretKey: process.env.secretKey,
      paper: process.env.paper,
    });
  }

  setProps(response) {
    const object = parseResponse(response);
    const output = {};
    Object.entries(object).forEach(([key, value]) => {
      this[key] = value;
      output[key] = value;
    });
    return output;
  }

  async cancel() {
    const response = await this.alpaca.cancelOrder(this.id);
    return parseResponse(response);
  }

  async create(qty, side) {
    if (qty <= 0) {
      logger.error('Order qty must be greater than 0');
      return null;
    }
    const response = await this.alpaca.createOrder({
      symbol: this.symbol,
      qty,
      side,
      type: 'market',
      time_in_force: 'day',
    });
    const output = this.setProps(response);
    return output;
  }
}

module.exports = Order;
