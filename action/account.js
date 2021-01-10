const request = require("request");
const uuidv4 = require("uuid/v4");
const sign = require("jsonwebtoken").sign;
const { access_key, secret_key, server_url } = require("./../config");

/**
 * 내 계좌 정보를 반환
 * @param {*} cb : 콜백함수 
 */
const account = (cb) => {
  const payload = {
    access_key: access_key,
    nonce: uuidv4(),
  };

  const token = sign(payload, secret_key);

  const options = {
    method: "GET",
    url: server_url + "/v1/accounts",
    headers: { Authorization: `Bearer ${token}` },
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    cb(body);
  });
};

module.exports = account;