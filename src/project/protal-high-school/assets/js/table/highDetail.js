import Tools from '@u/tools'
const highDetail = {
  columns: [
    {
      title: '序号',
      width: '10%',
      scopedSlots: {
        customRender: 'index'
      }
    },
    {
      title: '学生姓名',
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
      title: '走住读',
      dataIndex: 'workNo1',
      width: '10%'
    },
    {
      title: '入学年份',
      dataIndex: 'admissionTime',
      width: '15%',
      customRender: text => {
        return new Date(text).getFullYear()
      }
    },
    {
      title: '人脸照片',
      dataIndex: 'photoUrl',
      width: '10%',
      scopedSlots: {
        customRender: 'photoPic'
      }
    },
    {
      title: '加入班级时间',
      dataIndex: 'createTime',
      width: '15%',
      customRender: text => {
        return Tools.getDate(text).substring(0, 10)
      }
    }
  ],
  teacolumns: [
    {
      title: '序号',
      width: '10%',
      scopedSlots: {
        customRender: 'index'
      }
    },
    {
      title: '教师姓名',
      dataIndex: 'teacherName',
      width: '10%'
    },
    {
      title: '教授学科',
      dataIndex: 'subjectName',
      width: '10%'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      width: '10%',
      customRender: text => {
        return Tools.getSex(text)
      }
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      width: '10%'
    },
    {
      title: '工号',
      dataIndex: 'userNo',
      width: '10%'
    },
    {
      title: '人脸照片',
      dataIndex: 'photoSrc',
      width: '10%',
      scopedSlots: {
        customRender: 'photoPic'
      }
    }
  ],
  searchLabel: [
    {
      value: 'keywords',
      initValue: '',
      type: 'selectInput',
      selectType: [
        {
          key: 1,
          val: '学生姓名'
        },
        {
          key: 2,
          val: '学号'
        }
      ],
      placeholder: '请输入'
    }
  ],
  teasearchLabel: [
    {
      value: 'subjectCode',
      initValue: '',
      type: 'select',
      list: [
        {
          key: '',
          val: '全部'
        }
      ],
      label: '学科'
    }
  ],
  formData: [
    {
      value: 'grade',
      initValue: [],
      type: 'linkSelect',
      required: false,
      label: '转至班级',
      placeholder1: '年级',
      placeholder2: '班级',
      firstList: [],
      secondList: []
    }
  ]
}
export default highDetail
