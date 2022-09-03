import MyCalendar from './componnets/Calendar';

;(function () {
  MyCalendar('#app', [ 2022, 9 ], function (date) {
    console.log(date);
  })
  
})();