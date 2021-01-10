const rp = require("request-promise");
const uuidv4 = require("uuid/v4");
const crypto = require("crypto");
const sign = require("jsonwebtoken").sign;
const queryEncode = require("querystring").encode;
const { access_key, secret_key, server_url } = require("./../config");

/**
 * 거래와 관련된 요청을 보냅니다.
 * @param {*} body : body 페이로드
 * @param {*} cb : 콜백함수
 */
const request = (body, cb) => {
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
    method: "POST",
    url: server_url + "/v1/orders",
    headers: { Authorization: `Bearer ${token}` },
    json: body,
  };
  rp(options).then((v) => cb(v));
};

module.exports = request;