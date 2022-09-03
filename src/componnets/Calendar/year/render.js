import { getStartAndEndYear } from './utils';
import { 
  createYearControlArea, 
  createYearNode 
} from './creator';

import './index.scss';

export function render (container, year) {
  container.innerHTML = '';

  const oTable = document.createElement('table');
  oTable.className = 'my-year-calandar-table';

  const controlArea = createYearControlArea(year);
  const yearNode = createYearNode(year);

  yearNode.forEach(tr => {
    oTable.appendChild(tr);
  });

  container.appendChild(controlArea);
  container.appendChild(oTable);
}

export function update (year) {
  const oTable = document.querySelector('.my-year-calandar-table');
  const oStartYear = document.querySelector('.start-year');
  const oEndYear = document.querySelector('.end-year');

  oTable.innerHTML = '';

  const startAndEndYearArr = getStartAndEndYear(year);
  oStartYear.innerText = startAndEndYearArr[0];
  oEndYear.innerText = startAndEndYearArr[1];

  const yearNode = createYearNode(year);
  yearNode.forEach(tr => {
    oTable.appendChild(tr);
  });

}

