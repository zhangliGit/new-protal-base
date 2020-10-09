const MachineManage = resolve => require(['../views/consumeManage/MachineManage.vue'], resolve)
const SetMachine = resolve => require(['../views/consumeManage/SetMachine.vue'], resolve)
const consume = [
  {
    path: '/machineManage',
    name: 'machineManage',
    component: MachineManage,
    meta: {
      title: '消费机管理'
    }
  },
  {
    path: '/consume/setMachine',
    name: 'setMachine',
    component: SetMachine,
    meta: {
      title: '设置',
      isHide: true
    }
  }
]

export default consume
