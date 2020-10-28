import Tools from '@u/tools'
const highStudent = {
  columns: [
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
      title: '学号',
      dataIndex: 'workNo',
      width: '10%'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: '10%',
      customRender: text => {
        return Tools.getSex(text)
      }
    },
    {
      title: '年级',
      dataIndex: 'gradeName',
      width: '15%',
      customRender: (text, record) => {
        return `${record.gradeName}${record.className}`
      }
    },
    {
      title: '专业',
      dataIndex: 'workNo1',
      width: '10%'
    },
    {
      title: '班级',
      dataIndex: 'workNo2',
      width: '10%'
    },
    {
      title: '入学年份',
      dataIndex: 'admissionTime',
      width: '10%',
      customRender: text => {
        return new Date(text).getFullYear()
      }
    },
    {
      title: '走住读',
      dataIndex: 'hasDorm',
      width: '8%',
      scopedSlots: {
        customRender: 'other1'
      }
    },
    {
      title: '照片',
      width: '10%',
      scopedSlots: {
        customRender: 'photoPic'
      }
    }
  ],
  searchLabel: [
    {
      value: 'keyword',
      initValue: '',
      type: 'selectInput',
      selectType: [
        {
          key: 1,
          val: '姓名'
        },
        {
          key: 2,
          val: '学号'
        }
      ],
      placeholder: '请输入'
    },
    {
      list: [
        {
          key: '',
          val: '全部'
        },
        {
          key: 1,
          val: '住读'
        },
        {
          key: 0,
          val: '走读'
        }
      ],
      value: 'hasDorm',
      type: 'select',
      label: '走住读类型'
    },
    {
      list: [
        {
          key: '',
          val: '全部'
        },
        {
          key: 1,
          val: '有照片'
        },
        {
          key: 0,
          val: '无照片'
        }
      ],
      value: 'hasPhoto',
      type: 'select',
      label: '有无照片'
    }
  ],
  formData: [
    {
      value: 'userName',
      initValue: '',
      type: 'input',
      label: '学生姓名',
      placeholder: '请输入学生姓名'
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
      value: 'workNo',
      initValue: '',
      type: 'input',
      label: '学号',
      placeholder: '请输入学生学号'
    },
    {
      value: 'hasDorm',
      initValue: [],
      list: [
        {
          key: 1,
          val: '住读'
        },
        {
          key: 0,
          val: '走读'
        }
      ],
      type: 'select',
      label: '走住读类型',
      placeholder: '请选择走住读类型'
    },
    {
      value: 'admissionTime',
      initValue: [new Date().getFullYear()],
      list: [
        { key: new Date().getFullYear() + 1, val: new Date().getFullYear() + 1 },
        { key: new Date().getFullYear(), val: new Date().getFullYear() },
        { key: new Date().getFullYear() - 1, val: new Date().getFullYear() - 1 }
      ],
      type: 'select',
      label: '入学年份',
      placeholder: '请选择入学年份'
    },
    {
      type: 'upload',
      label: '人脸照片',
      required: false,
      placeholder: '请上传人脸照片'
    },
    {
      value1: 'grade',
      value2: 'class',
      initValue1: [],
      initValue2: [],
      type: 'linkSelect',
      required: false,
      label: '班级',
      placeholder1: '请选择',
      placeholder2: '请选择',
      firstList: [],
      secondList: []
    },
    {
      value: 'cardNo',
      initValue: '',
      type: 'input',
      label: '卡号',
      required: false,
      placeholder: '请输入学生卡号'
    },
    {
      value: 'remark',
      initValue: '',
      type: 'input',
      label: '备注',
      required: false,
      placeholder: '请输入备注'
    }
  ]
}
export default highStudent
