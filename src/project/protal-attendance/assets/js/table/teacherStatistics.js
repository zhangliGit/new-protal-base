const teacherStatistics = [
  {
    title: '序号',
    width: '10%',
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
    title: '工号',
    dataIndex: 'workNo',
    width: '10%'
  },
  {
    title: '组织机构',
    dataIndex: 'orgName',
    width: '10%'
  },
  {
    title: '正常次数',
    dataIndex: 'normalCount',
    width: '10%',
    scopedSlots: {
      customRender: 'other1'
    }
  },
  {
    title: '迟到次数',
    dataIndex: 'lateCount',
    width: '10%',
    scopedSlots: {
      customRender: 'other2'
    }
  },
  {
    title: '早退次数',
    dataIndex: 'earlyCount',
    width: '10%',
    scopedSlots: {
      customRender: 'other3'
    }
  },
  // {
  //   title: '上班缺卡次数',
  //   dataIndex: 'onWork',
  //   width: '10%'
  // },
  // {
  //   title: '下班缺卡次数',
  //   dataIndex: 'offWork',
  //   width: '10%'
  // },
  // {
  //   title: '请假次数',
  //   dataIndex: 'leave',
  //   width: '10%'
  // },
  {
    title: '缺勤次数',
    dataIndex: 'noRecord',
    width: '10%',
    scopedSlots: {
      customRender: 'other4'
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
export default teacherStatistics
