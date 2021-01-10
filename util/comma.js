function AmountCommas(val) {
  return parseInt(val)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = AmountCommas;