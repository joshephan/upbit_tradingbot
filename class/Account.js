const percent = require("../util/percent");

/**
 * 가상 거래에 사용되는 계좌 클래스
 * 계좌 클래스는 하나의 코인에만 대응해 거래합니다.
 */
class Account {
  initMoney = 0; // 초기 시작 금액
  money; // 현재 계좌에 남은 돈
  volume = 0; // 구매한 코인의 개수
  tax = 0; // 발생한 세금의 총액
  constructor(money) {
    this.initMoney = money;
    this.money = money;
  }
  sell(volume, price) {
    // 최소 매도 가격은 1000원 이상이어야 합니다.
    let sellVolume =
      volume * price >= 1000
        ? volume
        : this.volume;

    const tax = sellVolume * price * 0.0005;
    this.tax += tax;
    this.volume = this.volume - sellVolume;
    this.money = this.money + sellVolume * price - tax;
  }
  buy(money, price) {
    // 몇몇의 코인은 5000원 이상부터 매수가 되어 전체 처리했습니다.
    // 코인별로 최소 매수 금액을 따로 정하시길 원하시면 이 부분을 수정하세요.
    if (this.money >= 5000) {
      const tax = money * 0.0005;
      this.tax += tax;
      this.volume = this.volume + (money - tax) / price;
      this.money -= money;
    }
  }
  result(lastPrice, firstPrice) {
    let value = this.money + this.volume * lastPrice;
    const interest = Number(percent(value, this.initMoney));
    const real = Number(percent(lastPrice, firstPrice));
    return {
      value,
      money: this.money,
      volume: this.volume,
      volValue: this.volume * lastPrice,
      avgPrice: (lastPrice / this.volume).toFixed(2),
      tax: this.tax,
      interest,
      real,
      gap: interest - real,
    };
  }
}

module.exports = Account;