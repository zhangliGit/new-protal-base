<template>
  <div class="add-booking page-layout qui-fx-ver">
    <a-form :form="form" :style="{ maxHeight: maxHeight, overflow: 'auto' }">
      <a-form-item label="任务名称" :label-col="{ span: 3 }" :wrapper-col="{ span: 15 }">
        <a-input
          placeholder="请输入任务名称，限50字符"
          :maxLength="50"
          v-decorator="[
            'taskName',
            { initialValue: formData.taskName, rules: [{ required: true, message: '请输入任务名称' }] }
          ]"
          @change="changeTaskName"
        />
      </a-form-item>
      <a-form-item label="年级" :label-col="{ span: 3 }" :wrapper-col="{ span: 15 }" :required="true">
        <a-select
          v-decorator="['grade', { rules: [{ required: true, message: '请选择年级' }] }]"
          placeholder="请选择年级"
          @change="handleChangeGrade"
        >
          <a-select-option v-for="item in options" :key="item.value"> {{ item.label }} </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="招生专业" :label-col="{ span: 3 }" :wrapper-col="{ span: 8 }" :required="true">
        <a-button type="primary" @click="selectProject"> 选择专业 </a-button>
        <a-table :columns="columns" :data-source="selectList" :pagination="false">
          <template slot="inputCount" slot-scope="count, record">
            <a-input :value="count" type="number" @change="(e) => handleChangeCount(e.target.value, record.id)" />
          </template>
        </a-table>
      </a-form-item>
      <a-form-item label="招生截止时间" :label-col="{ span: 3 }" :wrapper-col="{ span: 15 }" :required="true">
        <a-date-picker
          @change="onChangeDate"
          placeholder="年/月/日"
          v-decorator="[
            'endTime',
            { initialValue: formData.endTime, rules: [{ required: true, message: '请选择截止时间' }] }
          ]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 15, offset: 3 }">
        <a-button
          type="primary"
          style="width: 100px; height: 40px; margin-top: 50px"
          @click="handleSubmit"
        >保存</a-button
        >
      </a-form-item>
    </a-form>
    <select-project
      :title="title"
      :visible="showProjectList"
      :projectList="projectList"
      @submit="getProjectList"
      @cancel="cancelProject"
      @clickSelect="clickSelect"
    ></select-project>
  </div>
</template>

<script>
import TableList from '@c/TableList'
import SelectProject from '../../component/SelectProject.vue'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
const columns = [
  {
    title: '专业',
    dataIndex: 'projectName'
  },
  {
    title: '招生人数',
    dataIndex: 'count',
    scopedSlots: {
      customRender: 'inputCount'
    }
  }
]
export default {
  name: 'AddTask',
  components: {
    moment,
    TableList,
    SelectProject
  },
  data() {
    return {
      formData: {
        taskName: '',
        siteName: '请选择年级',
        endTime: moment(new Date(), 'YYYY/MM/DD')
      },
      form: this.$form.createForm(this),
      maxHeight: 0,
      showProjectList: false,
      title: '选择专业',
      grade: '',
      options: [
        {
          value: '2020',
          label: '2020'
        },
        {
          value: '2019',
          label: '2019'
        },
        {
          value: '2018',
          label: '2018'
        }
      ],
      projectList: [
        {
          projectName: '软件技术',
          id: '1',
          checked: false,
          count: 0
        },
        {
          projectName: '软件测试',
          id: '2',
          checked: false,
          count: 0
        },
        {
          projectName: '语文',
          id: '3',
          checked: false,
          count: 0
        },
        {
          projectName: '数学',
          id: '4',
          checked: false,
          count: 0
        },
        {
          projectName: '英语',
          id: '5',
          checked: false,
          count: 0
        },
        {
          projectName: '化学',
          id: '6',
          checked: false,
          count: 0
        },
        {
          projectName: '社会学',
          id: '7',
          checked: false,
          count: 0
        }
      ],
      selectList: [],
      columns
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.maxHeight = window.screen.height - 280 + 'px'
    this.type = this.$route.query.type
    if (this.type !== '0') {
      // this.showData()
    }
  },
  methods: {
    ...mapActions('home', [
      'getSiteList',
      'getChildSite',
      'addReserve',
      'getReserveList',
      'checkReserve',
      'reserveDetail'
    ]),
    handleChangeCount(val, key) {
      if (!key) {
        return
      }
      this.selectList = this.selectList.map((item) => {
        if (item.id === key) {
          return {
            ...item,
            count: Number(val)
          }
        }
        return item
      })
    },
    changeTaskName(e) {
      this.formData.taskName = e.target.value
    },
    handleChangeGrade(val) {
      this.form.setFieldsValue = {
        grade: val
      }
    },
    selectProject() {
      this.showProjectList = true
    },
    getProjectList(list) {
      this.selectList = list
      this.showProjectList = false
    },
    cancelProject() {
      this.showProjectList = false
    },
    clickSelect(id) {
      this.projectList = this.projectList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked
          }
        }
        return item
      })
    },
    onChangeDate() {},
    async showSiteList(type, id) {
      this.siteList = []
      let res = null
      if (type) {
        const req = {
          parentId: id,
          schoolCode: this.userInfo.schoolCode
        }
        res = await this.getChildSite(req)
        res.data = res.data.list
      } else {
        const req = {
          category: id,
          schoolCode: this.userInfo.schoolCode
        }
        res = await this.getSiteList(req)
      }
    },
    // 提交
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.selectList.length === 0) {
            this.$message.error('请选择专业')
            return
          }
          const params = {
            taskName: this.formData.taskName,
            grade: this.form.getFieldValue('grade'),
            endTime: new Date(this.formData.endTime).getTime(),
            projectList: this.selectList.map((item) => {
              return {
                id: item.id,
                count: item.count
              }
            })
          }
          console.log(params)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.add-booking {
  padding-top: 30px;
  img {
    width: 24px;
    height: 24px;
    margin: 0 10px;
    cursor: pointer;
  }
  /deep/ .ant-form-item {
    margin-bottom: 14px;
  }
}
</style>
