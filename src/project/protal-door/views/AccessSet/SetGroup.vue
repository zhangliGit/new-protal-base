<template>
  <div class="set-group page-layout qui-fx-ver">
    <choose-control
      ref="chooseUser"
      is-check
      v-model="userTag"
      :schoolCode="userInfo.schoolCode"
      @submit="chooseUser"
      title="添加控制组">
    </choose-control>
    <a-form :form="form">
      <a-form-item label="权限组名称" :label-col="{ span: 3 }" :wrapper-col="{ span: 15 }">
        <a-input
          placeholder="请输入权限组名称"
          v-decorator="['name', { rules: [{ required: true, message: '请输入权限组名称' }] }]"
        />
      </a-form-item>
      <a-form-item label="通行时间" :label-col="{ span: 3 }" :wrapper-col="{ span: 15 }" :required="true">
        <a-table
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :columns="columns"
          :dataSource="data"
          :bordered="true"
          :pagination="false"
          class="table"
        >
          <template slot="action" slot-scope="text, record">
            <div v-if="record.accessTimeList.length > 0">
              <div class="action qui-fx-jsb qui-fx-ac" v-for="(item, i) in record.accessTimeList" :key="i">
                <div class="left">
                  <template>
                    <a-time-picker format="HH:mm" :defaultValue="moment(item.startTime, 'HH:mm')" @change="(val,dateStrings)=>changeTime(val,dateStrings,'startTime',record.id, i)" />
                    <span>至</span>
                    <a-time-picker format="HH:mm" :disabledHours="(val)=>getDisabledHours(val,record.id, i)" :disabledMinutes="(val)=>getDisabledMinutes(val,record.id, i)" :defaultValue="moment(item.endTime, 'HH:mm')" @change="(val,dateStrings)=>changeTime(val,dateStrings,'endTime',record.id, i)" />
                  </template>
                </div>
                <div class="right qui-fx">
                  <img v-if="item.canAdd" :src="addImg" alt="" @click="addAccessTime(i, record.id)" />
                  <img :src="deleteImg" alt="" @click="deleteAccessTime(i, record.id)" />
                </div>
              </div>
            </div>
            <div v-else>
              <img :src="addImg" alt="" @click="addAccessTime(0, record.key)" />
            </div>
          </template>
        </a-table>
      </a-form-item>
      <a-form-item label="通行设备" :label-col="{ span: 3 }" :wrapper-col="{ span: 15 }" :required="true">
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
import { mapState, mapActions } from 'vuex'
import ChooseControl from '@c/ChooseControl'
import DeleteTag from '@c/DeleteTag'
import addImg from '../../assets/img/add.png'
import deleteImg from '../../assets/img/delete.png'
import deleImg from '../../assets/img/dele.png'

const columns = [
  {
    title: '工作日',
    dataIndex: 'weekDay',
    align: 'center'
  },
  {
    title: '通行时间',
    dataIndex: 'accessTime',
    align: 'center',
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
      addImg,
      deleImg,
      deleteImg,
      userTag: false,
      columns,
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
      form: this.$form.createForm(this),
      groupList: []
    }
  },
  created() {
    this.data.forEach(ele => {
      ele.accessTimeList = [{ startTime: '00:00', endTime: '23:59', canAdd: true }]
    })
  },
  methods: {
    ...mapActions('home', ['addGroup']),
    // 提交权限组
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          console.log(this.data)
          console.log(this.groupList)
          console.log(this.selectedRowKeys)
          const timeRuleList = []
          this.data.forEach(ele => {
            timeRuleList.push({
              dayName: ele.key,
              startTime: ele.accessTimeList[0].startTime ? ele.accessTimeList[0].startTime : null,
              endTime: ele.accessTimeList[0].endTime ? ele.accessTimeList[0].endTime : null
            })
          })
          const controlGroupList = []
          this.groupList.forEach(ele => {
            controlGroupList.push({
              controlGroupCode: ele.code,
              controlGroupName: ele.name,
              controlGroupType: ele.type
            })
          })
          const req = {
            controlGroupList,
            ruleGroupName: values.name,
            timeRuleList,
            schoolCode: this.userInfo.schoolCode,
            ruleGroupType: this.$route.query.type === 'teacher' ? 1 : 2
          }
          console.log(req)
          this.addGroup(req).then(res => {
            this.$message.success('添加成功')
            const path = this.$route.query.type === 'teacher' ? '/teacherAccessSet' : '/studentAttendanceSet'
            this.$router.push({ path })
          })
        }
      })
    },
    // 通行日期选择
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
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
    // 移除通行设备
    delControl(index) {
      this.groupList.splice(index, 1)
    },
    // 添加通行时间
    addAccessTime(index, id) {
      this.data[id].accessTimeList.forEach(ele => {
        ele.canAdd = false
      })
      this.data[id].accessTimeList.push({ startTime: '00:00', endTime: '23:59', canAdd: true })
    },
    // 移除通行时间
    deleteAccessTime(index, id) {
      this.data[id].accessTimeList.splice(index, 1)
      if (this.data[id].accessTimeList.length > 0) {
        this.data[id].accessTimeList[this.data[id].accessTimeList.length - 1].canAdd = true
      }
    },
    // 选择通行时间
    timeChange(time) {
      console.log(time)
    },
    cancle() {
      const path = this.$route.query.type === 'teacher' ? '/teacherAccess' : '/studentAccess'
      this.$router.push({ path })
    }
  }
}
</script>

<style lang="less" scoped>
.set-group {
  background: #fff;
  padding-top: 20px;
  .table {
    max-height: 380px;
    overflow: auto;
  }
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
