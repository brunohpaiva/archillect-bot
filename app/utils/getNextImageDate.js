const addMinutes = require('date-fns/addMinutes');
const startOfMinute = require('date-fns/startOfMinute');
const getMinutes = require('date-fns/getMinutes');

module.exports = () => {
  const date = startOfMinute(new Date());
  return addMinutes(date, 11 - (getMinutes(date) % 10));
};
