import {
  RouteView
} from '../layouts'
const AssignTask = resolve => require(['../views/safeTask/AssignTask.vue'], resolve)
const MyTask = resolve => require(['../views/safeTask/MyTask.vue'], resolve)
const AddTask = resolve => require(['../views/safeTask/AddTask.vue'], resolve)
const FillTask = resolve => require(['../views/safeTask/FillTask.vue'], resolve)

const task = {
  path: '/task',
  name: 'task',
  component: RouteView,
  meta: {
    title: '安全任务'
  },
  children: [{
      path: '/myTask',
      name: 'myTask',
      component: MyTask,
      meta: {
        title: '我的任务'
      }
    },
    {
      path: '/myTask/fillTask',
      name: 'fillTask',
      component: FillTask,
      meta: {
        title: '任务管理',
        isHide: true
      }
    },
    {
      path: '/assignTask',
      name: 'assignTask',
      component: AssignTask,
      meta: {
        title: '任务下发'
      }
    },
    {
      path: '/assignTask/addTask',
      name: 'addTask',
      component: AddTask,
      meta: {
        title: '下发任务',
        isHide: true
      }
    }
  ]
}

export default task