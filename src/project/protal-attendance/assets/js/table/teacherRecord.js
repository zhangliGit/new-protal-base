const teacherRecord = [
  {
    title: '序号',
    width: '6%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '6%'
  },
  {
    title: '部门',
    dataIndex: 'orgName',
    width: '10%'
  },
  {
    title: '日期',
    dataIndex: 'dateTime',
    width: '8%',
    customRender: text => {
      if (text) {
        const d = new Date(text)
        return (
          d.getFullYear() +
          '-' +
          (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
          '-' +
          (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
        )
      }
    }
  },
  {
    title: '上班时间',
    dataIndex: 'onTime',
    width: '10%',
    customRender: text => {
      if (text) {
        const d = new Date(text)
        return (
          (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
          ':' +
          (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) +
          ':' +
          (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
        )
      }
    }
  },
  {
    title: '上班状态',
    dataIndex: 'onState',
    width: '8%',
    scopedSlots: {
      customRender: 'other1'
    }
  },
  {
    title: '上班温度',
    dataIndex: 'onTemperature',
    width: '8%'
  },
  {
    title: '下班时间',
    dataIndex: 'offTime',
    width: '10%',
    customRender: text => {
      if (text) {
        const d = new Date(text)
        return (
          (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
          ':' +
          (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) +
          ':' +
          (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
        )
      }
    }
  },
  {
    title: '下班状态',
    dataIndex: 'offState',
    width: '8%',
    scopedSlots: {
      customRender: 'other2'
    }
  },
  {
    title: '下班温度',
    dataIndex: 'offTemperature',
    width: '8%'
  },
  {
    title: '操作',
    width: '16%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default teacherRecord
