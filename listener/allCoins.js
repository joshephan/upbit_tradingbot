const moment = require("moment");
const CandleList = require("../class/CandleList");
const Candle = require("../class/Candle");
const MarketList = require("../market/KRW.json");
const chalk = require("chalk");
const Account = require("../class/Account");
const comma = require("../util/comma");

/**
 * 현재 시간을 기준으로 모든 코인의 가치 변동을 감시하는 리스너입니다.
 * 모든 코인을 1,000만원을 가상으로 구매한 후 일정 시간(약 22초)마다
 * 평균 가치 변화를 터미널에 출력합니다.
 * 
 * 출력되는 값의 의미는 README.md를 참조해주세요.
 */


let myAccount = {};
let initMoney = 10000000;
MarketList.forEach(v => {
  myAccount[v.market] = new Account(initMoney);
});
const MARKET_LENGTH = Object.keys(myAccount).length;

let initBuy = false;
const watch = async (market) => {
  const marketData = new CandleList({
    market: market.market,
    count: 1,
    minutes: 1,
  });
  const candleList = await marketData.fetchCandles();
  const item = new Candle(candleList[0]);
  if (!initBuy) {
    myAccount[market.market].buy(myAccount[market.market].money, item.trade_price);
  }
  const result = myAccount[market.market].result(item.trade_price, item.opening_price);
  tdo += item.calc_trade_diff_opening;
  hdo += item.calc_high_diff_opening;
  ldo += item.calc_low_diff_opening;
  val += result.value;
}

let index = 0;
let tdo = 0;
let hdo = 0;
let ldo = 0;
let val = 0;


console.log(`========= 리스너 시작(1분 감시): ${moment().format('MM월 DD일 HH시 mm분 ss초')} ==========`)
setInterval(() => {
  if (index === MARKET_LENGTH) {
    index = 0;
    initBuy = true;
    const avgVal = val / MARKET_LENGTH;
    console.log(`현재 시간: ${moment().format('MM월 DD일 HH시 mm분 ss초')}`)
    console.log(
      chalk.green(`가격 변동:\t`),
      tdo > 0 ?
      chalk.redBright(`${tdo >= 0 ? '+' : ''}${(tdo / MarketList.length).toFixed(4)}%\t\t`):
      chalk.blueBright(`${tdo >= 0 ? '+' : ''}${(tdo / MarketList.length).toFixed(4)}%\t\t`),
    );
    console.log(
      chalk.green(`상한 강도:\t`),
      chalk.redBright(`+${(hdo / MarketList.length).toFixed(4)}%\t\t`),
    );
    console.log(
      chalk.green(`하한 강도:\t`),
      chalk.blueBright(`${(ldo / MarketList.length).toFixed(4)}%\t\t`),
    );
    console.log(
      chalk.green(`가치 총액:\t`),
      chalk.yellow(`${comma(avgVal)}원\t\t`),
    );
    console.log(
      chalk.green(`전체 수익:\t`),
      avgVal > initMoney ?
        chalk.red(`+${comma(avgVal - initMoney)}원\t\t`) :
        chalk.blue(`${comma(avgVal - initMoney)}원\t\t`),
    );
    tdo = 0;
    hdo = 0;
    ldo = 0;
    val = 0;
  }
  watch(MarketList[index]);
  index += 1;
}, 220);
