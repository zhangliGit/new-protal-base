<template>
  <div class="set-group page-layout qui-fx-ver">
    <choose-control
      ref="chooseUser"
      is-check
      v-model="userTag"
      @submit="chooseUser"
      :schoolCode="userInfo.schoolCode"
      title="添加考勤设备控制组">
    </choose-control>
    <a-form :form="form" :style="{ maxHeight: maxHeight }">
      <a-form-item label="考勤组名称" :label-col="{ span: 3 }" :wrapper-col="{ span: 15 }">
        <a-input
          placeholder="请输入考勤组名称"
          maxLength="15"
          v-decorator="['name', {initialValue: groupName, rules: [{ required: true, message: '请输入考勤组名称' }] }]"
        />
      </a-form-item>
      <a-form-item label="考勤时间" :label-col="{ span: 3 }" :wrapper-col="{ span: 15 }" :required="true">
        <a-table
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :columns="columns"
          :dataSource="data"
          :bordered="true"
          :pagination="false"
          class="table"
        >
          <template slot="action" slot-scope="text, record">
            <div class="action qui-fx-jsa qui-fx-ac" v-for="(item, i) in record.accessTimeList" :key="i">
              <template>
                <a-time-picker format="HH:mm" :defaultValue="moment(item.startTime, 'HH:mm')" @change="(val,dateStrings)=>changeTime(val,dateStrings,'startTime',record.id, i)" />
                <span>至</span>
                <a-time-picker format="HH:mm" :disabledHours="(val)=>getDisabledHours(val,record.id, i)" :disabledMinutes="(val)=>getDisabledMinutes(val,record.id, i)" :defaultValue="moment(item.endTime, 'HH:mm')" @change="(val,dateStrings)=>changeTime(val,dateStrings,'endTime',record.id, i)" />
              </template>
            </div>
          </template>
        </a-table>
      </a-form-item>
      <a-form-item label="考勤设备" :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }" :required="true">
        <div>
          <a-button type="primary" @click="userTag = true">
            添加控制组
          </a-button>
          <div>
            <div v-for="(item, i) in groupList" :key="i" class="control-list">
              <delete-tag @delTag="delControl(i)" :tag-info="item"></delete-tag>
            </div>
          </div>
        </div>
      </a-form-item>
      <!-- <a-form-item label="特殊日期" :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }" :required="true">
        <a-button type="primary" style="margin-bottom:10px">
          从校历选择
        </a-button>
        <a-table
          :rowKey="record => record.id"
          :columns="dateColumns"
          :dataSource="dateData"
          :bordered="true"
          :pagination="false"
          class="table"
        >
          <template slot="index" slot-scope="text, record, index">{{ index | getPageIndex(pageList) }}</template>
          <template slot="action" slot-scope="text, record">
            <template>
              <a-tooltip placement="topLeft" title="删除">
                <a-button
                  size="small"
                  @click="delDate(record)"
                  icon="delete"
                  style="margin-right: 5px; background: #ff4949; color:#fff"
                ></a-button>
              </a-tooltip>
            </template>
          </template>
        </a-table>
      </a-form-item> -->
      <a-form-item :wrapper-col="{ span: 15, offset: 3 }">
        <a-button style="margin-right:50px;" @click="cancle">
          取消
        </a-button>
        <a-button type="primary" @click="handleSubmit">
          保存
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import moment from 'moment'
import DeleteTag from '@c/DeleteTag'
import { mapState, mapActions } from 'vuex'
import ChooseControl from '@c/ChooseControl'
import addImg from '../../assets/img/add.png'
import deleteImg from '../../assets//img/delete.png'
import deleImg from '../../assets/img/dele.png'
const columns = [
  {
    title: '工作日',
    align: 'center',
    dataIndex: 'weekDay'
  },
  {
    title: '上班时间一下班时间',
    dataIndex: 'accessTime',
    align: 'center',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const dateColumns = [
  {
    title: '序号',
    width: '10%',
    align: 'center',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '类型',
    align: 'center',
    width: '10%',
    dataIndex: 'type',
    customRender: text => {
      return text === 1 ? '放假' : '不放假'
    }
  },
  {
    title: '日期',
    align: 'center',
    dataIndex: 'dateTime',
    width: '20%'
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
    width: '20%'
  },
  {
    title: '变更类型',
    align: 'center',
    dataIndex: 'changeType',
    width: '20%',
    customRender: text => {
      return text === 1 ? '考勤' : '不考勤'
    }
  },
  {
    title: '操作',
    align: 'center',
    width: '10%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'SetGroup',
  components: {
    DeleteTag,
    ChooseControl
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  data() {
    return {
      moment,
      userTag: false,
      maxHeight: 0,
      addImg,
      deleImg,
      deleteImg,
      columns,
      dateColumns,
      dateData: [],
      data: [
        {
          key: 2,
          weekDay: '星期一',
          accessTimeList: [],
          id: 0
        },
        {
          key: 3,
          weekDay: '星期二',
          accessTimeList: [],
          id: 1
        },
        {
          key: 4,
          weekDay: '星期三',
          accessTimeList: [],
          id: 2
        },
        {
          key: 5,
          weekDay: '星期四',
          accessTimeList: [],
          id: 3
        },
        {
          key: 6,
          weekDay: '星期五',
          accessTimeList: [],
          id: 4
        },
        {
          key: 7,
          weekDay: '星期六',
          accessTimeList: [],
          id: 5
        },
        {
          key: 1,
          weekDay: '星期日',
          accessTimeList: [],
          id: 6
        }
      ],
      formLayout: 'horizontal',
      selectedRowKeys: [],
      pageList: {
        page: 1,
        size: 20
      },
      form: this.$form.createForm(this),
      groupList: [],
      groupId: '',
      detailData: null,
      groupName: ''
    }
  },
  created() {
    this.maxHeight = window.screen.height - 280 + 'px'
    this.groupId = this.$route.query.id
    if (this.$route.query.type === 'student') {
      this.columns[1].title = '上学时间一放学时间'
    }
    if (this.groupId) {
      this.showData()
    } else {
      this.data.forEach(ele => {
        ele.accessTimeList = [{ startTime: '00:00', endTime: '00:00', canAdd: true }]
      })
    }
  },
  filters: {
    // 获取表格索引
    getPageIndex: (val, obj) => {
      if (JSON.stringify(obj) === '{}') {
        return val + 1
      } else {
        return (obj.page - 1) * obj.size + val + 1
      }
    }
  },
  async mounted() {
    /* this.showList() */
  },
  methods: {
    ...mapActions('home', ['addAccess', 'getAccessDetail', 'updateAccess']),
    /*     async showList() {  //校历
      const req = {
        systemCode: this.userInfo.schoolCode,
        systemName: this.userInfo.schoolName
      }
      const res = await this.getSchoolDate(req)
      this.dateData = res.data.list
    }, */
    // 考勤组表单回填
    async showData() {
      console.log(this.groupId)
      const req = {
        groupId: this.groupId
      }
      const res = await this.getAccessDetail(req)
      if (!res.data) {
        return
      }
      this.detailData = res.data
      console.log(this.detailData)
      this.groupName = res.data.groupName
      res.data.controllerGroups.forEach(ele => {
        this.groupList.push({
          name: ele.name,
          code: ele.code
        })
      })
      this.data.forEach(ele => {
        ele.accessTimeList = [{ startTime: '00:00', endTime: '00:00', canAdd: true }]
      })
      res.data.rules.forEach(item => {
        this.selectedRowKeys.push(parseInt(item.dayName))
        if (item.dayName === '1') {
          this.data[6].accessTimeList[0] = { startTime: item.startTime, endTime: item.endTime, canAdd: true }
        } else {
          this.data[parseInt(item.dayName) - 2].accessTimeList[0] = { startTime: item.startTime, endTime: item.endTime, canAdd: true }
        }
      })
      console.log(this.selectedRowKeys)
    },
    // 提交权限组
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          console.log(this.data)
          console.log(this.groupList)
          console.log(this.selectedRowKeys)
          if (this.selectedRowKeys.length === 0) {
            this.$message.warning('请勾选考勤时间')
            return
          }
          if (this.groupList.length === 0) {
            this.$message.warning('请添加考勤设备')
            return
          }
          // console.log(this.data[0].accessTimeList[0].startTime.format('YYYY-MM-DD HH:mm:ss'))
          const rules = []
          const weeks = []
          this.selectedRowKeys.forEach(item => {
            var id = 1
            if (item === 1) {
              id = 6
            } else {
              id = item - 2
            }
            weeks.push(this.data[id])
          })
          weeks.forEach(ele => {
            rules.push({
              dayName: ele.key,
              startTime: ele.accessTimeList[0].startTime ? ele.accessTimeList[0].startTime : '00:00',
              endTime: ele.accessTimeList[0].endTime ? ele.accessTimeList[0].endTime : '00:00'
            })
          })
          let result = true
          rules.forEach(eve => {
            if ((eve.startTime.split(':')[0] * 60 + eve.startTime.split(':')[1]) >= (eve.endTime.split(':')[0] * 60 + eve.endTime.split(':')[1])) {
              result = false
            }
          })
          if (!result) {
            this.$message.warning('考勤开始时间不能晚于结束时间')
            return
          }
          const req = {
            controllerGroups: this.groupList,
            groupName: values.name,
            rules,
            schoolCode: this.userInfo.schoolCode,
            type: this.$route.query.type === 'teacher' ? 1 : 2
          }
          console.log(req)
          const path = this.$route.query.type === 'teacher' ? '/teacherAccessSet' : '/studentAttendanceSet'
          if (this.groupId) {
            req.id = this.groupId
            this.updateAccess(req).then(res => {
              this.$message.success('编辑成功')
              this.$tools.goNext(() => {
                this.$router.push({ path })
              })
            })
          } else {
            this.addAccess(req).then(res => {
              this.$message.success('添加成功')
              this.$tools.goNext(() => {
                this.$router.push({ path })
              })
            })
          }
        }
      })
    },
    changeTime (val, dateStrings, type, id, index) {
      if (type === 'startTime') {
        this.data[id].accessTimeList[index].startTime = dateStrings
      } else {
        this.data[id].accessTimeList[index].endTime = dateStrings
      }
    },
    getDisabledHours (val, id, index) {
      const hours = []
      const time = this.data[id].accessTimeList[index].startTime
      const timeArr = time.split(':')
      for (var i = 0; i < parseInt(timeArr[0]); i++) {
        hours.push(i)
      }
      return hours
    },
    getDisabledMinutes (selectedHour, id, index) {
      const time = this.data[id].accessTimeList[index].startTime
      const timeArr = time.split(':')
      const minutes = []
      if (selectedHour === parseInt(timeArr[0])) {
        for (var i = 0; i < parseInt(timeArr[1]); i++) {
          minutes.push(i)
        }
      }
      return minutes
    },
    // 添加考勤设备
    chooseUser (value) {
      this.userTag = false
      this.$refs.chooseUser.reset()
      this.groupList = []
      value.forEach(ele => {
        this.groupList.push({
          name: ele.controlGroupName,
          id: ele.id,
          code: ele.controlGroupCode,
          type: ele.controlGroupType
        })
      })
      console.log(this.groupList)
    },
    // 考勤日期选择
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    // 添加考勤时间
    addAccessTime(index, key) {
      this.data[key].accessTimeList.push({ startTime: null, endTime: null })
    },
    // 移除考勤设备
    delControl(index) {
      this.groupList.splice(index, 1)
    },
    // 删除特殊日期
    delDate(record) {
      this.$tools.delTip('确定删除吗?', () => {
        console.log(record.id)
      })
    },
    cancle() {
      const path = this.$route.query.type === 'teacher' ? '/teacherAccessSet' : '/studentAttendanceSet'
      this.$router.push({ path })
    }
  }
}
</script>

<style lang="less" scoped>
.set-group {
  background: #fff;
  padding-top: 20px;
  overflow: auto;
  .action {
    margin: 5px 0;
    span {
      margin: 0 5px;
    }
    .right {
      img {
        width: 24px;
        height: 24px;
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }
  .control-list {
    display: inline-block;
    margin: 0 10px 10px 0;
    line-height: 25px;
  }
}
</style>
