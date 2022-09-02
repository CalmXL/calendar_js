import {
  createWeekDaysNode,
  createDateNode
} from './creator';

export function render (container) {

  const oTHead = document.createElement('thead');
  const oTBody = document.createElement('tbody');
  const weekDayNode = createWeekDaysNode();
  
  oTBody.className = 'my-calendar-body';

  return function (year, month) {
    const dateTrs = createDateNode(year, month);
    oTHead.appendChild(weekDayNode);

    dateTrs.forEach(tr => {
      oTBody.appendChild(tr);
    })

    container.appendChild(oTHead);
    container.appendChild(oTBody);

    return container;
  }
}

export function update (year, month) {
  const oTBody = document.querySelector('.my-calendar-body');

  const dateTrs = createDateNode(year, month);
  console.log(oTBody);
  oTBody.innerHTML = '';

  dateTrs.forEach(tr => {
    oTBody.appendChild(tr);
  });

}