const teacherRecord = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '10%',
    customRender: (text) => {
      if (text === '1') {
        return '男'
      } else if (text === '2') {
        return '女'
      } else {
        return '未知'
      }
    }
  },
  {
    title: '组织机构',
    dataIndex: 'orgName',
    width: '10%'
  },
  {
    title: '工号',
    dataIndex: 'workNo',
    width: '10%'
  },
  {
    title: '上班时间',
    dataIndex: 'onTime',
    width: '10%',
    customRender: (text) => {
      if (text) {
        const d = new Date(text)
        return d.getFullYear() + '-' +
               ((d.getMonth() + 1) > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' +
               (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
               ' ' +
               (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
               ':' +
               (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) +
               ':' +
               (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
      }
    }
  },
  {
    title: '上班状态',
    dataIndex: 'onState',
    width: '10%',
    customRender: (text) => {
      if (text === 1) {
        return '迟到'
      } else if (text === 2) {
        return '早退'
      } else if (text === 3 || text === 6) {
        return '缺卡'
      } else if (text === 4) {
        return '请假'
      } else if (text === 5) {
        return '正常'
      } else if (text === 7) {
        return '缺勤'
      }
    }
  },
  {
    title: '下班时间',
    dataIndex: 'offTime',
    width: '10%',
    customRender: (text) => {
      if (text) {
        const d = new Date(text)
        return d.getFullYear() + '-' +
               ((d.getMonth() + 1) > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' +
               (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
               ' ' +
               (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
               ':' +
               (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) +
               ':' +
               (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
      }
    }
  },
  {
    title: '下班状态',
    dataIndex: 'offState',
    width: '10%',
    customRender: (text) => {
      if (text === 1) {
        return '迟到'
      } else if (text === 2) {
        return '早退'
      } else if (text === 3 || text === 6) {
        return '缺卡'
      } else if (text === 4) {
        return '请假'
      } else if (text === 5) {
        return '正常'
      } else if (text === 7) {
        return '缺勤'
      }
    }
  },
  {
    title: '操作',
    width: '10%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default teacherRecord
