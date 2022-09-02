import MyCalendar from './componnets/Calendar';
import './componnets/Calendar/index.scss';
import { update } from './componnets/Calendar/render';

;(function () {

  const myCalendar = MyCalendar();
  const oApp = document.querySelector('#app');
  const oYear = document.querySelector('.year');
  const oMonth = document.querySelector('.month');
  const oYearText = oYear.querySelector('span');
  const oMonthText = oMonth.querySelector('span');
  const dateInfo = myCalendar.getDateInfo();

  const init = () => {
    bindEvent();
    render(...dateInfo);
  }

  function bindEvent () {
    oYear.addEventListener('click', setYear, false);
    oMonth.addEventListener('click', setMonth, false);
  }

  function setYear (e) {
    const tar = e.target,
          className = tar.className;
    
    switch (className) {
      case 'gt': 
        oYearText.innerText = Number(oYearText.innerText) + 1;
        break;
      case 'lt': 
        oYearText.innerText = Number(oYearText.innerText) - 1;
        break;
      default:
        break;
    }

    update(Number(oYearText.innerText), Number(oMonthText.innerText));
  }

  function setMonth (e) {
    const tar = e.target,
          className = tar.className,
          currentMonth = Number(oMonthText.innerText);

    switch (className) {
      case 'gt': 
        if (currentMonth < 12) { 
          oMonthText.innerText = Number(oMonthText.innerText) + 1;
        } else {
          oMonthText.innerText = 1;
          oYearText.innerText = Number(oYearText.innerText) + 1;
        }
        break;
      case 'lt': 
        if (currentMonth > 1) {
          oMonthText.innerText = Number(oMonthText.innerText) - 1;  
        } else {
          oMonthText.innerText = 12;
          oYearText.innerText = Number(oYearText.innerText) - 1;
        }
        break;
      default:
        break;
    }

    update(Number(oYearText.innerText), Number(oMonthText.innerText));
  }

  function render (...args) {
    oApp.appendChild(myCalendar.render(...args));
  }

  init();
})();