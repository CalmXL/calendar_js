import { ALLOW_FLAGS, setFlag } from './store';

let target = null;

export default (...args) => {
  const [ container ] = args;
  container.addEventListener('click', handleClick.bind(null, ...args), false);
}

function handleClick (...args) {
  const [ container, handler, dateInfo, e ] = args;
  const tar = e.target;
  const className = tar.className;

  if (className.includes('current-day')) {
    dateClick(tar, handler);
    return;
  } else if (className.includes('control-btn')) {
    controlClick(className, dateInfo);
    return;
  }

  if (className === 'title-year') {
    titleYearClick(container, dateInfo);
    return;
  }

  if (className === 'title-month') {
    titleMonthClick(container, dateInfo);
    return;
  }

  if (className === 'control-year-btn btn-year-gt') {
    dateInfo.year += 10;
  }

  if (className === 'control-year-btn btn-year-lt') {
    dateInfo.year -= 10;
  }

  if (className === 'year decade-year') {
    dateInfo.year = tar.getAttribute('data-year');
    setFlag(ALLOW_FLAGS.DATE, container, dateInfo);
  }

  if (className.includes('control-month-btn')) {
    controlMonthClick(className, dateInfo);
  }

  if (className === 'month') {
    dateInfo.month = tar.getAttribute('data-month');
    setFlag(ALLOW_FLAGS.DATE, container, dateInfo);
  }

}

function controlMonthClick (className, dateInfo) {
  console.log(typeof dateInfo.year);
  switch (className) {
    case 'control-month-btn btn-year-lt':
      dateInfo.year -= 1;
      break;
    case 'control-month-btn btn-year-gt':
      dateInfo.year += 1;
      break;
    default:
      break;
  }
}

function titleMonthClick (container, dateInfo) {
  console.log('setFlag-month');
  setFlag(ALLOW_FLAGS.MONTH, container, dateInfo);
}


function titleYearClick (container, dateInfo) {
  setFlag(ALLOW_FLAGS.YEAR, container, dateInfo);
}

function dateClick (tar, handler) {
  if (target) {
    target.className = target.className.replace(' selected', '');
  }
  target = tar;
  tar.className += ' selected';
  handler && handler(target.getAttribute('data-date'));
}

function controlClick (className, dateInfo) {
  switch (className) {
    case 'control-btn btn-year-lt': 
      dateInfo.year -= 1;
      break;
    case 'control-btn btn-month-lt':
      dateInfo.month -= 1;
      break;
    case 'control-btn btn-year-gt': 
      dateInfo.year += 1;
      break;
    case 'control-btn btn-month-gt':
      dateInfo.month += 1;
      break;
    default:
      break;
  }
}