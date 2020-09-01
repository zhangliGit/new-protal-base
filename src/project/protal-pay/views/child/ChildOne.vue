<template>
  <div class="page-layout qui-fx goods">
    <div class="page-left">
      <grade-tree @select="select"></grade-tree>
    </div>
    <div class="qui-fx-f1 qui-fx-ver">
      <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
        <div slot="left">
          <a-button icon="export" class="export-btn" @click="exportClick">导出</a-button>
          <a-button icon="export" class="export-btn" @click="exportClick">打印数据</a-button>
          </div>
      </search-form>
      <table-list is-check isZoom :page-list="pageList" :columns="columns" :table-list="userList">
        <template v-slot:actions="action">
          <a-tooltip placement="topLeft" title="查看详情">
            <a-button
              size="small"
              class="detail-action-btn"
              icon="ellipsis"
              @click="detail(action.record.id)"
            ></a-button>
          </a-tooltip>
        </template>
        <template v-slot:other5="other5">
          <a-tag :color="$tools.stateTypeColor(other5.record.state)">{{ $tools.stateType(other5.record.state) }}</a-tag>
        </template>
        <template v-slot:other1="other1">
          <div v-if="other1.record.handleTime !== null">{{ other1.record.handleTime | getDate(1) }}</div>
        </template>
        <template v-slot:other2="other2">
          <div v-if="other2.record.materialTypeName !== ''">{{ other2.record.materialTypeName }}</div>
          <div else>{{ other2.record.materialRemark }}</div>
        </template>
        <template v-slot:other3="other3">
          <div v-if="other3.record.materialName !== ''">{{ other3.record.materialName }}</div>
          <div else>{{ other3.record.materialRemark }}</div>
        </template>
      </table-list>
      <a-modal v-model="previewVisible" width="900px" :footer="null">
        <p>
          <a-tag :color="$tools.stateTypeColor(detailList.state)">{{ $tools.stateType(detailList.state) }}</a-tag>
        </p>
        <div style="text-align:center">
          <div style="background-color:#EBEEF5;height:1px;border:none;"></div>
          <div style="min-height:300px;">
            <p style="text-align:left;margin-top:10px;text-indent:30px;" v-if="detailList.materialTypeName != ''">
              报修物品：{{ detailList.materialTypeName }}-{{ detailList.materialName }}
            </p>
            <p style="text-align:left;margin-top:10px;text-indent:30px;" v-else>
              报修物品：{{ detailList.materialRemark }}
            </p>
            <p style="text-align:left;margin-top:10px;text-indent:30px;">物品位置：{{ detailList.placeName }}</p>
            <p style="text-align:left;margin-top:10px;text-indent:30px;">
              上传图片：
              <span v-for="(item, i) in detailList.attachmentList" :key="i">
                <img :src="item.url" style="width: 80px; height: 80px;    margin-left: 10px;" alt="" />
              </span>
            </p>
            <p style="text-align:left;margin-top:10px;text-indent:30px;" v-if="detailList.state === '2'">
              退回原因：{{ detailList.remark }}
            </p>
            <template>
              <a-timeline mode="alternate">
                <a-timeline-item
                  >申请人：{{ detailList.submitUserName }}&nbsp;&nbsp;{{
                    detailList.createTime | getDate(1)
                  }}</a-timeline-item
                >
                <a-timeline-item v-for="(item, index) in detailList.repairApprovalList" :key="index">
                  审批人： {{ item.approvalUserName }}&nbsp;&nbsp;{{ item.createTime | getDate(1)
                  }}{{ $tools.stateType(item.approvalState) }}
                </a-timeline-item>
                <a-timeline-item v-for="(item, index) in detailList.repairCopyList" :key="index">
                  抄送人： {{ item.copyUserName }}&nbsp;&nbsp;{{ item.createTime | getDate(1) }}
                </a-timeline-item>
                <a-timeline-item v-for="(item, index) in detailList.repairStateRecordList" :key="index">
                  处理人： {{ item.handleUserName }}&nbsp;&nbsp;{{ item.createTime | getDate(1)
                  }}{{ $tools.stateType(item.repairState) }}
                </a-timeline-item>
              </a-timeline>
            </template>
          </div>
        </div>
      </a-modal>
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
import Tools from '@u/tools'
const searchLabel = [
  {
    value: 'keyword',
    initValue: '',
    type: 'selectInput',
    selectType: [
      {
        key: 'userName',
        val: '姓名'
      },
      {
        key: 'mobile',
        val: '手机号'
      }
    ],
    placeholder: '请输入'
  },
  {
    value: 'date',
    type: 'singleTime',
    label: '时间'
  },
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: '0',
        val: '待缴费'
      },
      {
        key: '1',
        val: '已缴费'
      },
      {
        key: '3',
        val: '账单关闭'
      },
      {
        key: '3',
        val: '逾时'
      }
    ],
    value: 'state',
    type: 'select',
    label: '订单状态'
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
    title: '账单名称',
    dataIndex: 'materialTypeName',
    width: '8%',
    scopedSlots: {
      customRender: 'other2'
    }
  },
  {
    title: '账单号',
    width: '8%',
    dataIndex: 'materialName',
    scopedSlots: {
      customRender: 'other3'
    }
  },
  {
    title: '学生姓名',
    dataIndex: 'placeName',
    width: '10%'
  },
  {
    title: '班级名称',
    dataIndex: 'createTime',
    width: '8%',
    customRender: text => {
      return Tools.getDate(text)
    }
  },
  {
    title: '家长手机',
    dataIndex: 'submitUserName',
    width: '8%'
  },
  {
    title: '账单金额(元)',
    dataIndex: 'handleUserName',
    width: '8%'
  },
  {
    title: '实缴金额(元)',
    width: '8%',
    scopedSlots: {
      customRender: 'other1'
    }
  },
  {
    title: '报修状态',
    width: '8%',
    scopedSlots: {
      customRender: 'other5'
    }
  },
  {
    title: '账单状态',
    dataIndex: 'repairSource',
    width: '8%',
    customRender: text => {
      if (text === '1') {
        return '公众号'
      } else if (text === '2') {
        return '班牌'
      }
    }
  },
    {
    title: '支付方式',
    width: '8%',
    scopedSlots: {
      customRender: 'other5'
    }
  },
    {
    title: '创建时间',
    width: '8%',
    scopedSlots: {
      customRender: 'other5'
    }
  },{
    title: '缴费时间',
    width: '8%',
    scopedSlots: {
      customRender: 'other5'
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
export default {
  name: 'ChildOne',
  components: {
    TableList,
    SearchForm,
    PageNum,
    GradeTree
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
        schoolCode: '',
        queryType: '0'
      },
      total: 0,
      userList: [],
      previewVisible: false,
      detailList: {},
      dateTime: '',
      state: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
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
    async detail(id) {
      this.previewVisible = true
      const res = await this.recordDetail(id)
      this.detailList = res.data
    },
    select(item) {
      this.pageList.page = 1
      this.pageList.size = 20
      if (typeof item.materialTypeId === 'number') {
        this.searchList.materialTypeId = item.materialTypeId
        this.searchList.materialId = ''
      } else {
        this.searchList.materialId = item.materialTypeId.split('^')[1]
        this.searchList.materialTypeId = ''
      }
      this.showList()
    },
    exportClick() {
      this.searchList.page = 0
      this.searchList.size = 0
      this.downRecord({
        ...this.searchList,
        name: '报修记录'
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
