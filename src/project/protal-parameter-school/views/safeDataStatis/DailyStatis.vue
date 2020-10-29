<template>
  <div class=" daily-statis qui-fx-ver">
    <div class="content pos-box bg-fff">
      <!-- <a-range-picker
        :placeholder="['Start month', 'End month']"
        format="YYYY-MM"
        :value="value"
        :mode="mode"
        @panelChange="handlePanelChange2"
        @change="handleChange"
      /> -->
      <a-month-picker placeholder="Select month" @change="onChange" />
      <a-month-picker placeholder="Select month" @change="onChange" />
      <!-- <div class="qui-fx qui-fx-jsb" style="width:100%;height:100%" >
        <div class="left u-padd-l30 u-padd-t30 u-padd-b40">
          <grade-tree @select="select" :treeData="treeData"></grade-tree>
        </div>
        <div class="right qui-fx-ver qui-fx-f1" style="padding-right: 10px">
          <search-form is-reset @search-form="searchForm" :search-label="safeClassItemLabel">
          </search-form>
          <table-list
            is-zoom
            v-model="chooseList"
            :page-list="pageList"
            :columns="safeClassItemColumns"
            :table-list="findList">
            <template v-slot:actions="action">
              <a-tooltip placement="topLeft" title="查看">
                <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="preview(action.record)"></a-button>
              </a-tooltip>
              <a-tooltip placement="topLeft" title="使用统计">
                <a-button size="small" class="export-all-btn" icon="export" @click="getStatistics(action.record)"></a-button>
              </a-tooltip>
            </template>
          </table-list>
          <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
        </div>
      </div> -->
      <!-- <a-modal width="600px" title="使用统计" v-model="visible" :footer="null" @cancel="close">
        <div class="qui-fx-ver statistic" v-if="Object.keys(statisticsData).length">
          <div class="number u-mar-b10">使用总数：{{ statisticsData.count }}</div>
          <div class="number u-mar-b20">最近一次使用记录：{{ statisticsData.recent }}</div>
          <a-table
            :rowKey="(record, index) => index"
            :columns="columnsUrl"
            :pagination="false"
            :data-source="statisticsData.records"
            bordered>
            <template slot="index" slot-scope="text, record, index">
              {{ index }}
            </template>
          </a-table>
          <page-num v-model="statisticsPageList" :total="statisticsData.total" @change-page="_pageStatistics"></page-num>
        </div>
      </a-modal> -->
    </div>
  </div>
</template>
<script>
import Tools from '@u/tools'
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
export default {
  name: 'SafeClassItem',
  components: {
    TableList,
    PageNum,
    SearchForm
  },
  data() {
    return {
      mode: ['month', 'month'],
      value: [],
      findList: [],
      chooseList: [], // 当有选择项时，被选中的项，返回每项的唯一id
      searchList: {},
      total: 0,
      treeData: [],
      pageList: {
        page: 1,
        size: 20
      },
      // 使用统计
      visible: false,
      statisticsPageList: {
        page: 1,
        size: 5
      },
      statisticsData: {
        // record: [],
        // total: '20'
      }
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  async mounted() {
    // this.categoryId = ''
    // await this._treeView()
    // await this.showList()
  },
  methods: {
    ...mapActions('home', ['claroomPublicList', 'claroomRemove', 'claroomRemoves', 'treeView', 'statistics', 'pageStatistics']),
    // 月日期选择器
    handleChange(value) {
      // this.value = value
    },
    handlePanelChange2(value, mode) {
      // this.value = value
      // this.mode = [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]]
    },
    onChange(date, dateString) {
      console.log(date, dateString)
    },
    async showList() {
      const req = {
        categoryId: this.categoryId,
        ...this.pageList,
        ...this.searchList
      }
      const res = await this.claroomPublicList(req)
      this.findList = res.data.records
      this.total = res.data.total
    },

    searchForm(values) {
      this.searchList = values
      this.showList()
    },

    // 选中categoryId
    select(id) {
      this.categoryId = id
      this.showList()
    },
    // 查看课堂详情
    preview(record) {
      this.$router.push({
        path: '/safeClassPulic/previewClass',
        query: {
          id: record ? record.id : ''
        }
      })
    },
    // 查看统计
    getStatistics(record) {
      this.visible = true
      this.StatisticsId = record.id
      this.getStatisticsData(record.id)
    },
    // 获取查看统计数据
    async getStatisticsData(id) {
      const req = {
        'id': id,
        'schoolCode': this.userInfo.schoolCode,
        source: '3'
      }
      const res1 = await this.statistics(req)
      this.statisticsData = res1.data
      this._pageStatistics()
    },
    // 统计数据分页table
    async  _pageStatistics() {
      const req = {
        ...this.statisticsPageList,
        'id': this.StatisticsId,
        'schoolCode': this.userInfo.schoolCode,
        source: '3'
      }
      const res = await this.pageStatistics(req)
      this.statisticsData = Object.assign({}, this.statisticsData, res.data)
    },
    // 关闭重置数据
    close() {
      this.visible = false
      this.StatisticsId = ''
      this.statisticsData = {}
    }
  }
}
</script>
<style lang="less" scoped>

</style>
