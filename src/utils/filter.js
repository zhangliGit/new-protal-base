/**
 * @des 注册全局过滤器
 */

import Vue from 'vue'

const filters = {
  // 获取表格索引
  pageIndex: (val, obj) => {
    if (JSON.stringify(obj) === '{}') {
      return val + 1
    } else {
      return (obj.page - 1) * obj.size + val + 1
    }
  },
  // 日期转化
  gmtToDate (date, type = 'dateTime') {
    if (!date) {
      return '--'
    }
    const d = new Date(date)
    const time =
      d.getFullYear() +
      '-' +
      (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
      '-' +
      (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
      ' ' +
      (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
      ':' +
      (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) +
      ':' +
      (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
    if (type === 'dateTime') {
      return time
    } else if (type === 'date') {
      return time.substring(0, 10)
    } else if (type === 'time') {
      return time.substring(11, 15)
    }
  },
  getDate: function (val, type) {
    if (val === '' || val === null) {
      return '--'
    }
    // 时间戳和gmt转日期
    const d = new Date(val)
    if (type === 1) {
      return (
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
        '-' +
        (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
        ' ' +
        (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
        ':' +
        (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) +
        ':' +
        (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
      )
    } else if (type === 2) {
      return (
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
        '-' +
        (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
      )
    } else if (type === 3) {
      return (
        (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
        ':' +
        (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes())
      )
    } else if (type === 4) {
      return (
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
        '-' +
        (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
      )
    } else if (type === 5) {
      return (
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
        '-' +
        (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
        ' ' +
        (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
        ':' +
        (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes())
      )
    }
  },
  getSiteCategory: val => {
    // 场地分类(100教室,101宿舍,102食堂,103出入口,104其他)
    if (val === 100) {
      return '教室'
    } else if (val === 101) {
      return '宿舍'
    } else if (val === 102) {
      return '食堂'
    } else if (val === 103) {
      return '出入口'
    } else if (val === 104 || '') {
      return '其他'
    }
  }
}

for (const key in filters) {
  Vue.filter(key, filters[key])
}
