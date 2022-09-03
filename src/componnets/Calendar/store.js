// 用于处理 渲染|更新 哪一个界面
/**
 * 从不同的模块中， 导入该模块 render， update 并另外命名区分
 * 向外暴露出一个可以 更改 处理页面的标志 ALLOW_FLAGS 的函数 setFlag
 */
import { 
  update as dateUpdate,
  render as dateRender
} from "./date/render";

import {
  update as yearUpdate,
  render as yearRender
} from './year/render'; 

import {
  update as monthUpdate,
  render as monthRender
} from './month/render';

export const ALLOW_FLAGS = {
  'YEAR': 'YEAR',
  'MONTH': 'MONTH',
  'DATE': 'DATE'
}

let currentFlag = ALLOW_FLAGS.DATE;

export function getFlag () {
  return currentFlag;
}

/**
 * 依据 currentFlag 选择对哪个页面渲染
 */
export function setFlag (value, container, { year, month }) {
  if (ALLOW_FLAGS[value]) {
    currentFlag = ALLOW_FLAGS[value];

    switch (currentFlag) {
      case ALLOW_FLAGS.YEAR: 
        yearRender(container, year);
        break;
      case ALLOW_FLAGS.MONTH:
        monthRender(container, year);
        break;
      case ALLOW_FLAGS.DATE:
        dateRender(container, year, month);
        break;
      default:
        break;
    }
  }
}

export default function reactive ({year, month}) {
  const dateInfo = {};
  const _dateInfo = [year, month];

  Object.defineProperties(dateInfo, {
    year: {
      get () {
        return _dateInfo[0];
      },
      set (newValue) {
        _dateInfo[0] = newValue;
        update(..._dateInfo); 
      }
    },
    month: {
      get () {
        return _dateInfo[1];
      },
      set (newValue) {
        if (newValue > 12) {
          newValue = 1;
          _dateInfo[0] += 1;
        } 

        if ( newValue <= 0) {
          newValue = 12;
          _dateInfo[0] -= 1;
        }

        _dateInfo[1] = newValue;
        update(..._dateInfo);
      }
    }
  });

  return dateInfo;
}

function update (year, month) {
  switch (currentFlag) {
    case ALLOW_FLAGS.YEAR:
      yearUpdate(year);
      break;
    case ALLOW_FLAGS.MONTH:
      monthUpdate(year);
      break;
    case ALLOW_FLAGS.DATE:
      dateUpdate(year, month);
      break;
  }
}