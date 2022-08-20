const formatDate = (date) => {
  const d = date.getDate();
  const m = date.getMonth()+1;
  const y = date.getFullYear();
  const h = date.getHours();
  const min = date.getMinutes()
  return `${m}/${d}/${y} ${h}:${min}`
}


module.exports = formatDate;