import { WEEK_DAYS } from "./config";
import { 
  getDateInfo, 
  getFormatDate, 
  getLastMonthRestDays, 
  getMonthDayCount, 
  getNxetMonthRestDays 
} from "./utils";

// 创建头部Node
export function createWeekDaysNode () {
  const oTr = document.createElement('tr');
  oTr.className = 'week-day';

  oTr.innerHTML = WEEK_DAYS.map(item => {
    return `<th>${ item }</th>`
  }).join('');

  return oTr;
}

// 创建 dateNode
export function createDateNode (year, month) {
  const lastMonthRestDays = getLastMonthRestDays(year, month);
  const currentMonthDayCount = getMonthDayCount(year, month);
  const nextMonthRestDays = getNxetMonthRestDays(year, month);
  const dateTrArr = createDateTrs(6);

  const lastMonthRestDaysTD = createRestDaysTD(lastMonthRestDays);
  const nextMonthRestDaysTD = createRestDaysTD(nextMonthRestDays);
  const currentMonthDaysTD = createCurrentDaysTD(currentMonthDayCount, year, month);

  const tdArr = [
    ...lastMonthRestDaysTD,
    ...currentMonthDaysTD,
    ...nextMonthRestDaysTD
  ]

  let index = 0;
  dateTrArr.forEach(tr => {
    for (var i = 0; i < 7; i ++) {
      tr.appendChild(tdArr[index]);
      index++;
    }

  })

  return dateTrArr;

} 

// 创建 date Trs
export function createDateTrs (count) {
  const trArr = [];

  for (var i = 0; i < count; i ++) {
    const oTr = document.createElement('tr');
    trArr.push(oTr);
  }

  return trArr;
}

// 创建剩余天数TD
function createRestDaysTD (restDays) {
  return restDays.map(item => {
    const oTd = document.createElement('td');
    oTd.className = 'day rest-day'
    oTd.innerText = item;

    return oTd;
  })
}

// 创建本月TD
function createCurrentDaysTD (currentMonthDayCount, year, month) {
  let tdArr = [];

  const [
    currentYear, 
    currentMonth,
    curentDate 
  ] = getDateInfo()

  for (let i = 1; i <= currentMonthDayCount; i++) {
    const oTd = document.createElement('td');
    //选出当年、当月、当天 -> 额外添加 current
    if(currentYear === year && currentMonth === month && curentDate === i) {
      oTd.className = 'day current-day current';
    } else {
      oTd.className = 'day current-day';
    }

    oTd.innerText = i;
    oTd.setAttribute('data-date', getFormatDate(year, month, i));
    tdArr.push(oTd);
  }

  return tdArr;
}