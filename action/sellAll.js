const market = require("./../market/KRW.json");
const budget = require("./account");
const moment = require("moment");
const comma = require("../util/comma");
const Account = require('./../class/real/Account');

budget(async (body) => {
  const data = JSON.parse(body);
  const KRW = data.findIndex((v) => v.currency === "KRW");
  const initMoney = data[KRW].balance;
  const portfolio = market.map((v) => v.market);
  console.log("==== TRANSACTION ====");
  console.log("INIT: ", comma(initMoney));
  console.log("TIME: ", moment().format("YYYY-MM-DD hh:mm:ss"));
  const account = new Account(portfolio);
  account.sell();
});
