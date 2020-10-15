const teacherRecord = [
  {
    title: '序号',
    width: 100,
    scopedSlots: {
      customRender: 'index'
    },
    fixed: 'left'
  },
  {
    title: '姓名',
    dataIndex: 'riskContent',
    width: 100,
    fixed: 'left'
  },
  {
    title: '组织机构',
    width: 100,
    fixed: 'left'
  },
  {
    title: '日期',
    width: 100,
    fixed: 'left'
  },
  {
    title: '班次',
    dataIndex: 'accidentType',
    width: 100,
    fixed: 'left'
  },
  {
    title: '上午上班',
    children: [
      {
        title: '时间',
        dataIndex: 'scientificMeasures1'
      },
      {
        title: '体温',
        dataIndex: 'manageMeasures1'
      },
      {
        title: '状态',
        dataIndex: 'trainingMeasures1'
      }
    ]
  },
  {
    title: '上午下班',
    children: [
      {
        title: '时间',
        dataIndex: 'scientificMeasures2'
      },
      {
        title: '体温',
        dataIndex: 'manageMeasures2'
      },
      {
        title: '状态',
        dataIndex: 'trainingMeasures2'
      }
    ]
  },
  {
    title: '下午上班',
    children: [
      {
        title: '时间',
        dataIndex: 'scientificMeasures3'
      },
      {
        title: '体温',
        dataIndex: 'manageMeasures3'
      },
      {
        title: '状态',
        dataIndex: 'trainingMeasures3'
      }
    ]
  },
  {
    title: '下午下班',
    children: [
      {
        title: '时间',
        dataIndex: 'scientificMeasures4'
      },
      {
        title: '体温',
        dataIndex: 'manageMeasures4'
      },
      {
        title: '状态',
        dataIndex: 'trainingMeasures4'
      }
    ]
  }
]
export default teacherRecord
