const Subject = resolve => require(['../views/subject/Subject.vue'], resolve)
const subject = {
  path: '/subject',
  name: 'subject',
  component: Subject,
  meta: {
    title: '学科管理'
  }
}

export default subject
