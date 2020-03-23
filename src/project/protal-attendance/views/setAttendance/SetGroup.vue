<template>
  <div class="set-group page-layout qui-fx-ver">
    <a-form :form="form" :style="{ maxHeight: maxHeight }">
      <a-form-item label="考勤组名称" :label-col="{ span: 3 }" :wrapper-col="{ span: 15 }">
        <a-input
          placeholder="请输入考勤组名称"
          v-decorator="['name', { rules: [{ required: true, message: '请输入考勤组名称' }] }]"
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
                <a-time-picker format="HH:mm" @change="timeChange" v-model="item.startTime" />
                <span>至</span>
                <a-time-picker format="HH:mm" @change="timeChange" v-model="item.endTime" />
              </template>
            </div>
          </template>
        </a-table>
      </a-form-item>
      <a-form-item label="考勤设备" :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }" :required="true">
        <div>
          <a-button type="primary" @click="addGroup">
            添加控制组
          </a-button>
          <div>
            <div v-for="(item, i) in groupList" :key="i" class="control-list">
              <delete-tag @delTag="delControl" :tag-info="item"></delete-tag>
            </div>
          </div>
        </div>
      </a-form-item>
      <a-form-item label="特殊日期" :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }" :required="true">
        <a-button type="primary" @click="addGroup" style="margin-bottom:10px">
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
import DeleteTag from '@c/DeleteTag'
import { mapActions } from 'vuex'
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
    DeleteTag
  },
  data() {
    return {
      moment,
      maxHeight: 0,
      addImg,
      deleImg,
      deleteImg,
      columns,
      dateColumns,
      dateData: [],
      data: [
        {
          key: 0,
          weekDay: '星期一',
          accessTimeList: []
        },
        {
          key: 1,
          weekDay: '星期二',
          accessTimeList: []
        },
        {
          key: 2,
          weekDay: '星期三',
          accessTimeList: []
        },
        {
          key: 3,
          weekDay: '星期四',
          accessTimeList: []
        },
        {
          key: 4,
          weekDay: '星期五',
          accessTimeList: []
        },
        {
          key: 5,
          weekDay: '星期六',
          accessTimeList: []
        },
        {
          key: 6,
          weekDay: '星期日',
          accessTimeList: []
        }
      ],
      formLayout: 'horizontal',
      selectedRowKeys: [],
      pageList: {
        page: 1,
        size: 20
      },
      form: this.$form.createForm(this),
      groupList: [
        { name: '一年级教师考勤', id: 1 },
        { name: '二年级教师考勤', id: 2 }
      ]
    }
  },
  created() {
    this.maxHeight = window.screen.height - 280 + 'px'
    this.data.forEach(ele => {
      ele.accessTimeList = [{ startTime: null, endTime: null }]
    })
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
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getTechnicalDate']),
    async showList() {
      const res = await this.getTechnicalDate()
      this.dateData = res.data
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
          // console.log(this.data[0].accessTimeList[0].startTime.format('YYYY-MM-DD HH:mm:ss'))
        }
      })
    },
    // 添加考勤设备
    addGroup() {},
    // 考勤日期选择
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    // 移除考勤设备
    deleEq(index, name) {
      this.$tools.delTip(`确定移除${name}吗?`, () => {
        this.groupList.splice(index, 1)
      })
    },
    // 添加考勤时间
    addAccessTime(index, key) {
      this.data[key].accessTimeList.push({ startTime: null, endTime: null })
    },
    // 移除考勤时间
    delControl() {},
    // 选择考勤时间
    timeChange(time) {
      console.log(time)
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
