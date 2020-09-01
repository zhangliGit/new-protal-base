const BaseData = {
  // 获取住读和走读
  hasDorm(text) {
    const type = parseInt(text)
    if (type === 1) {
      return '住读'
    } else if (type === 0) {
      return '走读'
    } else {
      return '未知'
    }
  },
  // 获取性别
  getSex(text) {
    const sex = parseInt(text)
    if (sex === 1) {
      return '男'
    } else if (sex === 2) {
      return '女'
    } else {
      return '未知'
    }
  },
  // 审批状态
  getState(text) {
    const index = parseInt(text)
    if (index === 0) {
      return '待审批'
    } else if (index === 1) {
      return '审批通过'
    } else if (index === 2) {
      return '审批不通过'
    } else if (index === 3) {
      return '撤销'
    } else if (index === 4) {
      return '失效'
    }
  },
  // 业务类型类型
  busTypeName(type) {
    let name
    switch (parseInt(type)) {
      case 1:
        name = '数据回写'
        break
      case 2:
        name = '数据效验'
        break
      default:
        name = '其他'
        break
    }
    return name
  },
  // 进出标识
  inOrOut(type) {
    let name
    switch (parseInt(type)) {
      case 1:
        name = '进'
        break
      case 2:
        name = '出'
        break
      case 3:
        name = '--'
        break
      default:
        name = '--'
        break
    }
    return name
  },
  // 人员类型
  getPersonType(text) {
    const type = parseInt(text)
    if (type === 1) {
      return '超级管理员'
    } else if (type === 2) {
      return '管理员'
    } else if (text === 8) {
      return '学生'
    } else if (type === 4) {
      return '教职工'
    } else if (type === 16) {
      return '家长'
    } else if (type === 32) {
      return '访客'
    } else {
      return '陌生人'
    }
  },
  // 获取设备类型
  deviceTypeName(text) {
    const type = parseInt(text)
    if (type === 1) {
      return '相机'
    } else if (type === 2) {
      return '面板机'
    } else {
      return '未知'
    }
  }
}

export default BaseData
