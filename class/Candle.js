class Candle {
  // API를 통해 기본적으로 제공받는 데이터
  market;
  candle_date_time_utc;
  candle_date_time_kst;
  opening_price;
  high_price;
  low_price;
  trade_price;
  timestamp;
  candle_acc_trade_price;
  candle_acc_trade_volume;
  unit;

  // 계산된 데이터
  calc_direction; // 캔들의 방향
  calc_high_diff_trade; // 고점 대비 현재 가격
  calc_high_diff_opening; // 고점 대비 오프닝 가격
  calc_trade_diff_opening; // 현재 가격 대비 오프닝 가격
  calc_trade_diff_low;  // 시가 대비 저점 가격
  calc_low_diff_opening; // 오프닝 가격 대비 저점 가격
  constructor(candle) {
    this.market = candle.market;
    this.candle_date_time_utc = candle.candle_date_time_utc;
    this.candle_date_time_kst = candle.candle_date_time_kst;
    this.opening_price = candle.opening_price;
    this.high_price = candle.high_price;
    this.low_price = candle.low_price;
    this.trade_price = candle.trade_price;
    this.timestamp = candle.timestamp;
    this.candle_acc_trade_price = candle.candle_acc_trade_price;
    this.candle_acc_trade_volume = candle.candle_acc_trade_volume;
    this.unit = candle.unit;
    this.calc();
  }
  calc() {
    this.calc_direction =
      this.trade_price === this.opening_price
        ? '유지'
        : this.trade_price > this.opening_price
          ? '상승'
          : '하락';
    this.calc_high_diff_trade = this.getPercent(
      this.high_price,
      this.trade_price
    );
    this.calc_high_diff_opening = this.getPercent(
      this.high_price,
      this.opening_price
    );
    this.calc_trade_diff_opening = this.getPercent(
      this.trade_price,
      this.opening_price
    );
    this.calc_trade_diff_low = this.getPercent(
      this.trade_price,
      this.low_price
    );
    this.calc_low_diff_opening = this.getPercent(
      this.low_price,
      this.opening_price
    );
  }
  getPercent(to, from) {
    return Number((((to - from) / from) * 100).toFixed(2));
  }
}

module.exports = Candle;