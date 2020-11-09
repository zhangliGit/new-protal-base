// 招生任务
import { RouteView } from '../layouts'
const TaskManage = resolve => require(['../views/TaskManage/TaskManage.vue'], resolve)
const AddTask = resolve => require(['../views/TaskManage/AddTask.vue'], resolve)
const TaskDetails = resolve => require(['../views/TaskManage/TaskDetails.vue'], resolve)
const taskManage = {
  path: '/taskManage',
  name: 'taskManage',
  component: RouteView,
  meta: {
    title: '招生任务'
  },
  children: [
    {
      path: '/taskManage',
      name: 'taskManage',
      component: TaskManage,
      meta: {
        title: '招生任务'
      }
    },
    {
      path: '/taskManage/addTask',
      name: 'addTask',
      component: AddTask,
      meta: {
        title: '添加任务',
        isHide: true
      }
    },
    {
      path: '/taskManage/taskDetails',
      name: 'taskDetails',
      component: TaskDetails,
      meta: {
        title: '任务详情',
        isHide: true
      }
    }
  ]
}

export default taskManage
