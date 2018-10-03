const formatTime = (date, type) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  
  if (type === 'YYYY-MM-DD') {
    return [year, month, day].map(formatNumber).join('-')
  } else if (type === 'YYYY-MM-DD hh:mm') {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
  } else if (type === 'hh:mm') {
    return [hour, minute].map(formatNumber).join(':')
  } else if (type === 'hh:mm:ss') {
    return [hour, minute, second].map(formatNumber).join(':')
  } else {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
}

// 中文格式时间
const formatTimeCH = (time) => {
  if (time) {
    const dateArr = time.split('-');
    const timeArr = dateArr[2].split(' ');
    const newTime = dateArr[0] + '年' + dateArr[1] + '月' + timeArr[0] + '日 ' + timeArr[1];

    return newTime;
  } else {
    return '';
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const timeAgo = (time) => {
  var pubsh = new Date(time);
  var pubshtime = parseInt(Date.parse(new Date(time)) / 1000);
  var now = parseInt(Date.parse(new Date()) / 1000);
  var nowtime = new Date();
  var nowY = nowtime.getFullYear();
  var nowM = parseInt(nowtime.getMonth()) + 1;
  var nowD = nowtime.getDate();
  var todaytime = parseInt(Date.parse(new Date(nowY + "-" + nowM + "-" + nowD + " 00:00:00")) / 1000); //今天0点0分时间戳
  var nowh = nowtime.getHours();
  var nowm = nowtime.getMinutes();
  var yesterdaytime = todaytime - 24 * 60 * 60; //昨天0点0分时间戳
  var idate = '';

  if (pubshtime < yesterdaytime) {
    idate = time;
  } else if (pubshtime > yesterdaytime && pubshtime < todaytime) {
    idate = '昨天 ' + ('0' + pubsh.getHours()).slice(-2) + ':' + ('0' + pubsh.getMinutes()).slice(-2);
  } else {
    var cha = now - pubshtime;
    if (cha <= 60) {
      idate = cha + '秒之前';
    } else if (cha > 60 && cha <= 3600) {
      idate = parseInt(cha / 60) + '分钟之前';
    } else if (cha > 3600) {
      idate = parseInt(cha / 3600) + '小时之前';
    }
  }
  return idate;
}

const toDecimal2 = (x) => {
  var f = parseFloat(x)
  if (isNaN(f)) {
    return false
  }
  var fn = Math.round(x * 100) / 10000
  var s = fn.toString()
  var rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + 2) {
    s += '0'
  }
  return s
}


const regular= {
  email : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, //邮箱
  name : /^[a-z0-9_-]{3,16}$/, //用户名
  // mobile : /^0?1[3|4|5|7|8][0-9]\d{8}$/,  //手机
  mobile : /^\d{11}$/,  //手机
  tel : /^0[\d]{2,3}-[\d]{7,8}$/
}

module.exports = {
  formatTime: formatTime,
  formatTimeCH: formatTimeCH,
  timeAgo: timeAgo,
  toDecimal2: toDecimal2,
  regular: regular,
}
