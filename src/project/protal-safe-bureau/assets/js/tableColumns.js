import Tools from '@u/tools'
// 隐患管理
// 发现隐患
export const hiddenDangerColumns = [
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
    dataIndex: 'description',
    ellipsis: true
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
    },
    width: 200
  },
  {
    title: '操作',
    width: '20%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
// 督办隐患
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
// 专项table列
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
// 事故table
export const incidentColumns = [
  {
    title: '序号',
    scopedSlots: {
      customRender: 'index'
    },
    width: '8%'
  },
  {
    title: '学校名称',
    dataIndex: 'schoolName',
    width: '12%'
  },
  {
    title: '事故名称',
    dataIndex: 'title',
    width: '12%'
  },
  {
    title: '事故时间',
    dataIndex: 'happenTime',
    width: '15%',
    customRender: text => {
      return Tools.getDate(text, 1)
    }
  },
  {
    title: '事故等级',
    dataIndex: 'level',
    width: '12%',
    customRender: text => {
      return Tools.accidentLevel(text)
    }
  },
  {
    title: '事故分类',
    dataIndex: 'type',
    width: '10%',
    customRender: text => {
      return Tools.accidentType(text)
    }
  },
  {
    title: '事故性质',
    dataIndex: 'nature',
    width: '10%',
    customRender: text => {
      return Tools.accidentNature(text)
    }
  },
  {
    title: '事故状态',
    dataIndex: 'status',
    width: '10%',
    customRender: text => {
      return Tools.accidentStatus(text)
    }
  },
  {
    title: '上级批示',
    width: '10%',
    scopedSlots: {
      customRender: 'other1'
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
