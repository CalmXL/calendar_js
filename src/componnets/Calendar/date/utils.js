// 获取 指定年份 指定月份 的第一天 是周几？ -> 即 上月剩余天数
function getFirstWeekDay (year, month) {
  const date = new Date(year, month - 1, 1);
  return date.getDay();
}

// 获取 指定年月的天数
function getMonthDayCount (year, month) {
  const date = new Date(year, month, 0);
  return date.getDate();
}

// ? rest： 剩余
// 上月剩余天数 数组
function getLastMonthRestDays (year, month) {
  const days = getFirstWeekDay(year, month);
  let lastDate = getMonthDayCount(year, month - 1);
  const restDays = [];

  while (restDays.length < days) {
    restDays.push(lastDate --);
  }

  return restDays.reverse();
}

// 下月剩余天数 数组
function getNxetMonthRestDays (year, month) {
  const lastMonthRestDays = getFirstWeekDay(year, month);
  const currentMonthDays = getMonthDayCount(year, month);
  const nextMonthRestDays = 42 - lastMonthRestDays - currentMonthDays;
  const restDays = [];

  for (let i = 1; i < nextMonthRestDays + 1; i ++) {
    restDays.push(i);
  }

  return restDays;
}

// 格式化 date
function getFormatDate (year, month, date) {
  const dateArr = [year, month, date];

  for (let i = 1; i < dateArr.length; i ++) {
    dateArr[i] < 10 && (dateArr[i] = '0' + dateArr[i]);
  }

  return dateArr.join('-');
}

export {
  getNxetMonthRestDays,
  getLastMonthRestDays,
  getFormatDate,
  getFirstWeekDay,
  getMonthDayCount
}
