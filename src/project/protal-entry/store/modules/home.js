import $ajax from '@u/ajax-serve'
import apiList from '../../api/index'

/**
 * @description 处理请求成功后返回Promise方便vue界面处理数据
 * @param {res} 返回结果
 */
function resultBack(res) {
  return new Promise(resolve => {
    resolve(res)
  })
}
/**
 * @description 当前模块接口列表
 * @param {url} 功能接口
 * @param {type} 请求类型
 * @param {params} 请求参数
 */
const actions = Object.create(null)
for (const key in apiList) {
  const url = apiList[key].split('#')[0]
  const type = apiList[key].split('#')[1]
  const isLoad = apiList[key].split('#')[2] === undefined
  actions[key] = async function({ commit, state }, params = {}) {
    // 是否显示加载提示
    const reqType = type === 'getUrl' ? 'get' : type
    const isGetUrl = type === 'getUrl'
    const res = await $ajax[reqType](
      {
        url: isGetUrl || type === 'del' ? url + '/' + params : url,
        params: isGetUrl ? {} : params
      },
      isLoad
    )
    return resultBack(res)
  }
}

const projectName = 'protal-entry' // 此处写项目名作为存储值，避免不同项目冲突
const localData = window.sessionStorage.getItem(projectName) || JSON.stringify({})
const getState = (state, val) => {
  return typeof JSON.parse(localData)[state] === 'undefined' ? val : JSON.parse(localData)[state]
}

// 测试-招生迎新系统
const testMunuList = getState('menuList', [])
const newData = [
  {
    id: 999,
    name: '招生迎新管理',
    parentId: null,
    orderNum: 2,
    url: '/oabgxt',
    menuType: null,
    perms: '',
    icon:
      'http://canpoint-file.oss-cn-beijing.aliyuncs.com/CANPOINT/2020/08/18/base/1a8f1f9938d04bd6bcc8e94f84c85fa6.jpg',
    plateformType: 2,
    createTime: null,
    appId: null,
    remark: '',
    appCode: 'OABGXT',
    children: [
      {
        id: 91233,
        name: '首页',
        parentId: null,
        orderNum: 68,
        url: '/pc-protal/protal-new-student#/home',
        menuType: 2,
        perms: '',
        icon:
          'http://canpoint-file.oss-cn-beijing.aliyuncs.com/CANPOINT/2020/08/18/base/9b04e61999cf4f91be08e71ffa5d2528.jpg',
        plateformType: 2,
        createTime: 1603416079000,
        appId: 187,
        remark: '',
        appCode: '',
        children: []
      },
      {
        id: 1179,
        name: '招生管理',
        parentId: null,
        orderNum: 66,
        url: '',
        menuType: 1,
        perms: '',
        icon: '',
        plateformType: 2,
        createTime: 1603416079000,
        appId: 187,
        remark: '',
        appCode: '',
        children: [
          {
            id: 1229,
            name: '招生任务',
            parentId: 1179,
            orderNum: 20,
            url: '/pc-protal/protal-new-student#/studentTask',
            menuType: 2,
            perms: '',
            icon:
              'http://canpoint-file.oss-cn-beijing.aliyuncs.com/CANPOINT/2020/08/18/base/4ae8b55d7e52489eb69fae503be05e4b.jpg',
            plateformType: 2,
            createTime: 1597911664000,
            appId: 187,
            remark: '',
            appCode: '',
            children: []
          },
          {
            id: 22229,
            name: '新生申请',
            parentId: 1179,
            orderNum: 20,
            url: '/pc-protal/protal-new-student#/studentApply',
            menuType: 2,
            perms: '',
            icon:
              'http://canpoint-file.oss-cn-beijing.aliyuncs.com/CANPOINT/2020/08/18/base/4ae8b55d7e52489eb69fae503be05e4b.jpg',
            plateformType: 2,
            createTime: 1597911664000,
            appId: 187,
            remark: '',
            appCode: '',
            children: []
          }
        ]
      },
      {
        id: 1232,
        name: '迎新管理',
        parentId: null,
        orderNum: 67,
        url: '',
        menuType: 2,
        perms: '',
        icon:
          'http://canpoint-file.oss-cn-beijing.aliyuncs.com/CANPOINT/2020/08/18/base/b06bf6a9fcc2421e96e1d968ccb3f4e6.jpg',
        plateformType: 2,
        createTime: 1603416079000,
        appId: 187,
        remark: '',
        appCode: '',
        children: [
          {
            id: 1221912,
            name: '新生管理',
            parentId: 1232,
            orderNum: 20,
            url: '/pc-protal/protal-new-student#/studentManage',
            menuType: 2,
            perms: '',
            icon:
              'http://canpoint-file.oss-cn-beijing.aliyuncs.com/CANPOINT/2020/08/18/base/4ae8b55d7e52489eb69fae503be05e4b.jpg',
            plateformType: 2,
            createTime: 1597911664000,
            appId: 187,
            remark: '',
            appCode: '',
            children: []
          },
          {
            id: 12241912,
            name: '新生分班',
            parentId: 1232,
            orderNum: 20,
            url: '/pc-protal/protal-new-student#/studentClasses',
            menuType: 2,
            perms: '',
            icon:
              'http://canpoint-file.oss-cn-beijing.aliyuncs.com/CANPOINT/2020/08/18/base/4ae8b55d7e52489eb69fae503be05e4b.jpg',
            plateformType: 2,
            createTime: 1597911664000,
            appId: 187,
            remark: '',
            appCode: '',
            children: []
          }
        ]
      },
      {
        id: 1233,
        name: '设备管理',
        parentId: null,
        orderNum: 68,
        url: '/pc-protal/protal-new-student#/deviceManage',
        menuType: 2,
        perms: '',
        icon:
          'http://canpoint-file.oss-cn-beijing.aliyuncs.com/CANPOINT/2020/08/18/base/9b04e61999cf4f91be08e71ffa5d2528.jpg',
        plateformType: 2,
        createTime: 1603416079000,
        appId: 187,
        remark: '',
        appCode: '',
        children: []
      }
    ]
  }
]

const home = {
  namespaced: true,
  state: {
    loginType: JSON.parse(window.sessionStorage.getItem('loginType')),
    schoolCode: JSON.parse(window.sessionStorage.getItem('loginType')).userTypes[0].schoolCode,
    slideTag: getState('slideTag', true), // 是否伸缩左侧菜单栏
    isEntryApp: getState('isEntryApp', false), // 是否进入应用状态
    appIndex: getState('appIndex', -1), // 当前模块索引
    menuIndex: getState('menuIndex', []), // 当前模块菜单项
    // menuList: getState('menuList', []), // 当前用户角色菜单列表
    menuList: [...testMunuList, ...newData], // 当前用户角色菜单列表
    userInfo: getState('userInfo', {
      protalName: '全品平安校园云平台',
      systemName: '武汉全品文教管理端',
      userName: '超级管理员'
    })
  },
  actions: {
    ...actions
  },
  mutations: {
    /**
     * @description 设置state值
     * @param { key } state属性
     * @param { data } 存在的数据
     */
    updateState(state, { key, data, isLocal = true }) {
      if (isLocal) {
        const localData = JSON.parse(sessionStorage.getItem(projectName) || '{}')
        localData[key] = data
        window.sessionStorage.setItem(projectName, JSON.stringify(localData))
      }
      state[key] = data
    }
  }
}

export default home
