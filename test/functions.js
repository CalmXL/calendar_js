module.exports = {
  createDecadeYears (year) {
    const str = year.toString().slice(0, 3);
    const yearArr = [];

    for (var i = 0; i < 10; i ++) {
      yearArr.push(Number(str + i));
    }
    
    return yearArr;
  },

  getStartAndEndYear (year) {
    const str = year.toString().slice(0, 3);
    return [Number(str + '0'), Number(str + '9')];
  }
}