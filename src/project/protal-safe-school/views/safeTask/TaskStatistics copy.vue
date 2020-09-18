<template>
  <div class="view-statistics page-layout  bg-fff qui-fx-ver">
    <div class="content pos-box">
      <div class="title u-fx-ac-jc u-mar-t40 u-bold u-font-1 u-mar-b40">开学需要注意事项</div>
      <div class="search-box u-fx-ac u-mar-l20">
        <div>月计划：</div>
        <div><a-input placeholder="Basic usage" /></div>
      </div>
      <div class="a-collapse-box u-padd-20">
        <a-collapse v-model="activeKey">
          <template #expandIcon="props">
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel
            class="u-mar-b20"
            :key="list.id+''"
            v-for="(list,index) in dataLists"
            :showArrow="false"
          >
            <div slot="header" @click="open($event,list,index)" class="header">
              Q{{ index+1 }}({{ list.questionType | questionType }}){{ list.title }}
            </div>
            <div class="list-box  u-mar-20 " v-if="list.questionType==='1'">
              <div class="list-cont u-fx-ac-jc">
                <pre-echarts v-if="Object.keys(answers).length>0" :dataList="answers[index]"></pre-echarts>
                <a-empty v-else :image="simpleImage" />
              </div>
              <div class="list-cont u-mar-t20">
                <table border="0" class="u-bd-1px" width="100%" cellspacing:="0">
                  <tr class="u-type-primary-light-bg">
                    <th class="u-padd-10 u-bd-r u-bd-b" width="60%" >选项</th>
                    <th class="u-padd-10 u-bd-r u-bd-b" >计数</th>
                    <th class="u-padd-10 u-bd-b ">占比</th>
                  </tr>
                  <tr v-for="(item,i) in answers[index]" :key="i">
                    <td class="u-padd-10 u-bd-r u-bd-b " width="60%">{{ item.answer }}</td>
                    <td class="u-padd-10 u-bd-r u-bd-b " >{{ item.count }}人</td>
                    <td class="u-padd-10  u-bd-b ">{{ item.rate }}</td>
                  </tr>
                  <tr>
                    <!-- <td class="u-padd-10 " :colspan="3">答题人数：{{ answers[index].answerSum }}</td> -->
                  </tr>
                </table>
              </div>
              <div class="list-cont u-mar-t20">
                <table-list :page-list="pageList" :columns="columns" :table-list="user[index].data" >
                </table-list>
                <page-num v-model="pageList" :total="total"></page-num>
                <!-- <a-table :columns="columns" :pagination="false" :data-source="dangerDetail" bordered>
                </a-table> -->
              </div>
            </div>
            <div class="list-box  u-mar-20 " v-if="list.questionType==='2'">
              <!-- <div class="list-title u-type-primary-bg u-main-color u-bold u-padd-10">
              </div> -->
              <div class="list-cont u-fx-ac-jc">
                <bar-echarts
                  v-if="answers.length>0"
                  :multipleData="answers[index]">
                </bar-echarts>
                <a-empty v-else :image="simpleImage" />
              </div>
              <div class="list-cont u-mar-t20">
                <table border="0" class="u-bd-1px" width="100%" cellspacing:="0">
                  <tr class="u-type-primary-light-bg">
                    <th class="u-padd-10 u-bd-r u-bd-b" width="60%" >选项</th>
                    <th class="u-padd-10 u-bd-r u-bd-b" >计数</th>
                    <th class="u-padd-10 u-bd-b ">占比</th>
                  </tr>
                  <tr v-for="(item, i) in answers[index]" :key="i">
                    <td class="u-padd-10 u-bd-r u-bd-b " width="60%">{{ item.answer }}</td>
                    <td class="u-padd-10 u-bd-r u-bd-b " >{{ item.count }}人</td>
                    <td class="u-padd-10  u-bd-b ">{{ item.rate }}</td>
                  </tr>
                  <tr>
                    <!-- <td class="u-padd-10 " :colspan="3">答题人数：{{ answers[index].answerSum }}</td> -->
                  </tr>
                </table>
              </div>
              <div class="list-cont u-mar-t20">
                <a-table :columns="columns" :pagination="false" :data-source="user[index].data" bordered>
                </a-table>
              </div>
            </div>
            <div class="list-box  u-mar-20 " v-if="list.questionType==='3'">
              <div class="list-cont u-mar-t20">
                <table-list :page-list="pageList" :columns="columns" :table-list="user[index].data" >
                </table-list>
                <page-num v-model="pageList" :total="total"></page-num>
              </div>
            </div>
            <div class="list-box  u-mar-20 " v-if="list.questionType==='4'">
              <div class="list-cont u-mar-t20">
                  <div>{{user}}</div>
                <table-list :page-list="pageList" :columns="columns" :table-list="user[0].data" >
                </table-list>
                <page-num v-model="pageList" :total="total"></page-num>
              </div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PreEcharts from './PreEcharts'
