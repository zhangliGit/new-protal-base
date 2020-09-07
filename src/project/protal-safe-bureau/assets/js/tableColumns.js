import Tools from '@u/tools'
// table列
export const taskColumns = [
  {
    title: '序号',
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
    title: '任务名称',
    dataIndex: 'name'
    // width: '15%'
  },
  {
    title: '开始时间',
    dataIndex: 'beginTime',
    customRender: (text) => {
      return Tools.getDate(text)
    }
    // width: '10%'
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    customRender: (text) => {
      return Tools.getDate(text)
    }
    // width: '10%'
  },
  {
    title: '成员数',
    dataIndex: 'personNum'
    // width: '15%'
  },
  {
    title: '检查项(项)',
    dataIndex: 'itemNum'
    // width: '15%'
  },
  {
    title: '检查标准(项)',
    dataIndex: 'standardNum'
    // width: '10%',
  },

  {
    title: '操作',
    width: '20%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export const checkColumns = [
  {
    title: '序号',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '检查项目',
    dataIndex: 'name'
    // width: '15%'
  },
  {
    title: '事项数量',
    dataIndex: 'num'
    // width: '15%'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    customRender: (text) => {
      return Tools.getDate(text)
    }
  },
  {
    title: '操作',
    width: '20%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
