const getPercent = (to, from) => {
  return (((to - from) / from) * 100).toFixed(2);
}

module.exports = getPercent