import BarEcharts from './BarEcharts'
import NoData from '@c/NoData'
import { Empty } from 'ant-design-vue'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
// import PreBarEcharts from './PreBarEcharts'
const columns = [
  {
    title: '学校',
    dataIndex: 'schoolName',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '回答人',
    width: '60%',
    dataIndex: 'completeUserName'
  },
  {
    title: '选项',
    dataIndex: 'answer'
  }
]
export default {
  name: 'ViewStatistics',
  components: {
    NoData,
    PreEcharts,
    BarEcharts,
    TableList,
    PageNum
    // PreBarEcharts
  },
  data() {
    return {
      activeKey: ['0'],
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      form: this.$form.createForm(this),
      columns,
      dataLists: [],
      detailedData: {},
      dangerLevel: {}, // 隐患情况
      dangerDetail: [], // 隐患明细table
      dangerSchool: { },
      multipleData: [],
      general: {}, // 检查的总体情况
      mainIssues: [], // 存在的问题
      name: '',
      reform: {}, // 整改情况
      time: '', // 时间
      dateNum: '',
      year: '',
      page: 1,
      size: 20,
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      questionId: '',
      questionInfo: [],
      answers:[],
      user:[],
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  async mounted() {
    this.taskCode = this.$route.query.code
    await this.getDetails()
  },
  methods: {
    ...mapActions('home', ['seeStatistics', 'answerTaskDetail', 'answersTaskStatistics', 'userTaskStatistics']),
    async getDetails() {
      const res = await this.answerTaskDetail({ taskCode: this.taskCode })
      this.questionId = res.data[0].id
      this.activeKey = [res.data[0].id]
      this.dataLists = res.data.map(el => {
        return {
          ...el,
          check: false
        }
      })
      this.dataLists[0].check = true
      this.seeStatistics(0)
    },
    async seeStatistics(index) {
      const req = {
        dateNum: this.dateNum,
        page: this.page,
        size: this.size,
        year: this.year,
        questionId: this.questionId,
        taskTemplateCode: this.taskCode
      }
      const answers = await this.answersTaskStatistics(req)
      const user = await this.userTaskStatistics(req)
      console.log('answers', answers)
      console.log('user', user)
      const answersData = answers.data.statisticsAnswersDtoList
      this.answers = [...this.answers, answersData]
      const userData = {
          key:index,
          data:user.data.statisticsAnswersByUserDtoList.records
      }
      this.user = [...this.user, userData]
     console.log('user',this.user)
    //   const newData = {
    //     dangerDetail: user.data.statisticsAnswersByUserDtoList.records,
    //     answers[index]: answers.data,
    //     total: user.data.statisticsAnswersByUserDtoList.records.length
    //   }
    //   this.questionInfo = [...this.questionInfo, newData]
    },
    setBi() {
      // Highcharts.chart('backSchool', backSchool)
      // Highcharts.chart('area', area)
      // Highcharts.chart('circle', circle)
    },
    open(e, record, index) {
      record.check = !record.check
      this.questionId = record.id
      if (record.check) {
        this.seeStatistics(index)
      }
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
@deep: ~'>>>';
.view-statistics {
  // padding: 20px;
  box-sizing: content-box;
  .content {
    height: calc(100% - 10px);
    overflow-y: scroll;

    .a-collapse-box{
      @{deep} .ant-collapse > .ant-collapse-item > .ant-collapse-header{
        background: #ecf5ff !important;
        background: #6882da !important;
        color: #fff;
        padding: 0;
      }
      .list-box{
          .list-cont{
            //修改表头文字、背景颜色
            @{deep} .ant-table-thead > tr >th{
            background: #ecf5ff !important;
          }
        }
      }
    }
  }
}
.header {
  padding: 10px;
}
</style>
