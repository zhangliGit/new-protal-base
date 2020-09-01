// 上报隐患表单
export const reportDangerForm = [
  {
    value: 'userName',
    initValue: '',
    type: 'input', // numberInput: 纯数字文本框
    label: '指定学校',
    required: true, // 默认为true，不用填写
    readonly: false, // 是否只读,
    disabled: false, // 是否禁用
    // len: 3, // 固定长度
    // max: 4, // 最大长度
    placeholder: '请指定学校',
    change: true
    // regular: 'password' // 正则验证{密码：password，网址：url，IP：ip，手机号：phone，邮箱：email，身份证：card}
  },
  {
    value: 'sex',
    initValue: [],
    list: [
      {
        key: 1,
        val: '男'
      },
      {
        key: 2,
        val: '女'
      },
      {
        key: 3,
        val: '未知'
      }
    ],
    type: 'select',
    label: '性别',
    placeholder: '请选择性别'
  },
  {
    value: 'enjoy',
    initValue: [],
    list: [
      {
        key: 1,
        val: '篮球'
      },
      {
        key: 2,
        val: '足球'
      },
      {
        key: 3,
        val: '羽毛球'
      }
    ],
    type: 'checkbox',
    label: '兴趣爱好',
    placeholder: '请选择兴趣爱好'
  },
  {
    value: 'marry',
    initValue: 1,
    list: [
      {
        key: 1,
        val: '已婚'
      },
      {
        key: 2,
        val: '未婚'
      }
    ],
    type: 'radio',
    label: '是否已婚',
    placeholder: '请选择是否已婚'
  },
  {
    type: 'upload',
    label: '上传图像'
  },
  {
    value: 'birthday',
    type: 'singleTime',
    label: '生日',
    initValue: '',
    placeholder: '请选择生日'
  },
  {
    value: 'workTime',
    type: 'rangeTime',
    label: '工作时间',
    initValue: '',
    placeholder: '请选择工作时间'
  }
]
// table列
export const columns = [
  // {
  //   title: '序号',
  //   width: '5%',
  //   scopedSlots: {
  //     customRender: 'index'
  //   }
  // },
  {
    title: 'ID',
    dataIndex: 'ID'
    // width: '15%'
  },
  {
    title: '所属学校',
    dataIndex: 'school'
    // width: '15%'
  },
  {
    title: '隐患照片',
    dataIndex: 'DangerPhotos',
    // width: '10%',
    scopedSlots: {
      customRender: 'snapPic'
    }
  },
  {
    title: '整改照片',
    dataIndex: 'rectifyPhotos',
    // width: '10%',
    scopedSlots: {
      customRender: 'snapPic'
    }
  },
  {
    title: '隐患描述',
    dataIndex: 'hazardDescription'
    // width: '10%'
  },
  {
    title: '隐患来源',
    dataIndex: 'sourceOfDanger'
    // width: '10%'
  },
  {
    title: '隐患类型',
    dataIndex: 'hazardType'
    // width: '10%'
  },
  {
    title: '上报人',
    dataIndex: 'reporter'
    // width: '10%'
  },
  {
    title: '隐患状态',
    dataIndex: 'DangerState'
    // width: '10%'
  },
  {
    title: '隐患等级',
    dataIndex: 'hiddenDangerLevel'
    // width: '10%'
  },
  {
    title: '处理人',
    dataIndex: 'handler'
    // width: '10%'
  },
  {
    title: '最近操作时间',
    dataIndex: 'lastOperationTime'
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
