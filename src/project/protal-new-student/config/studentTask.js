// 招生任务
// import { RouteView } from '../layouts'
const TaskList = resolve => require(['../views/TaskManage/TaskManage.vue'], resolve)
const TaskDetails = resolve => require(['../views/TaskManage/TaskDetails.vue'], resolve)
const taskDetails = {
  path: '/studentTask',
  name: '/studentTask',
  component: TaskList,
  meta: {
    title: '招生任务'
  },
  children: [
    {
      path: '/taskDetails',
      name: 'taskDetails',
      component: TaskDetails,
      meta: {
        title: '任务详情'
      }
    }
  ]
}

export default taskDetails
