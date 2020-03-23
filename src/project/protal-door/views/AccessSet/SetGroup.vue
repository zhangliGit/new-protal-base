<template>
  <div class="set-group page-layout qui-fx-ver">
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
                    <a-time-picker format="HH:mm" @change="timeChange" v-model="item.startTime" />
                    <span>至</span>
                    <a-time-picker format="HH:mm" @change="timeChange" v-model="item.endTime" />
                  </template>
                </div>
                <div class="right qui-fx">
                  <img v-if="item.canAdd" :src="addImg" alt="" @click="addAccessTime(i, record.key)" />
                  <img :src="deleteImg" alt="" @click="deleteAccessTime(i, record.key)" />
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
    DeleteTag
  },
  data() {
    return {
      moment,
      addImg,
      deleImg,
      deleteImg,
      columns,
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
      form: this.$form.createForm(this),
      groupList: [
        { name: '校大门出摄像组', id: 1 },
        { name: '校大门入摄像组', id: 2 }
      ]
    }
  },
  created() {
    this.data.forEach(ele => {
      ele.accessTimeList = [{ startTime: null, endTime: null, canAdd: true }]
    })
  },
  methods: {
    // 提交权限组
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          console.log(this.data)
          console.log(this.groupList)
          console.log(this.selectedRowKeys)
          console.log(this.data[0].accessTimeList[0].startTime.format('YYYY-MM-DD HH:mm:ss'))
        }
      })
    },
    // 通行日期选择
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    // 添加通行设备
    addGroup() {},
    // 移除通行设备
    delControl() {},
    // 添加通行时间
    addAccessTime(index, key) {
      this.data[key].accessTimeList.forEach(ele => {
        ele.canAdd = false
      })
      this.data[key].accessTimeList.push({ startTime: null, endTime: null, canAdd: true })
    },
    // 移除通行时间
    deleteAccessTime(index, key) {
      this.data[key].accessTimeList.splice(index, 1)
      if (this.data[key].accessTimeList.length > 0) {
        this.data[key].accessTimeList[this.data[key].accessTimeList.length - 1].canAdd = true
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
