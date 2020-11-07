import { RouteView } from '../layouts'
const InspectArea = resolve => require(['../views/SafetyInspect/InspectArea.vue'], resolve)
const InspectDaily = resolve => require(['../views/SafetyInspect/InspectDaily.vue'], resolve)
const AreaAdd = resolve => require(['../views/SafetyInspect/AreaAdd.vue'], resolve)
const InspectAdd = resolve => require(['../views/SafetyInspect/InspectAdd.vue'], resolve)
const InspectDetail = resolve => require(['../views/SafetyInspect/InspectDetail.vue'], resolve)
const InspectEquip = resolve => require(['../views/SafetyInspect/InspectEquip.vue'], resolve)
const InspectSafe = resolve => require(['../views/SafetyInspect/InspectSafe.vue'], resolve)
const AvoidingTime = resolve => require(['../views/SafetyInspect/AvoidingTime.vue'], resolve)
const InspectDuty = resolve => require(['../views/SafetyInspect/InspectDuty.vue'], resolve)
const DutyDetail = resolve => require(['../views/SafetyInspect/DutyDetail.vue'], resolve)

const safetyInspect = {
  path: '/inspect',
  name: 'inspect',
  component: RouteView,
  meta: {
    title: '安全巡检'
  },
  children: [
    {
      path: '/inspectArea/areaAdd',
      name: 'areaAdd',
      component: AreaAdd,
      meta: {
        title: '巡检区域管理',
        isHide: true
      }
    },
    {
      path: '/inspectArea',
      name: 'inspectArea',
      component: InspectArea,
      meta: {
        title: '巡检区域'
      }
    },
    {
      path: '/inspectDaily/inspectDetail',
      name: 'inspectDetail',
      component: InspectDetail,
      meta: {
        title: '查看巡检记录',
        isHide: true
      }
    },
    {
      path: '/inspectDaily',
      name: 'inspectDaily',
      component: InspectDaily,
      meta: {
        title: '日常巡检'
      }
    },
    {
      path: '/inspectDaily/inspectAdd',
      name: 'inspectAdd',
      component: InspectAdd,
      meta: {
        title: '任务管理',
        isHide: true
      }
    },
    {
      path: '/inspectEquip',
      name: 'inspectEquip',
      component: InspectEquip,
      meta: {
        title: '设备巡检'
      }
    },
    {
      path: '/inspectSafe',
      name: 'inspectSafe',
      component: InspectSafe,
      meta: {
        title: '安全护导'
      }
    },
    {
      path: '/inspectDuty',
      name: 'inspectDuty',
      component: InspectDuty,
      meta: {
        title: '巡查值班'
      }
    },
    {
      path: '/inspectDuty/dutyDetail',
      name: 'dutyDetail',
      component: DutyDetail,
      meta: {
        title: '巡查值班详情',
        isHide: true
      }
    },
    {
      path: '/avoidingTime',
      name: 'avoidingTime',
      component: AvoidingTime,
      meta: {
        title: '规避时间设置'
      }
    }
  ]
}

export default safetyInspect
