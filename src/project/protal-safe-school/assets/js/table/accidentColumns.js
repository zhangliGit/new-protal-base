import $tools from '@u/tools'
const accident = {
  columns: [{
      title: '序号',
      scopedSlots: {
        customRender: 'index'
      },
      width: '8%'
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
        return $tools.getDate(text, 1)
      }
    },
    {
      title: '事故等级',
      dataIndex: 'level',
      width: '12%',
      customRender: text => {
        if (text === '1') {
          return '特大重大事故'
        } else if (text === '2') {
          return '重大事故'
        } else if (text === '3') {
          return '较大事故'
        } else {
          return '一般事故'
        }
      }
    },
    {
      title: '事故分类',
      dataIndex: 'type',
      width: '10%',
      customRender: text => {
        if (text === '1') {
          return '交通事故'
        } else if (text === '2') {
          return '踩踏事故'
        } else if (text === '3') {
          return '溺水事故'
        } else if (text === '4') {
          return '火灾事故'
        } else if (text === '5') {
          return '触电事故'
        } else if (text === '6') {
          return '校园伤害'
        } else {
          return '其它'
        }
      }
    },
    {
      title: '事故性质',
      dataIndex: 'nature',
      width: '10%',
      customRender: text => {
        if (text === '1') {
          return '责任事故'
        } else if (text === '2') {
          return '自然事故'
        } else if (text === '3') {
          return '技术事故'
        } else {
          return '其它'
        }
      }
    },
    {
      title: '事故状态',
      dataIndex: 'status',
      width: '10%',
      customRender: text => {
        if (text === '1') {
          return '新填报'
        } else if (text === '2') {
          return '处理中'
        } else if (text === '3') {
          return '已结案'
        }
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
  ],
  searchLabel: [{
      list: [{
          key: '',
          val: '全部'
        },
        {
          key: '1',
          val: '新填报'
        },
        {
          key: '2',
          val: '处理中'
        },
        {
          key: '3',
          val: '已结案'
        }
      ],
      value: 'state',
      type: 'select',
      label: '事故状态'
    },
    {
      value: 'rangeTime',
      type: 'rangeTime',
      label: '事故时间'
    }
  ],
  formData: [{
    value: 'address1',
    initValue: '',
    type: 'textarea',
    label: '续报内容',
    placeholder: '请填写续报内容',
    minRows: 2,
    maxRows: 6,
    max: 100
  }]
}
export default accident