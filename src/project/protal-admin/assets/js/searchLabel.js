// import Tools from '@u/tools'
// 安全教育
// 安全知识
export const KnowledgeSearchLabel = [
  {
    value: 'fileType', // 表单属性
    type: 'select', // 表单类型
    label: '文件类型', // 表单label值
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '1',
        val: '看一看'
      },
      {
        key: '2',
        val: '玩一玩'
      },
      {
        key: '3',
        val: '读一读'
      },
      {
        key: '4',
        val: '听一听'
      }
    ]
  },
  {
    value: 'resourceName', // 表单属性
    type: 'input', // 表单类型
    label: '资源名称', // 表单label值
    placeholder: '请输入资源名称' // 表单默认值(非必选字段)
  }
]
// 安全课堂
export const SafeClassItemLabel = [
  {
    value: 'section', // 表单属性
    type: 'select', // 表单类型
    label: '适用学段', // 表单label值
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '1',
        val: '幼儿园'
      },
      {
        key: '2',
        val: '小学低年级'
      },
      {
        key: '3',
        val: '小学高年级'
      },
      {
        key: '4',
        val: '初中'
      },
      {
        key: '5',
        val: '高中'
      }
    ]
  },
  {
    value: 'name', // 表单属性
    type: 'input', // 表单类型
    label: '课堂名称', // 表单label值
    placeholder: '请输入课堂名称' // 表单默认值(非必选字段)
  }
]
// 安全课堂
export const exerciseSearchLabel = [
  {
    value: 'name', // 表单属性
    type: 'input', // 表单类型
    label: '搜索', // 表单label值
    placeholder: '请输入习题内容' // 表单默认值(非必选字段)
  }
]
