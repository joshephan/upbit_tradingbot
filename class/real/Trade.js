const request = require("../../util/request");
const chance = require("../../util/chance.js");

/**
 * 시장가로 매수합니다.
 */
class Trade {
  budget; // 거래할 금액
  market; // 마켓명
  type; // 거래 종류(bid: 매수, ask: 매도)
  body = {}; // HTTP 바디 페이로드
  constructor({ budget = null, market, type, cb }) {
    if (type !== "bid" && type !== "ask") {
      new Error("허락되지 않은 주문 종류");
    }
    this.budget = budget;
    this.market = market;
    this.type = type;
    this.cb = cb;
  }
  init() {
    this.body.market = `${this.market}`;
    this.body.side = this.type;
    this.type === "bid" ?
      this.bid() :
      this.ask();
  }
  bid() {
    this.body.ord_type = "price";
    this.body.price = `${this.budget}`;
    request(this.body, this.cb);
  }
  ask() {
    this.body.ord_type = "market";
    chance(this.market, (v) => {
      if (v.ask_account.balance == "0.0") {
        return;
      }
      this.body.volume = `${Number(v.ask_account.balance)}`;
      request(this.body, this.cb);
    });
  }
}


module.exports = Trade;