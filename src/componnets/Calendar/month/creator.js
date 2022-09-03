
import monthData from './config';
import { createTrs } from '../utils';

const domPool = {
  controlArea: null
}

export function createMonthControlArea (year) {
  if (!domPool.controlArea) {
    domPool.controlArea = document.createElement('div');
    domPool.controlArea.className = 'month-control-area';

    domPool.controlArea.innerHTML = `
    <span class="control-month-btn btn-year-lt">&lt;&lt;</span>
    <span class="control-show">
      <span class="control-title">
        <span class='title-year'>${ year }</span>年
      </span>
    </span>
    <span class="control-month-btn btn-year-gt">&gt;&gt;</span>
    `
  } else {
    domPool.controlArea.querySelector('.title-year').innerText = year;
  }

  return domPool.controlArea;
}

export function createMonthTD () {
  
  const monthTdArr = [];

  monthData.forEach((month, index) => {
    const oTd = document.createElement('td');
    oTd.className = 'month';
    oTd.setAttribute('data-month', index + 1);
    oTd.innerText = month;

    monthTdArr.push(oTd);
  });

  return monthTdArr;
}

export function createMonthNode () {
  const monthTdArr = createMonthTD();
  const monthTrArr = createTrs(3);
  
  let index = 0;
  monthTrArr.forEach(tr => {
    for (let i = 0; i < 4 && monthTdArr[index]; i ++) {
      tr.appendChild(monthTdArr[index ++]);
    }
  });

  return monthTrArr;
}