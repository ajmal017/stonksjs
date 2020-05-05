const Alpaca = require('@alpacahq/alpaca-trade-api');
const formatDistance = require('date-fns/formatDistance');
const subMinutes = require('date-fns/subMinutes');
const isAfter = require('date-fns/isAfter');
const Order = require('./Order');
const parseResponse = require('./helpers/parseResponse');
const logger = require('./helpers/logger');

class Stonks {
  Alpaca = null;
  alpaca = null;
  keyId = null;
  secretKey = null;
  paper = null;
  _stocks = [];
  positions = [];
  orders = [];
  long = [];
  short = [];
  qShort = null;
  qLong = null;
  adjustedQLong = null;
  adjustedQShort = null;
  blacklist = new Set();
  longAmount = 0;
  shortAmount = 0;
  timeToClose = null;
  isMarketOpen = false;
  timestamp = new Date();
  timeOfLastTrade = null;
  nextOpen = null;
  nextClose = null;

  constructor(keyId, secretKey, paper = true, stocks = []) {
    if (!keyId || !secretKey) {
      throw new Error('keyId and secretKey are required');
    }
    this.Alpaca = Alpaca;
    this.keyId = keyId;
    this.secretKey = secretKey;
    this.paper = paper;
    this.stocks = stocks;

    // set environment vars
    process.env.keyId = keyId;
    process.env.secretKey = secretKey;
    process.env.paper = paper;

    this.authenticate();
  // await this.getOrders();
  }

  get stocks() {
    return this._stocks;
  }

  set stocks(stocks = []) {
    this._stock = stocks.map((stockName) => ({
      name: stockName,
      pc: 0,
    }));
  }

  async init() {
    await this.getClock();
    await this.getOrders();
  }

  authenticate() {
    this.alpaca = new this.Alpaca({
      keyId: this.keyId,
      secretKey: this.secretKey,
      paper: this.paper,
    });
  }

  async getOrders() {
    const orders = await this.alpaca.getOrders({
      status: 'open',
      direction: 'desc',
    });
    this.orders = orders.map((order) => {
      const orderObject = new Order(order);
      orderObject.alpaca = this.alpaca;
      return orderObject;
    });
    return this.orders;
  }

  async cancelAllOrders() {
    const response = await this.alpaca.cancelAllOrders();
    this.orders = [];
    return parseResponse(response);
  }

  async closeAllPositions() {
    const response = await this.alpaca.closeAllPositions();
    this.positions = [];
    return parseResponse(response);
  }

  async getClock() {
    const response = await this.alpaca.getClock();
    const {
      isOpen: isMarketOpen,
      nextOpen,
      nextClose,
      timestamp,
    } = parseResponse(response);
    this.isMarketOpen = isMarketOpen;
    this.nextOpen = nextOpen;
    this.nextClose = nextClose;
    this.nextClose = timestamp;
    this.timeToClose = formatDistance(
      timestamp,
      nextOpen,
      { addSuffix: true },
    );
    this.timeOfLastTrade = subMinutes(this.nextClose, 15);
    return {
      isMarketOpen,
      nextOpen,
      nextClose,
      timestamp,
    };
  }

  async run() {
    await this.getClock();
    // cancel all open orders before execution
    await this.cancelAllOrders();
    if (!this.isMarketOpen) {
      logger.warn(`The market is closed. It will open in ${this.timeToClose}`);
      return;
    }
    if (isAfter(this.timeOfLastTrade, new Date())) {
      logger.warn('Trading window closing soon. Liquidating all positions');
      await this.closeAllPositions();
    }
    // await this.getOrders();
  }
}

module.exports = Stonks;
