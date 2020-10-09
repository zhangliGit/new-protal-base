// 系统表单
import {
  RouteView
} from '../layouts'
const Knowledge = resolve => require(['../views/library/Knowledge.vue'], resolve)
const AddKlg = resolve => require(['../views/library/AddKlg.vue'], resolve)
const ResourIfication = resolve => require(['../views/library/ResourIfication.vue'], resolve)
const library = {
  path: '/library',
  name: 'library',
  component: RouteView,
  meta: {
    title: '公共资源库'
  },
  children: [
    {
      path: '/safetyKnowledge',
      name: 'safetyKnowledge',
      component: Knowledge,
      meta: {
        title: '安全知识'
      }
    },
    {
      path: '/library/AddKlg',
      name: 'addKlg',
      component: AddKlg,
      meta: {
        title: '添加安全知识',
        isHide: true
      }
    },
    {
      path: '/safeClass',
      name: 'safeClass',
      component: AddKlg,
      meta: {
        title: '安全课堂'
      }
    },
    {
      path: '/resourIfication',
      name: 'resourIfication',
      component: ResourIfication,
      meta: {
        title: '资源分类'
      }
    }
  ]
}

export default library
