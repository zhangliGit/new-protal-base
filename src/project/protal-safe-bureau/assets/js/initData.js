import Tools from '@u/tools'
// 查询条件
export const searchLabel = [
  {
    value: 'source',
    label: '隐患来源',
    type: 'select',
    list: [
      {
        key: '',
        val: '隐患来源'
      },
      {
        key: '1',
        val: '隐患排查'
      },
      {
        key: '2',
        val: '日常巡查'
      },
      {
        key: '3',
        val: '专项检查'
      },
      {
        key: '4',
        val: '社会监督'
      }
    ]
  },
  {
    label: '隐患等级',
    type: 'select',
    value: 'level',
    list: [ // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: '1',
        val: '低风险'
      },
      {
        key: '2',
        val: '一般风险'
      },
      {
        key: '3',
        val: '较大风险'
      },
      {
        key: '4',
        val: '重大风险'
      }
    ]
  },
  {
    value: 'streetCode',
    type: 'select',
    label: '所属街道',
    list: [ // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: '1',
        val: '已上报'
      },
      {
        key: '2',
        val: '已指派 '
      },
      {
        key: '3',
        val: '已处理'
      },
      {
        key: '4',
        val: '已验收'
      },
      {
        key: '5',
        val: '已撤销'
      }
    ]
  },
  {
    value: 'state',
    type: 'select',
    label: '隐患状态',
    list: [ // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: '1',
        val: '已上报'
      },
      {
        key: '2',
        val: '已指派 '
      },
      {
        key: '3',
        val: '已处理'
      },
      {
        key: '4',
        val: '已验收'
      },
      {
        key: '5',
        val: '已撤销'
      }
    ]
  },
  {
    value: 'schoolName', // 表单属性
    type: 'input', // 表单类型
    label: '', // 表单label值
    placeholder: '请输入学校名称' // 表单默认值(非必选字段)
  }
]
// 隐患督办查询条件
export const searchLabelSupervise = [

  {
    value: 'state',
    type: 'select',
    label: '隐患状态',
    list: [ // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: '1',
        val: '已上报'
      },
      {
        key: '2',
        val: '已指派 '
      },
      {
        key: '3',
        val: '已处理'
      },
      {
        key: '4',
        val: '已验收'
      },
      {
        key: '5',
        val: '已撤销'
      }
    ]
  },
  {
    value: 'superviseState',
    type: 'select',
    label: '督办状态',
    list: [ // 选择列表项，select控件必传
      {
        key: '',
        val: '全部'
      },
      {
        key: '0',
        val: '正在督办'
      },
      {
        key: '1',
        val: '结束督办 '
      }
    ]
  },
  {
    value: 'userName', // 表单属性
    type: 'input', // 表单类型
    label: '', // 表单label值
    placeholder: '请输入督办人姓名' // 表单默认值(非必选字段)
  }
]
// table列
export const columns = [
  {
    title: '序号',
    width: '5%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  // {
  //   title: 'id',
  //   dataIndex: 'ID'
  //   // width: '15%'
  // },
  {
    title: '所属学校',
    dataIndex: 'schoolName'
    // width: '15%'
  },
  {
    title: '隐患照片',
    dataIndex: 'dangerPhotoUrl',
    // width: '10%',
    scopedSlots: {
      customRender: 'snapPic'
    }
  },
  {
    title: '整改照片',
    dataIndex: 'completePhotoUrl',
    // width: '10%',
    scopedSlots: {
      customRender: 'snapPic'
    }
  },
  {
    title: '隐患描述',
    dataIndex: 'description'
    // width: '10%'
  },
  {
    title: '隐患来源',
    dataIndex: 'source',
    customRender: (text) => {
      return Tools.sourceDanger(text)
    }
    // width: '10%'
  },
  {
    title: '隐患类型',
    dataIndex: 'categoryName'

    // width: '10%'
  },
  {
    title: '上报人',
    dataIndex: 'reportName'
    // width: '10%'
  },
  {
    title: '隐患状态',
    dataIndex: 'state',
    customRender: (text) => {
      return Tools.dangerState(text)
    }
    // width: '10%'
  },
  {
    title: '隐患等级',
    dataIndex: 'level',
    customRender: (text) => {
      return Tools.dangerLevel(text)
    }
    // width: '10%'
  },
  {
    title: '处理人',
    dataIndex: 'handerName'
    // width: '10%'
  },
  {
    title: '最近操作时间',
    dataIndex: 'optTime',
    customRender: (text) => {
      return Tools.getDate(text)
    }
    // width: '10%'
  },
  {
    title: '操作',
    width: '20%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
//
export const SuperviseColumns = [
  {
    title: '序号',
    width: '5%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  // {
  //   title: 'id',
  //   dataIndex: 'ID'
  //   // width: '15%'
  // },
  {
    title: '所属学校',
    dataIndex: 'schoolName'
    // width: '15%'
  },
  {
    title: '隐患照片',
    dataIndex: 'dangerPhotoUrl',
    // width: '10%',
    scopedSlots: {
      customRender: 'snapPic'
    }
  },
  {
    title: '整改照片',
    dataIndex: 'completePhotoUrl',
    // width: '10%',
    scopedSlots: {
      customRender: 'snapPic'
    }
  },
  {
    title: '隐患描述',
    dataIndex: 'description'
    // width: '10%'
  },
  {
    title: '隐患来源',
    dataIndex: 'source',
    customRender: (text) => {
      return Tools.sourceDanger(text)
    }
    // width: '10%'
  },
  {
    title: '上报人',
    dataIndex: 'reportName'
    // width: '10%'
  },
  {
    title: '隐患状态',
    dataIndex: 'state',
    customRender: (text) => {
      return Tools.dangerState(text)
    }
    // width: '10%'
  },
  {
    title: '隐患等级',
    dataIndex: 'level',
    customRender: (text) => {
      return Tools.dangerLevel(text)
    }
    // width: '10%'
  },
  {
    title: '处理人',
    dataIndex: 'handerName'
    // width: '10%'
  },
  {
    title: '最近操作时间',
    dataIndex: 'optTime',
    customRender: (text) => {
      return Tools.getDate(text)
    }
    // width: '10%'
  },
  {
    title: '督办状态',
    dataIndex: 'superviseState',
    customRender: (text) => {
      if (text === '0') {
        return '正在督办'
      } else if (text === '1') {
        return '结束督办'
      }
    }
    // width: '10%'
  },
  {
    title: '操作',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
