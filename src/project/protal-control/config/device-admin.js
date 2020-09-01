// 系统表单
import { RouteView } from '../layouts'
const DeviceList = resolve => require(['../views/device-admin/DeviceList.vue'], resolve)
const DeviceGroup = resolve => require(['../views/device-admin/DeviceGroup.vue'], resolve)
const DeviceDetail = resolve => require(['../views/device-admin/DeviceDetail.vue'], resolve)
const ControlGroup = resolve => require(['../views/device-admin/ControlGroup.vue'], resolve)
const ControlDetail = resolve => require(['../views/device-admin/ControlDetail.vue'], resolve)
const project = {
  path: '/device',
  name: 'device',
  component: RouteView,
  meta: {
    title: '设备管理'
  },
  children: [
    {
      path: '/deviceList',
      name: 'deviceList',
      component: DeviceList,
      meta: {
        title: '设备列表'
      }
      // }, {
      //   path: '/deviceGroup',
      //   name: 'deviceGroup',
      //   component: DeviceGroup,
      //   meta: {
      //     title: '设备组'
      //   }
      // }, {
      //   path: '/deviceGroup/deviceDetail',
      //   name: 'deviceDetail',
      //   component: DeviceDetail,
      //   meta: {
      //     title: '详情',
      //     isHide: true
      //   }
      // }, {
      //   path: '/controlGroup',
      //   name: 'controlGroup',
      //   component: ControlGroup,
      //   meta: {
      //     title: '控制组'
      //   }
      // }, {
      //   path: '/controlGroup/controlDetail',
      //   name: 'controlDetail',
      //   component: ControlDetail,
      //   meta: {
      //     title: '详情',
      //     isHide: true
      //   }
      // }
    }
  ]
}

export default project
