const Trade = require("./Trade");
class Account {
  portfolio = [];
  constructor(portfolio) {
    this.portfolio = portfolio;
  }
  sell() {
    this.portfolio.forEach((market, i) => {
      setTimeout(() => {
        const askTrade = new Trade({
          market,
          type: "ask",
          cb: (v) => {
            v
              ? console.log(`SELL(${market}): ${v.remaining_volume}`)
              : console.log(`SELL(${market}): None`);
          },
        });
        askTrade.init();
      }, i * 200);
    });
  }
  buy(budget) {
    this.portfolio.forEach((market, i) => {
      setTimeout(() => {
        let money = budget / this.portfolio.length;
        const bidTrade = new Trade({
          budget: money,
          market,
          type: "bid",
          cb: (v) => {
            console.log(
              `BUY(${market}): ${comma(
                parseInt(money)
              )}원`
            );
          },
        });
        bidTrade.init();
      }, i * 200);
    });
  }
}

module.exports = Account;