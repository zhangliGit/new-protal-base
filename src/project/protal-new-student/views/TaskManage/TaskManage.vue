<template>
  <div class="home page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button icon="plus" class="add-btn" @click.stop="addTask('0')">添加</a-button>
      </div>
    </search-form>
    <table-list isZoom :page-list="pageList" :columns="columns" :table-list="taskList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="查看">
          <a-button
            size="small"
            class="detail-action-btn"
            icon="ellipsis"
            @click.stop="addTask('1', action.record)"
          ></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="deleteList(action.record)">
          <template slot="title">
            确定删除吗?
          </template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import SignRecord from '../../component/siteBooking/SignRecord'
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
// import Tools from '@u/tools'
const columns = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '任务名称',
    dataIndex: 'taskName',
    width: '20%'
  },
  {
    title: '年级',
    dataIndex: 'grade',
    width: '10%'
  },
  {
    title: '招生专业',
    dataIndex: 'subject',
    width: '15%'
  },
  {
    title: '招生人数',
    dataIndex: 'stuCount',
    width: '10%'
  },
  {
    title: '截止时间',
    dataIndex: 'endTIime',
    width: '20%'
  },
  {
    title: '二维码',
    dataIndex: 'code',
    width: '15%',
    scopedSlots: {
      customRender: 'codePic'
    }
  },
  {
    title: '操作',
    width: '10%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const searchLabel = [
  {
    value: 'taskName',
    type: 'input',
    label: '任务名称',
    placeholder: '请输入任务名称'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '1',
        val: '2020-2021'
      },
      {
        key: '2',
        val: '2019-2020'
      },
      {
        key: '3',
        val: '2018-2019'
      }
    ],
    value: 'grade',
    type: 'select',
    label: '学年'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '1',
        val: '已发布'
      },
      {
        key: '2',
        val: '草稿'
      }
    ],
    value: 'status',
    type: 'select',
    label: '状态'
  }
]
export default {
  name: 'TaskManage',
  components: {
    SearchForm,
    PageNum,
    TableList,
    SignRecord
  },
  data() {
    return {
      columns,
      searchLabel,
      searchList: {},
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      taskList: [],
      signTag: false,
      searchObj: {},
      id: 0
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getReserveList', 'delReserve']),
    async showList() {
      const req = {
        ...this.searchObj,
        ...this.pageList,
        schoolCode: this.userInfo.schoolCode,
        type: '1'
      }
      const res = await this.getReserveList(req)
      console.log(res)
      this.taskList = [
        {
          id: 1,
          taskName: '武汉职业技术学院2020-2021软件技术专业招生计划',
          grade: '2020级',
          subject: '软件技术',
          stuCount: 600,
          endTIime: '2020-12-30',
          code: 'http://canpoint-photo.oss-cn-beijing.aliyuncs.com/47801/2020/10/19/base/76b5c10347bf4e5185331bb917b762cb.jpg'
        }
      ]
      // this.taskList = res.data.list
      // this.taskList.map(el => {
      //   el.placeName = el.placeName.replace(/,/g, '-')
      // })
      // this.total = res.data.total
    },
    searchForm(values) {
      console.log(values)
      this.searchObj = {
        startDate: values.rangeTime ? values.rangeTime[0] : undefined,
        endDate: values.rangeTime ? values.rangeTime[1] : undefined,
        status: values.status,
        description: values.description
      }
      this.showList()
    },
    addTask(type, record) {
      if (type !== '0') {
        this.$router.push({ path: '/siteBooking/addTask', query: { id: record.id, type } })
      } else {
        this.$router.push({ path: '/siteBooking/addTask', query: { type } })
      }
    },
    goDetail(record) {
    },
    async deleteList(record) {
      await this.delReserve(record.id)
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showList()
      })
    },
    showRecord(record) {
      this.signTag = true
      this.id = record.id
    }
  }
}
</script>
<style lang="less" scoped></style>
