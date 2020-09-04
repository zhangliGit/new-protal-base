import $tools from '@u/tools'
const dutyColumns = {
  columns: [{
      title: '序号',
      scopedSlots: {
        customRender: 'index'
      },
      width: '8%'
    },
    {
      title: '上报人',
      dataIndex: 'name',
      width: '10'
    },
    {
      title: '上报时间',
      dataIndex: 'createTime',
      width: '12%',
      customRender: text => {
        return $tools.getDate(text)
      }
    },
    {
      title: '值班人员',
      dataIndex: 'name1',
      width: '10'
    },
    {
      title: '带班领导',
      dataIndex: 'name2',
      width: '10'
    },
    {
      title: '状态',
      dataIndex: 'qrcodeType',
      width: '10%',
      customRender: text => {
        if (text === '1') {
          return '异常'
        } else {
          return '正常'
        }
      }
    },
    {
      title: '值班轨迹',
      dataIndex: 'logoUrl',
      width: '12%',
      scopedSlots: {
        customRender: 'photoUrl'
      }
    },
    {
      title: '巡查点数量',
      dataIndex: 'logoUrl1',
      width: '10%',
      scopedSlots: {
        customRender: 'other1'
      }
    },
    {
      title: '操作',
      width: '12%',
      scopedSlots: {
        customRender: 'action'
      }
    }
  ],
  searchLabel: [{
      value: 'rangeTime',
      type: 'rangeTime',
      label: '上报时间'
    },
    {
      value: 'keyWord',
      initValue: '',
      type: 'selectInput',
      selectType: [{
          key: 'schoolName',
          val: '上报人'
        },
        {
          key: 'schoolCode',
          val: '值班人员'
        },
        {
          key: 'schoolCode',
          val: '带班领导'
        }
      ],
      placeholder: '请输入'
    },
    {
      list: [{
          key: '',
          val: '全部'
        },
        {
          key: '1',
          val: '正常'
        },
        {
          key: '2',
          val: '异常'
        }
      ],
      value: 'healthyState',
      type: 'select',
      label: '状态'
    }
  ],
  inspectColumns: [{
      title: '巡查地点名称',
      dataIndex: 'name',
      width: '30'
    },
    {
      title: '巡查结果',
      dataIndex: 'name1',
      width: '30'
    },
    {
      title: '巡查时间',
      dataIndex: 'createTime',
      width: '40%',
      customRender: text => {
        return $tools.getDate(text)
      }
    }
  ]
}
export default dutyColumns