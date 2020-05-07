# Architecture

- Stonks (interface for interacting with trading platform)
  - many Orders
  - many Positions
  - Account
- Strategy extends BaseStrategy
  - properties:
  - `symbols`
  - methods:
  - `buy`
  - `sell`
  - `addBar`
  - `addHistory`

## User Flow

- Create new Alpaca Object
- cancel all existing orders
- is market open?
  - if not, return
- if 15 minutes to close
  - close all positions
- run strategy

## long short strategy

- get list of trending stocks
- rank
  - get percentage change of each stock for the past 10 minutes
  - sort list by pc (percentage change)
  - set short and long
    - top earners we long
    - top losers we short
    - determine amount for each asset and quantity (qShort,qLong) to long/short based on stock price
      (using 130-30 method)
- rebalance
  - clear existing orders
  - clear blacklist
  - get all current positions, for each position...
    - if it's not in the long or short list, close the position
      - if position side is long, sell
      - if position side is short, buy
    - if position is in short list
      - if position.side is long (changed from long to short), sell
      - else if position.qty == qShort
        - do nothing
        - else adjust position (line
          [246](https://github.com/nielse63/stonksjs/blob/develop/long-short-script/scripts/long-short.js#L244))
    - else if it's in the long list and position.side is short
      - clear short position and buy
    - else
      - adjust position amount (line
        [272](https://github.com/nielse63/stonksjs/blob/develop/long-short-script/scripts/long-short.js#L272))
  - execute on all other positions (line
    [294](https://github.com/nielse63/stonksjs/blob/develop/long-short-script/scripts/long-short.js#L294))
