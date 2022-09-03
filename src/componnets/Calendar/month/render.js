import {
  createMonthControlArea,
  createMonthNode
} from './creator';

import './index.scss'

export function render (contianer, year) {
  contianer.innerHTML = '';

  const oTable = document.createElement('div');
  oTable.className = 'my-month-canlendar-table';


  const monthControlArea = createMonthControlArea(year);
  const monthTrArr = createMonthNode();

  monthTrArr.forEach(tr => {
    oTable.appendChild(tr);
  });

  contianer.appendChild(monthControlArea);
  contianer.appendChild(oTable);

  console.log(contianer);

}

export function update (year) {
  const titleYear = document.querySelector('.title-year');

  titleYear.innerText = year;
}