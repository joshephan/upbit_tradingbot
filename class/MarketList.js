const fetch = require("node-fetch");
const { server_url } = require("../config");
class MarketList {
  filter;
  constructor(filter) {
    this.filter = filter;
  }

  fetchMarkets() {
    return fetch(`${server_url}/v1/market/all?isDetails=false`)
      .then((res) => res.json())
      .then((json) => {
        let result = [];
        let filter = ['KRW','BTC','USDT'];
        if(filter.includes(this.filter)){
          json.forEach(e=>{
            if(e.market.includes(this.filter)){
              result.push(e);
            }
          });
          return result;
        }else{
          return json
        }
      });
  }
}
  
module.exports = MarketList;