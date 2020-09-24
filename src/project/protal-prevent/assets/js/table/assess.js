const assess = {
  columns: [
    {
      title: '序号',
      scopedSlots: {
        customRender: 'index'
      },
      width: '8%'
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      width: '15%'
    },
    {
      title: '检查对象',
      dataIndex: 'checkObject',
      width: '15%'
    },
    {
      title: '潜在风险',
      width: '15%',
      scopedSlots: {
        customRender: 'other1'
      }
    },
    {
      title: '事故类型',
      dataIndex: 'accidentType',
      width: '15%'
    },
    {
      title: '建议风险等级',
      width: '15%',
      scopedSlots: {
        customRender: 'other2'
      }
      // customRender: text => {
      //   if (text === '1') {
      //     return '重大风险'
      //   } else if (text === '2') {
      //     return '较大风险'
      //   } else if (text === '3') {
      //     return '一般风险'
      //   } else if (text === '4') {
      //     return '低风险'
      //   } else {
      //     return ''
      //   }
      // }
    },
    {
      title: '审核状态',
      dataIndex: 'auditStatus',
      width: '15%',
      customRender: text => {
        if (text === '1') {
          return '未审核'
        } else if (text === '2') {
          return '已审核，已重新评定'
        } else if (text === '3') {
          return '已审核，已通过'
        } else {
          return ''
        }
      }
    },
    {
      title: '操作',
      width: '15%',
      scopedSlots: {
        customRender: 'action'
      }
    }
  ],
  searchLabel: [
    {
      value: 'riskContent',
      type: 'input',
      label: '潜在风险',
      placeholder: '请输入'
    }
  ]
}
export default assess
