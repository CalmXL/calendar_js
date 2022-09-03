import { render } from './date/render';
import { getDateInfo } from './utils';
import './index.scss';
import event from './event';
import reactive from './store';      

export default (...args) => {
  const el = args[0];
  const [ year, month ] = Object.prototype.toString.call(args[1]) 
                        === '[object Array]' 
                        ? args[1] 
                        : getDateInfo();
  const handler = args[2] || args[1] || function () {}
  


  const oApp = document.querySelector(el);
  const oContainer = document.createElement('div');
  oContainer.className = 'my-calendar';  
  // 构建响应式的数据
  const dateInfo = reactive({year, month});
  // 事件的绑定 -> 事件代理
  event(oContainer, handler, dateInfo);
  // date 渲染
  render(oContainer, year, month);

  oApp.appendChild(oContainer);
}


