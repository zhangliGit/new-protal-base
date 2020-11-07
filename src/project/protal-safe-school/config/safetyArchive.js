import { RouteView } from '../layouts'
const FireArchive = resolve => require(['../views/SafetyArchive/FireArchive.vue'], resolve)
const SchBusArchive = resolve => require(['../views/SafetyArchive/SchBusArchive.vue'], resolve)
const InstrumentArchive = resolve => require(['../views/SafetyArchive/InstrumentArchive.vue'], resolve)
const FireAdd = resolve => require(['../views/SafetyArchive/FireAdd.vue'], resolve)
const SchoolAdd = resolve => require(['../views/SafetyArchive/SchoolAdd.vue'], resolve)
const InstrumentAdd = resolve => require(['../views/SafetyArchive/InstrumentAdd.vue'], resolve)
const safetyArchive = {
  path: '/archive',
  name: 'archive',
  component: RouteView,
  meta: {
    title: '安全档案'
  },
  children: [
    {
      path: '/fireArchive',
      name: 'fireArchive',
      component: FireArchive,
      meta: {
        title: '消防档案填报'
      }
    },
    {
      path: '/fireArchive/fireAdd',
      name: 'fireAdd',
      component: FireAdd,
      meta: {
        title: '档案管理',
        isHide: true
      }
    },
    {
      path: '/schBusArchive',
      name: 'schBusArchive',
      component: SchBusArchive,
      meta: {
        title: '校车档案填报'
      }
    },
    {
      path: '/schBusArchive/schoolAdd',
      name: 'schoolAdd',
      component: SchoolAdd,
      meta: {
        title: '档案管理',
        isHide: true
      }
    },
    {
      path: '/instrumentArchive',
      name: 'instrumentArchive',
      component: InstrumentArchive,
      meta: {
        title: '器械档案填报'
      }
    },
    {
      path: '/instrumentArchive/instrumentAdd',
      name: 'instrumentAdd',
      component: InstrumentAdd,
      meta: {
        title: '档案管理',
        isHide: true
      }
    }
  ]
}

export default safetyArchive
