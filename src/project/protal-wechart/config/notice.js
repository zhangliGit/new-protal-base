import { RouteView } from '../layouts'
// 通知公告
const NoticeType = resolve => require(['../views/notice/NoticeType.vue'], resolve)
const TemplateType = resolve => require(['../views/notice/TemplateType.vue'], resolve)
const SysTemTemplate = resolve => require(['../views/notice/SysTemTemplate.vue'], resolve)
const notice = {
  path: '/noticeType',
  name: 'noticeType',
  redirect: '/NoticeType',
  component: RouteView,
  meta: {
    title: '通知公告'
  },
  children: [
    {
      path: '/noticeType',
      name: 'noticeType',
      component: NoticeType,
      meta: {
        title: '通知类型'
      }
    },
    {
      path: '/templateType',
      name: 'templateType',
      component: TemplateType,
      meta: {
        title: '模板类型'
      }
    },
    {
      path: '/systemTemplate',
      name: 'systemTemplate',
      component: SysTemTemplate,
      meta: {
        title: '系统模板'
      }
    }
  ]
}

export default notice
