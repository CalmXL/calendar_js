import { WEEK_DAYS } from "./config";
import { createTrs } from "../utils";
import { 
  getFormatDate, 
  getLastMonthRestDays, 
  getMonthDayCount, 
  getNxetMonthRestDays 
} from "./utils";

import { getDateInfo } from '../utils';


// 创建一个 dom缓存池， 用于不重复构建dom
const domPool = {
  weekDays: null,
  controlArea: null
};
// 创建tHead头部Node
export function createWeekDaysNode () {
  if (!domPool.weekDays) {
    domPool.weekDays = document.createElement('tr');
    domPool.weekDays.className = 'week-day';

    domPool.weekDays.innerHTML = WEEK_DAYS.map(item => {
      return `<th>${ item }</th>`
    }).join('');
  }

  return domPool.weekDays;
}

// 创建 dateNode
export function createDateNode (year, month) {
  const lastMonthRestDays = getLastMonthRestDays(year, month);
  const currentMonthDayCount = getMonthDayCount(year, month);
  const nextMonthRestDays = getNxetMonthRestDays(year, month);
  const dateTrArr = createTrs(6);

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
    for (var i = 0; i < 7 && tdArr[index]; i ++) {
      tr.appendChild(tdArr[index ++]);
    }
  });

  return dateTrArr;
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
    oTd.className = 'day current-day';
    //选出当年、当月、当天 -> 额外添加 current
    if(currentYear === year && currentMonth === month && curentDate === i) {
      oTd.className += ' current';
    } 

    oTd.innerText = i;
    oTd.setAttribute('data-date', getFormatDate(year, month, i));
    tdArr.push(oTd);
  }

  return tdArr;
}


export function createControlArea (year, month) {
  if (!domPool.controlArea) {
    domPool.controlArea = document.createElement('div');
    domPool.controlArea.className = 'control-area';
  
    domPool.controlArea.innerHTML = `
      <span class="control-btn btn-year-lt">&lt;&lt;</span>
      <span class="control-btn btn-month-lt">&lt;</span>
      <span class="control-show">
        <span class="control-title year">
          <span class='title-year'>${ year }</span>年
        </span>
        <span class="control-title month">
          <span class='title-month'>${ month }</span>月
        </span>
      </span>
      <span class="control-btn btn-month-gt">&gt;</span>
      <span class="control-btn btn-year-gt">&gt;&gt;</span>
    `;
  } else {
    // 缓存池存在， 渲染 年、月
    domPool.controlArea.querySelector('.title-year').innerText = year;
    domPool.controlArea.querySelector('.title-month').innerText = month;
  }
 

  return domPool.controlArea;
}