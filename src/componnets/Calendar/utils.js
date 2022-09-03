// 创建 Trs
export function createTrs (count) {
  const trArr = [];

  for (var i = 0; i < count; i ++) {
    const oTr = document.createElement('tr');
    trArr.push(oTr);
  }

  return trArr;
}

// 根据 时间戳 获取日期信息
export function getDateInfo (timeStamp) {
  var date = timeStamp ? new Date(timeStamp) : new Date();

  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ]
}