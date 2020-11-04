<template>
  <div class="page-layout qui-fx goods">
    <div class="page-left">
      <grade-tree @select="select"></grade-tree>
    </div>
    <div class="qui-fx-f1 qui-fx-ver">
      <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
        <div slot="left">
          <a-button class="export-btn" @click="batchClick">批量确认报到</a-button>
        </div>
      </search-form>
      <table-list
        isZoom
        isCheck
        v-model="chooseList"
        :page-list="pageList"
        @selectAll="selectAll"
        :columns="columns"
        :table-list="userList"
      >
        <template v-slot:actions="action">
          <a-tooltip placement="topLeft" title="详情">
            <a-button
              size="small"
              class="detail-action-btn"
              icon="ellipsis"
              @click.stop="detail(action.record.id)"
            ></a-button>
          </a-tooltip>
          <a-tooltip placement="topLeft" title="确认报到">
            <a-button
              size="small"
              class="pair-action-btn"
              icon="check-circle"
              @click.stop="checkClick('single', action.record.id)"
            ></a-button>
          </a-tooltip>
        </template>
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
import GradeTree from '@c/GradeTree'
import UploadMulti from '@c/UploadFace'
const searchLabel = [
  {
    value: 'name',
    type: 'input',
    label: '姓名'
  },
  {
    value: 'idCard',
    type: 'input',
    label: '身份证号'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '0',
        val: '已报到'
      },
      {
        key: '1',
        val: '未报到'
      }
    ],
    value: 'state',
    type: 'select',
    label: '报到状态'
  }
]
const columns = [
  {
    title: '序号',
    width: '5%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '8%'
  },
  {
    title: '年级',
    width: '8%',
    dataIndex: 'grade'
  },
  {
    title: '专业',
    dataIndex: 'project',
    width: '10%'
  },
  {
    title: '班级',
    dataIndex: 'class',
    width: '10%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: '5%'
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    width: '8%'
  },
  {
    title: '报到状态',
    dataIndex: 'mobile',
    width: '8%'
  },
  {
    title: '人脸照片',
    dataIndex: 'photo',
    width: '10%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '操作',
    width: '5%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'StudentManage',
  components: {
    TableList,
    SearchForm,
    PageNum,
    GradeTree,
    UploadMulti
  },
  data() {
    return {
      columns,
      searchLabel,
      pageList: {
        page: 1,
        size: 20
      },
      searchList: {
        schoolCode: ''
      },
      total: 0,
      userList: [],
      chooseList: [],
      totalList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    // this.showList()
    this.userList = [
      {
        id: 1,
        name: '张学良',
        grade: '2020',
        project: '软件工程',
        class: '1班',
        sex: '男',
        idCard: '420333199563632020',
        mobile: '13699996666',
        createTime: 56565656565,
        status: '1',
        photo:
          'http://canpoint-photo.oss-cn-beijing.aliyuncs.com/47801/2020/10/19/base/76b5c10347bf4e5185331bb917b762cb.jpg'
      },
      {
        id: 2,
        name: '张学良',
        grade: '2020',
        project: '软件工程',
        class: '1班',
        sex: '男',
        idCard: '420333199563632020',
        mobile: '13699996666',
        createTime: 56565656565,
        status: '1',
        photo:
          'http://canpoint-photo.oss-cn-beijing.aliyuncs.com/47801/2020/10/19/base/76b5c10347bf4e5185331bb917b762cb.jpg'
      }
    ]
  },
  methods: {
    ...mapActions('home', ['getPageList', 'recordDetail', 'downRecord']),
    async showList(searchObj = {}) {
      this.searchList.schoolCode = this.userInfo.schoolCode
      this.searchList = Object.assign(this.searchList, this.pageList, searchObj)
      const res = await this.getPageList(this.searchList)
      this.userList = res.data.list
      this.total = res.data.total
    },
    searchForm(values) {
      this.pageList.page = 1
      this.dateTime = values.date
      this.state = values.state
      const searchObj = {
        date: values.date,
        state: values.state
      }
      this.showList(searchObj)
    },
    // 去详情
    detail(id) {
      console.log(id)
      this.$router.push({
        path: `/studentManage/studentDetails`,
        query: {
          id
        }
      })
    },
    // 选择树形列表
    select(item) {
      console.log(item)
      // this.pageList.page = 1
      // this.pageList.size = 20
      // if (typeof item.materialTypeId === 'number') {
      //   this.searchList.materialTypeId = item.materialTypeId
      //   this.searchList.materialId = ''
      // } else {
      //   this.searchList.materialId = item.materialTypeId.split('^')[1]
      //   this.searchList.materialTypeId = ''
      // }
      // this.showList()
    },
    // 表格全选
    selectAll(item, type) {
      console.log('2121')
      if (type) {
        this.totalList = this.totalList.concat(item)
      } else {
        item.forEach((item) => {
          const index = this.totalList.findIndex((list) => {
            return list.id === item.id
          })
          this.totalList.splice(index, 1)
        })
      }
    },
    submitForm() {
      if (this.totalList.length === 0) {
        this.$message.warning('请选择学生')
        return
      }
      console.log(this.totalList)
    },
    // 批量报到按钮
    batchClick() {
      if (this.chooseList.length === 0) {
        this.$message.error('请选择学生')
        return
      }
      const ids = this.chooseList.join(',')
      this.checkClick('batch', ids)
    },
    // 报到按钮
    checkClick(type, id) {
      this.$confirm({
        title: '确认报到',
        content: '确定学生已报到吗？',
        onOk: () => {
          if (type === 'single') {
            // 单个报到
            console.log(id)
          } else {
            // 批量报到
            console.log(this.chooseList)
          }
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 2000)
          }).catch(() => console.log('Oops errors!'))
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.goods {
  .page-left {
    background: #fff;
    margin-right: 10px;
    width: 150px;
  }
}
</style>
