<template>
  <a-modal
    width="1200px"
    :title="title"
    v-model="status"
    @ok="submitOk"
    :maskClosable="false"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
  >
    <no-data v-if="noData" msg="暂无数据，请去发布对象添加设备~"></no-data>
    <div v-else>
      <div class="choose-user qui-fx">
        <div class="qui-fx-ver qui-fx-f1">
          <table-list
            is-check
            :scroll-h="500"
            :page-list="pageList"
            v-model="chooseList"
            :columns="columns"
            @clickRow="clickRow"
            @selectAll="selectAll"
            :table-list="tableList"
          >
            <template
              v-slot:other2="record"
            >{{ record.record.gradeName }}{{ record.record.className }}</template>
          </table-list>
          <page-num
            :jumper="false"
            v-model="pageList"
            :mar-top="20"
            :mar-bot="0"
            size="small"
            :total="total"
            @change-page="showList"
          ></page-num>
        </div>
        <div class="user-box qui-fx-ver">
          <div class="title qui-fx-jsb">
            <span>已选择</span>
            <span>{{ totalList.length }}个</span>
          </div>
          <div class="qui-fx-f1" style="overflow: auto">
            <ul>
              <li
                v-for="(item, index) in totalList"
                :key="item.deviceSn"
                class="qui-fx-jsb qui-fx-ac"
              >
                <span>{{ item.gradeName }}{{ item.className }}</span>
                <a-tag @click="delUser(item.deviceSn, index)" color="#f50">删除</a-tag>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="qui-fx-ver qui-fx-f1">
        <a-form :form="form">
          <a-form-item label="选择全屏展示的时间：" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
            <a-range-picker
              v-decorator="[
                'time',
                {initialValue: [appForm.startTime, appForm.endTime ], rules: [{ required: true, message: '请选择时间' }]}
              ]"
              :showTime="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              @change="onChange"
              @ok="onOk"
            />
          </a-form-item>
        </a-form>
      </div>
    </div>
  </a-modal>
</template>

