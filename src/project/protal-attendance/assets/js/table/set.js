const set = {
  columns: [
    {
      title: '工作日',
      align: 'center',
      dataIndex: 'weekDay'
    },
    {
      title: '考勤时间',
      align: 'center',
      scopedSlots: {
        customRender: 'action'
      }
    },
    {
      title: '操作',
      align: 'center',
      scopedSlots: {
        customRender: 'other1'
      }
    }
  ],
  deviceColumns: [
    {
      title: '序号',
      width: '8%',
      scopedSlots: {
        customRender: 'index'
      },
      align: 'center'
    },
    {
      title: '安装位置',
      dataIndex: 'snapSite',
      width: '20%',
      align: 'center'
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      width: '30%',
      align: 'center'
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      width: '12%',
      customRender: text => {
        return parseInt(text) === 1 ? '相机' : '面板机'
      },
      align: 'center'
    },
    {
      title: '操作',
      width: '20%',
      scopedSlots: {
        customRender: 'action'
      }
    }
  ],
  stuDeviceColumns: [
    {
      title: '序号',
      width: '15%',
      scopedSlots: {
        customRender: 'index'
      },
      align: 'center'
    },
    {
      title: '安装位置',
      dataIndex: 'snapSite',
      width: '25%',
      align: 'center'
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      width: '25%',
      align: 'center'
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      width: '15%',
      customRender: text => {
        return parseInt(text) === 1 ? '相机' : '面板机'
      },
      align: 'center'
    },
    {
      title: '用途',
      dataIndex: 'id',
      width: '20%',
      scopedSlots: {
        customRender: 'action'
      },
      align: 'center'
    }
  ],
  specialColumns: [
    {
      title: '日期',
      align: 'center',
      dataIndex: 'current'
    },
    {
      title: '考勤时间',
      align: 'center',
      scopedSlots: {
        customRender: 'action'
      }
    },
    {
      title: '操作',
      align: 'center',
      scopedSlots: {
        customRender: 'other1'
      }
    }
  ]
}
export default set
