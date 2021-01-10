const rp = require("request-promise");
const uuidv4 = require("uuid/v4");
const crypto = require("crypto");
const sign = require("jsonwebtoken").sign;
const queryEncode = require("querystring").encode;
const { access_key, secret_key, server_url } = require("./../config");

/**
 * 현재 해당 마켓에 내가 매도할 수 있는 물량이 존재하는지 확인합니다.
 * @param {*} market : 마켓명
 * @param {*} cb : 콜백함수
 */
const chance = (market, cb) => {
  const body = {
    market: market,
  };
  const query = queryEncode(body);
  const hash = crypto.createHash("sha512");
  const queryHash = hash.update(query, "utf-8").digest("hex");

  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: "SHA512",
  };

  const token = sign(payload, secret_key);

  const options = {
    method: "GET",
    url: server_url + "/v1/orders/chance?" + query,
    headers: { Authorization: `Bearer ${token}` },
    json: body,
  };

  rp(options).then((v) => cb(v));
};
module.exports = chance;
