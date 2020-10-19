<template>
  <div class="exercise page-layout qui-fx-ver">
    <!-- <div class="content pos-box bg-fff"> -->
    习题
    <div class="u-padd-10 u-padd-l20 u-padd-t40 ">
      <div class="u-fx-ac">
        <a-button class="mar-l10" type="primary" @click="addExercises">添加课堂习题</a-button>
        <a-button class="mar-l10" type="primary" @click="delExercisesAll">批量删除</a-button>
        <div>总分：<span>10</span>分</div>
      </div>
      <table-list
        is-check
        is-zoom
        v-model="chooseList"
        @selectAll="selectAll"
        :page-list="pageList"
        :columns="exerciseColumns"
        :table-list="findList">
        <template v-slot:actions="action">
          <a-tooltip placement="topLeft" title="预览">
            <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="preview(action.record)"></a-button>
          </a-tooltip>
          <a-tooltip placement="topLeft" title="编辑" >
            <a-button size="small" class="user-action-btn" icon="form" @click="add(1,action.record)"></a-button>
          </a-tooltip>
          <a-popconfirm
            placement="topLeft"
            ok-text="确定"
            cancel-text="取消"
            @confirm="delBatch(action.record)">
            <template slot="title">
              确定删除该任务吗？
            </template>
            <a-tooltip placement="topLeft" title="删除">
              <a-button size="small" class="del-action-btn" icon="delete" ></a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </table-list>
      <!-- <page-num v-model="pageList" :total="total" @change-page="showList"></page-num> -->
      <!-- </div> -->
      <div class="u-tx-c u-mar-t20">
        <a-button type="primary" @click="previous">上一步</a-button>
        <a-button class="mar-l10" type="primary" @click="nextStep">下一步</a-button>
        <a-button class="mar-l10" @click="submitOk" :disabled="isLoad">完成</a-button>
      </div>
    </div>

    <a-modal width="1000px" title="课堂习题列表" v-model="visible" :footer="null" @cancel="close">
      <div class="qui-fx-ver statistic" >
        <search-form is-reset @search-form="searchForm" :search-label="exerciseSearchLabel">
          <div slot="left">
            <a-button icon="del" class="add-action-btn u-mar-l20" @click="delBatchAll">批量添加</a-button>
          </div>
        </search-form>
        <a-table
          :rowKey="(record, index) => index"
          :columns="exerciseListColumns"
          :pagination="false"
          :data-source="exerciseData.records"
          bordered>
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="add(action.record)">添加</a-button>
        </a-table>
        <page-num v-model="exercisePageList" :total="exerciseData.total" @change-page="_pageStatistics"></page-num>
      </div>
    </a-modal>
    {{ visible }}
    <exercise-list v-if="visible"></exercise-list>
  </div>
</template>

<script>
import { exerciseColumns, exerciseListColumns } from '../../../assets/js/tableColumns'
import { exerciseSearchLabel } from '../../../assets/js/searchLabel'
import PageNum from '@c/PageNum'
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
export default {
  name: 'AddTask',
  components: {
    TableList,
    SearchForm,
    PageNum,
    exerciseList: () => import('./exerciseList')
  },
  data() {
    return {
      chooseList: [], // 当有选择项时，被选中的项，返回每项的唯一id
      pageList: {
        page: 1,
        size: 20
      },
      visible: false,
      isLoad: true,
      exerciseColumns,
      exerciseListColumns,
      exerciseSearchLabel,
      findList: [],
      // 习题弹框
      exerciseData: {
        // record: [],
        // total: '20'
      },
      exercisePageList: {
        page: 1,
        size: 5
      }
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  watch: {
  },
  async mounted() {
    this.id = this.$route.query.id
    if (this.id) {
      this.showList()
    }
  },
  methods: {
    ...mapActions('home', [
      'exercisesSearch',
      'exercisesBind'
    ]),
    async showList() {
      const res = await this.exercisesSearch(this.id)
      this.findList = res.data.records
      this.total = res.data.total
    },
    addExercises() {
      this.visible = true
    },
    delExercisesAll() {},
    delBatchAll() {},
    cancel() {
      this.$router.go(-1)
    },
    selectAll() {},
    previous() {
      this.$parent.stepsActive = '2'
    },
    nextStep() {
      this.$parent.stepsActive = '4'
    },
    close() {},
    // 提交
    submitOk(e) {

    },
    // 弹框方法
    searchForm(values) {
      this.searchList = values
      this.showList()
    },
    async  _pageStatistics() {
      const req = {
        ...this.statisticsPageList,
        'id': this.StatisticsId,
        'schoolCode': this.userInfo.schoolCode,
        'source': '1'
      }
      const res = await this.pageStatistics(req)
      this.statisticsData = Object.assign({}, this.statisticsData, res.data)
    }
  }
}
</script>
<style lang="less" scoped>
.task-add {
  background-color: #f5f5fb;
  .content {
    height: calc(100% - 10px);
    overflow-y: scroll;
    .input {
      width: 90%;
      border: 1px dashed #cfcfcf;
    }
   }
}
</style>
