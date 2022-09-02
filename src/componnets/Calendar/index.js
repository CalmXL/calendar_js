import { getDateInfo } from './utils';

import { render, update } from './render';

import event from './event';

export default () => {

  const oContainer = document.createElement('table');
  oContainer.className = 'my-calendar';  
  event(oContainer, handleClick);

  function handleClick (data) {
    console.log(data);
  }

  return {
    render: render(oContainer),
    update,
    getDateInfo
  }
}