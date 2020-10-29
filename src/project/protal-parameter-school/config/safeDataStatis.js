import { RouteView } from '../layouts'
// 安全数据统计
const safeDataStatis = {
  path: '/safeDataStatis',
  name: 'safeDataStatis',
  component: RouteView,
  meta: {
    title: '安全数据统计'
  },
  children: [
    {
      path: '/dailyStatis',
      name: 'dailyStatis',
      component: () => import('../views/safeDataStatis/DailyStatis.vue'),
      meta: {
        title: '日常巡检统计'
      }
    },
    // {
    //   path: '/knowledgePublic/previewKlg',
    //   name: 'previewKlg',
    //   component: () => import('../views/safeDataStatis/PreviewKlg.vue'),
    //   meta: {
    //     title: '查看',
    //     isHide: true
    //   }
    // },
    // {
    //   path: '/accountList/reportDangers',
    //   name: 'reportDangers',
    //   component: ReportDangers,
    //   meta: {
    //     title: '上报隐患',
    //     isHide: true
    //   }
    // },
    {
      path: '/specialStatis',
      name: 'specialStatis',
      component: () => import('../views/safeDataStatis/SpecialStatis.vue'),
      meta: {
        title: '专项检查统计'
      }
    },
    // {
    //   path: '/safeClassPulic/previewClass',
    //   name: 'previewClass',
    //   component: () => import('../views/safeDataStatis/PreviewClass.vue'),
    //   meta: {
    //     title: '查看',
    //     isHide: true
    //   }
    // },
    {
      path: '/dangerStatis',
      name: 'dangerStatis',
      component: () => import('../views/safeDataStatis/DangerStatis.vue'),
      meta: {
        title: '安全隐患统计'
      }
    }
    // {
    //   path: '/safeClassPulic/classPageList',
    //   name: 'classPageList',
    //   component: () => import('../views/safeDataStatis/ClassPageList.vue'),
    //   meta: {
    //     title: '安全课堂',
    //     isHide: true
    //   }
    // }
    // {
    //   path: '/accountList/viewDangers',
    //   name: 'viewDangers',
    //   component: ViewDangers,
    //   meta: {
    //     title: '查看隐患',
    //     isHide: true
    //   }
    // }
    // {
    //   path: '/accountList/rectificationNotice',
    //   name: 'rectificationNotice',
    //   component: RectificationNotice,
    //   meta: {
    //     title: '整改通知书',
    //     isHide: true
    //   }
    // },
    // {
    //   path: '/accountList/eidtRectificationNotice',
    //   name: 'eidtRectificationNotice',
    //   component: EidtRectificationNotice,
    //   meta: {
    //     title: '编辑整改通知书',
    //     isHide: true
    //   }
    // }
  ]
}

export default safeDataStatis
