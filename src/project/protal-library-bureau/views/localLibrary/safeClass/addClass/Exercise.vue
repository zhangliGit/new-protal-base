<template>
  <div class="exercise page-layout qui-fx-ver">
    <!-- <div class="content pos-box bg-fff"> -->
    <div class="u-padd-10 u-padd-l20 u-padd-t40 ">
      <a-row :gutter="[50,100]" type="flex" justify="center" >
        <a-col :span="18" >
          <div class="u-fx-ac u-mar-b10">
            <a-button icon="plus" class="add-action-btn mar-l10" type="primary" @click="addExercises">添加课堂习题</a-button>
            <a-button class="mar-l10" type="primary" @click="delAll">批量删除</a-button>
            <div class="mar-l10">总分：<span>10</span>分</div>
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
              <a-popconfirm
                placement="topLeft"
                ok-text="确定"
                cancel-text="取消"
                @confirm="del(action.record)">
                <template slot="title">
                  确定删除该任务吗？
                </template>
                <a-tooltip placement="topLeft" title="删除">
                  <a-button size="small" class="del-action-btn" icon="delete" ></a-button>
                </a-tooltip>
              </a-popconfirm>
            </template>
          </table-list>
        </a-col>
      </a-row>
      <div class="u-tx-c u-mar-t20">
        <a-button type="primary" @click="previous">上一步</a-button>
        <a-button class="mar-l10" type="primary" @click="nextStep">下一步</a-button>
        <a-button class="mar-l10" @click="carryOut" >完成</a-button>
      </div>
    </div>
    <exercise-list v-model="formStatus"></exercise-list>
    <submit-form
      ref="form"
      title="预览习题"
      v-model="previewStatus"
      :form-data="formData"
    >
    </submit-form>
  </div>
</template>

<script>
import SubmitForm from '@c/SubmitForm'
import { exerciseColumns, exerciseListColumns } from '../../../../assets/js/tableColumns'
import { exerciseSearchLabel } from '../../../../assets/js/searchLabel'
import PageNum from '@c/PageNum'
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
const formData = [
  {
    value: 'topic',
    initValue: [],
    list: [
      {
        key: 1,
        val: '正确'
      },
      {
        key: 2,
        val: '错误'
      }
    ],
    type: 'checkbox',
    label: '是否已婚'
  }
]
export default {
  name: 'AddTask',
  components: {
    TableList,
    SearchForm,
    PageNum,
    SubmitForm,
    exerciseList: () => import('./ExerciseList')
  },
  data() {
    return {
      previewStatus: false,
      formData,
      chooseList: [], // 当有选择项时，被选中的项，返回每项的唯一id
      pageList: {
        page: 1,
        size: 20
      },
      formStatus: false,
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
  async created() {
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
      this.findList = res.data
    },
    addExercises() {
      this.formStatus = true
    },
    // 子组件选择的习题
    sonSelected(record) {
      if (this.findList.length === 0) {
        this.findList = this.findList.concat(record)
      } else {
        const chenckedArr = record.filter(v => this.findList.findIndex(i => i.id === v.id) === -1) // 去重
        this.findList = this.findList.concat(chenckedArr)
      }
    },
    delAll() {
      if (this.chooseList.length <= 0) return this.$message.error('请选择习题')
      const that = this
      this.$confirm({
        title: '提示',
        content: '确定批量删除选中的习题吗?',
        onOk () {
          that.findList = that.findList.filter(v => !that.chooseList.includes(v.id))
        },
        onCancel () {
        }
      })
    },
    del(record) {
      this.findList = this.findList.filter(v => v.id !== record.id)
    },
    // 预览
    preview(record) {
      console.log(record)
      this.previewStatus = true
      const { content, answers } = record
      this.formData[0].label = content
      const initValue = []
      this.formData[0].list = answers.map((el, index) => {
        if (el.selected) {
          initValue.push(index)
        }
        return {
          key: index,
          val: el.option
        }
      })
      this.formData[0].initValue = initValue
    },
    selectAll() {},
    previous() {
      this.$parent.isActive('2')
    },
    // 完成
    carryOut() {
      this.submitOk().then(el => {
        this.$router.push('/safeClassLocal')
      })
    },
    // 下一步
    nextStep() {
      this.submitOk().then(el => {
        this.$parent.isActive('4')
      })
    },
    // 提交
    async submitOk(e) {
      if (this.findList.length === 0) return this.$message.error('请添加习题')
      return new Promise((resolve, reject) => {
        const req = {
          classId: Number(this.id),
          exercisesList: this.findList.map(v => {
            return {
              fraction: v.fraction,
              id: Number(v.id)
            }
          })
        }
        this.exercisesBind(req).then(res => {
          return resolve(res)
        })
      })
    },
    // 弹框方法
    searchForm(values) {
      this.searchList = values
      this.showList()
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
