const fetch = require("node-fetch");
const queryString = require("query-string");
const { server_url } = require("./../config");
class CandleList {
  url;
  query;
  market;
  constructor({ market, count, to, minutes, day = false }) {
    day ?
      this.url = `${server_url}/v1/candles/days` :
      this.url = `${server_url}/v1/candles/minutes/${minutes}`;
    this.market = market;
    this.query = { market, count, to };
  }
  fetchCandles() {
    return fetch(`${this.url}?${queryString.stringify(this.query)}`)
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
  }
}

module.exports = CandleList;