<script>
import SearchForm from '@c/SearchForm'
import NoData from '@c/NoData'
import PageNum from '@c/PageNum'
import TableList from '@c/TableList'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import 'moment/locale/zh-cn'
const columns = [
  {
    title: '序号',
    width: '25%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '绑定场地',
    dataIndex: 'placeName',
    width: '25%'
  },
  {
    title: '安装位置',
    dataIndex: 'site',
    width: '25%',
    customRender: (text) => {
      return parseInt(text) === 1 ? '室内' : '室外'
    }
  },
  {
    title: '关联数据',
    dataIndex: 'className',
    width: '25%',
    scopedSlots: {
      customRender: 'other2'
    }
  }
]
export default {
  name: 'ChooseSubteacher',
  components: {
    PageNum,
    TableList,
    NoData,
    SearchForm
  },
  props: {
    isCheck: {
      type: Boolean,
      default: true
    },
    chooseType: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    deviceList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    ...mapState('home', ['userInfo']),
    status: {
      get() {
        return this.value
      },
      set() {
        this.$emit('input', false)
      }
    }
  },
  data() {
    return {
      confirmLoading: false,
      noData: false,
      chooseList: [],
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      columns,
      searchList: {},
      tableList: [],
      totalList: [],
      buildList: [],
      classList: [],
      form: this.$form.createForm(this),
      appForm: {}
    }
  },
  created() {
    this.deviceList.forEach((item) => {
      this.chooseList.push(item.deviceSn)
      this.totalList.push({
        ...item,
        id: item.deviceSn
      })
    })
    this.showList()
  },
  async mounted() {},
  methods: {
    ...mapActions('home', ['getSiteList', 'getChildSite', 'getClassCardList', 'getGradeData', 'getClassData']),
    async onFocus(value) {
      this.buildList = []
      const req = {
        name: '',
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getSiteList(req)
      this.buildList = res.data
      this.buildList.forEach((el) => {
        el.label = el.name
        el.value = el.id
        el.isLeaf = false
      })
    },
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      const req = {
        parentId: targetOption.id,
        schoolCode: this.userInfo.schoolCode
      }
      this.getChildSite(req).then((res) => {
        targetOption.loading = false
        targetOption.children = res.data.list
        // 处理第三层没有子节点的情况
        targetOption.children.forEach((el) => {
          el.label = el.name + (el.type === '2' ? '楼' : '')
          el.value = el.id
          el.isLeaf = el.type === '3'
        })
        targetOption.children.unshift({
          label: '全部',
          value: ''
        })
        this.buildList = [...this.buildList]
      })
    },
    async classOnFocus(value) {
      this.classList = []
      const req = {
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getGradeData(req)
      this.classList = res.data.list
      this.classList.forEach((el) => {
        el.label = el.name
        el.value = el.code
        el.isLeaf = false
      })
    },
    classLoadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      const req = {
        gradeCode: targetOption.code,
        schoolCode: this.userInfo.schoolCode,
        schoolYearId: this.schoolYearId
      }
      this.getClassData(req).then((res) => {
        targetOption.loading = false
        targetOption.children = res.data.list
        targetOption.children.forEach((el) => {
          el.label = el.className
          el.value = el.classCode
          el.isLeaf = true
        })
        targetOption.children.unshift({
          label: '全部',
          value: ''
        })
        this.classList = [...this.classList]
      })
    },
    async showList() {
      const req = {
        ...this.pageList,
        schoolCode: this.userInfo.schoolCode,
        ...this.searchList,
        placeId: this.searchList.places ? this.searchList.places.join(',') : undefined,
        gradeCode: this.searchList.classes ? this.searchList.classes[0] : undefined,
        classCode: this.searchList.classes ? this.searchList.classes[1] : undefined,
        bindStatus: '1'
      }
      const res = await this.getClassCardList(req)
      if (!res.data) {
        return
      }
      this.tableList = res.data.list.map((el) => {
        return {
          ...el,
          id: el.deviceSn
        }
      })
      this.total = res.data.total
    },
    searchForm(values) {
      this.searchList = values
      this.showList()
    },
    reset() {
      this.confirmLoading = false
      this.$emit('input', false)
    },
    resetBtn() {
      this.keyword = ''
      this.deviceType = ''
      this.getControlList()
    },
    error() {
      this.confirmLoading = false
    },
    delUser(id, index) {
      this.totalList.splice(index, 1)
      this.chooseList.splice(this.chooseList.indexOf(id), 1)
    },
    selectAll(item, type) {
      if (type) {
        this.totalList = this.totalList.concat(item)
      } else {
        item.forEach((item) => {
          const index = this.totalList.findIndex((list) => {
            return list.deviceSn === item.deviceSn
          })
          this.totalList.splice(index, 1)
        })
      }
    },
    // 监听选中或取消
    clickRow(item, type) {
      console.log(item)
      if (type) {
        if (this.isCheck) {
          this.totalList.push(item)
          console.log(this.totalList)
        } else {
          this.totalList = [item]
        }
      } else {
        const index = this.totalList.findIndex((list) => list.deviceSn === item.deviceSn)
        this.totalList.splice(index, 1)
      }
    },
    onChange (value, dateString) {
      this.appForm.startTime = dateString[0]
      this.appForm.endTime = dateString[1]
    },
    onOk (value) {
      this.appForm.startTime = moment(value[0]).format('YYYY-MM-DD HH:mm')
      this.appForm.endTime = moment(value[1]).format('YYYY-MM-DD HH:mm')
    },
    submitOk() {
      if (this.totalList.length === 0) {
        this.$message.warning('请选择设备')
        return
      }
      if (!this.appForm.startTime || !this.appForm.endTime) {
        this.$message.warning('请选择全屏展示的时间')
        return
      }
      this.confirmLoading = true
      this.$emit('submit', this.totalList, this.appForm)
    }
  }
}
</script>

<style lang="less" scoped>
.choose-user {
  height: 600px;
  .org-box {
    width: 200px;
  }
  .user-box {
    border: 1px #f5f5f5 solid;
    margin-left: 15px;
    width: 200px;
    .title {
      padding: 0 10px;
      background-color: #f5f5f5;
      height: 41px;
      line-height: 41px;
      border-bottom: 1px #f5f5f5 solid;
    }
    li {
      border-bottom: 1px #f5f5f5 solid;
      padding: 6px 0px 6px 8px;
    }
  }
}
/deep/ .ant-modal-body {
  padding: 14px;
}
</style>
