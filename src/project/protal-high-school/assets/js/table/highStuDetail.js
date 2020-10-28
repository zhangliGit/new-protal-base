import Tools from '@u/tools'
const highStuDetail = {
  columns: [
    {
      title: '序号',
      width: '10%',
      scopedSlots: {
        customRender: 'index'
      }
    },
    {
      title: '家长姓名',
      dataIndex: 'parentName',
      width: '10%'
    },
    {
      title: '家长电话',
      dataIndex: 'mobile',
      width: '20%'
    },
    {
      title: '亲属关系',
      dataIndex: 'relationship',
      width: '20%',
      customRender: (text) => {
        return Tools.relationship(text)
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      width: '20%',
      customRender: (text) => {
        return Tools.getDate(text, 1)
      }
    },
    {
      title: '是否主要家长',
      dataIndex: 'hasMainParent',
      width: '20%',
      scopedSlots: {
        customRender: 'other1'
      }
    }
  ],
  changeColumns: [
    {
      title: '序号',
      width: '20%',
      scopedSlots: {
        customRender: 'index'
      }
    },
    {
      title: '异动类型',
      dataIndex: 'type',
      width: '20%',
      customRender: (text) => {
        switch (parseInt(text)) {
          case 1:
            return '入学'
          case 2:
            return '移出班级'
          case 3:
            return '加入班级'
          case 4:
            return '休学'
          case 5:
            return '退学'
          case 6:
            return '复学'
          case 7:
            return '升级'
          case 8:
            return '毕业'
          case 9:
            return '转班'
        }
      }
    },
    {
      title: '异动前',
      dataIndex: 'oldClassName',
      width: '20%',
      scopedSlots: {
        customRender: 'other1'
      }
    },
    {
      title: '异动后',
      dataIndex: 'newClassName',
      width: '20%',
      scopedSlots: {
        customRender: 'other2'
      }
    },
    {
      title: '异动时间',
      dataIndex: 'createTime',
      width: '20%',
      customRender: (text) => {
        return Tools.getDate(text)
      }
    } /* ,
    {
      title: '操作人',
      dataIndex: 'optName',
      width: '15%'
    } */
  ],
  dormColumns: [
    {
      title: '序号',
      width: '20%',
      scopedSlots: {
        customRender: 'index'
      }
    },
    {
      title: '调宿类型',
      dataIndex: 'status',
      width: '20%',
      customRender: (text) => {
        switch (parseInt(text)) {
          case 1:
            return '入住'
          case 2:
            return '退宿'
          case 3:
            return '调宿'
        }
      }
    },
    {
      title: '调宿前',
      dataIndex: 'oldBuildingName',
      width: '20%'
    },
    {
      title: '调宿后',
      dataIndex: 'newBuildingName',
      width: '20%'
    },
    {
      title: '调宿时间',
      dataIndex: 'updateTime',
      width: '20%',
      customRender: (text) => {
        return Tools.getDate(text)
      }
    } /* ,
    {
      title: '操作人',
      dataIndex: 'optName',
      width: '15%'
    } */
  ],
  statusList: [
    {
      name: '在读',
      key: '1'
    },
    {
      name: '休学',
      key: '2'
    },
    {
      name: '退学',
      key: '3'
    },
    {
      name: '复学',
      key: '4'
    }
  ]
}
export default highStuDetail
