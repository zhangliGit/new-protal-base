<template>
  <div class="page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="duty.searchLabel">
      <div slot="left">
        <a-button icon="delete" class="del-btn mar-l10" @click="dels">批量删除</a-button>
      </div>
    </search-form>
    <table-list
      is-check
      :page-list="pageList"
      :columns="duty.columns"
      :table-list="dutyList"
      v-model="chooseList"
      @clickRow="clickRow"
      @selectAll="selectAll"
    >
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="查看">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="goDetail(action.record)"></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del(action)">
          <template slot="title"> 确定删除该巡检区域吗? </template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
      <template v-slot:other1="other1">
        <div :id="other1.record.id"></div>
      </template>
       <template v-slot:other2="other2">
        <a-tag color="cyan" @click="check(other2.record)">{{other2.record.patrolPointNum}} </a-tag>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    <a-modal
      :visible="visible"
      :footer="null"
      centered
      @cancel="visible = false"
      :bodyStyle="bodyStyle"
      width="660px"
      :destroyOnClose="true"
      title="巡查点详情"
    >
      <table-list :columns="duty.inspectColumns" :table-list="inspectList"> </table-list>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import duty from '../../assets/js/table/dutyColumns'
export default {
  name: 'InspectDuty',
  components: {
    TableList,
    PageNum,
    SearchForm
  },
  data() {
    return {
      duty,
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      searchList: {},
      dutyList: [{ id: '1' }],
      chooseList: [],
      visible: false,
      bodyStyle: {
        padding: 0
      },
      inspectList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getDuty', 'delInspect', 'delInspects', 'getDutyPoint']),
    async showList() {
      this.searchList.schoolCode = 'AITEST'
      // this.searchList.schoolCode = this.userInfo.schoolCode
      this.searchList = Object.assign(this.searchList, this.pageList)
      const res = await this.getDuty(this.searchList)
      this.dutyList = res.data.records
      this.total = res.data.total
      res.data.records.map((el,index) => {
        if(el.track.length > 0){
          el.map = new qq.maps.Map(document.getElementById(el.id), {
            center: new qq.maps.LatLng(),
            zoom: 16
          })
          const arr = el.track.map(item => {
            return new qq.maps.LatLng(item.latitude, item.longitude)
          })
          var polyline = new qq.maps.Polyline({
            path: arr,
            strokeColor: '#3385ff',
            strokeWeight: 4,
            map: el.map
          });
        }
      })
    },
    searchForm(values) {
      this.searchList = Object.assign(this.searchList, values)
      this.pageList.page = 1
      this.pageList.size = 20
      this.showList()
    },
    async check(record) {
      console.log('record',record)
      const res = await this.getDutyPoint(record.id)
      this.inspectList = res.data.records
      this.visible = true
    },
    goDetail(record) {
      this.$router.push({
        path: '/inspectDuty/dutyDetail',
        query: {
          id: record.id
        }
      })
    },
    del(record) {
      this.delInspect(record.record.id).then(res => {
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.showList()
          this.chooseList = []
        })
      })
    },
    dels() {
      if (this.chooseList.length === 0) {
        this.$message.warning('请选择要删除的巡检区域')
        return false
      }
      this.$tools.delTip('确定删除选中的巡检区域吗？', () => {
        this.delInspects(this.chooseList).then(res => {
          this.$message.success('操作成功')
          this.$tools.goNext(() => {
            this.showList()
          })
        })
      })
    },
    selectAll(item, type) {
      if (type) {
        this.totalList = this.totalList.concat(item)
      } else {
        item.forEach(item => {
          const index = this.totalList.findIndex(list => {
            return list.id === item.id
          })
          this.totalList.splice(index, 1)
        })
      }
    },
    // 监听选中或取消
    clickRow(item, type) {
      if (type) {
        if (this.isCheck) {
          this.totalList.push(item)
        } else {
          this.totalList = [item]
        }
      } else {
        const index = this.totalList.findIndex(list => list.id === item.id)
        this.totalList.splice(index, 1)
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
