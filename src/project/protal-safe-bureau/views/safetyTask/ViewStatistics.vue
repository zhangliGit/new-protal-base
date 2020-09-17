<template>
  <div class="view-statistics page-layout  bg-fff qui-fx-ver">
    <div class="content pos-box">
      <div class="title u-fx-ac-jc u-mar-t40 u-bold u-font-1 u-mar-b40">开学需要注意事项</div>
      <div class="search-box u-fx-ac u-mar-l20">
        <div>月计划：</div>
        <div><a-input placeholder="Basic usage" /></div>
      </div>
      <div class="a-collapse-box u-padd-20">
        <a-collapse @change="changeActivekey" v-model="activeKey">
          <template #expandIcon="props">
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          {{ dataLists }}
          <a-collapse-panel
            class="u-mar-b20"
            :key="index"
            v-for="(list,index) in dataLists"
          >
            <div slot="header">
              Q{{ index+1 }}({{ list.questionType | questionType }}){{ list.title }}
            </div>
            <div class="list-box  u-mar-20 " v-if="list.questionType==='1'">
              <div class="list-cont u-fx-ac-jc">
                {{}}
                <pre-echarts v-if="Object.keys(radioList.statisticsAnswersDtoList).length>0" :dataList="radioList.statisticsAnswersDtoList"></pre-echarts>
                <a-empty v-else :image="simpleImage" />
              </div>
              <div class="list-cont u-mar-t20">
                <table border="0" class="u-bd-1px" width="100%" cellspacing:="0">
                  <tr class="u-type-primary-light-bg">
                    <th class="u-padd-10 u-bd-r u-bd-b" width="60%" >选项</th>
                    <th class="u-padd-10 u-bd-r u-bd-b" >计数</th>
                    <th class="u-padd-10 u-bd-b ">占比</th>
                  </tr>
                  <tr v-for="(item,index) in radioList.statisticsAnswersDtoList" :key="index">
                    <td class="u-padd-10 u-bd-r u-bd-b " width="60%">{{ item.answer }}</td>
                    <td class="u-padd-10 u-bd-r u-bd-b " >{{ item.count }}人</td>
                    <td class="u-padd-10  u-bd-b ">{{ item.rate }}</td>
                  </tr>
                  <tr>
                    <td class="u-padd-10 " :colspan="3">答题人数：{{ radioList.answerSum }}</td>
                  </tr>
                </table>
              </div>
              <div class="list-cont u-mar-t20">
                <a-table :columns="columns" :pagination="false" :data-source="dangerDetail" bordered>
                </a-table>
              </div>
            </div>
            <div class="list-box  u-mar-20 " v-if="list.questionType==='2'">
              <!-- <div class="list-title u-type-primary-bg u-main-color u-bold u-padd-10">
              </div> -->
              <div class="list-cont u-fx-ac-jc">
                <bar-echarts
                  v-if="multipleList.statisticsAnswersDtoList.length>0"
                  :multipleData="multipleList.statisticsAnswersDtoList">
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
                  <tr v-for="(item,index) in multipleList.statisticsAnswersDtoList" :key="index">
                    <td class="u-padd-10 u-bd-r u-bd-b " width="60%">{{ item.answer }}</td>
                    <td class="u-padd-10 u-bd-r u-bd-b " >{{ item.count }}人</td>
                    <td class="u-padd-10  u-bd-b ">{{ item.rate }}</td>
                  </tr>
                  <tr>
                    <td class="u-padd-10 " :colspan="3">答题人数：{{ multipleList.answerSum }}</td>
                  </tr>
                </table>
              </div>
              <div class="list-cont u-mar-t20">
                {{ multipleList.statisticsAnswersByUserDtoList }}
                <a-table :columns="columns" :pagination="false" :data-source="multipleList.statisticsAnswersByUserDtoList" bordered>
                </a-table>
              </div>
            </div>
            <div class="list-box  u-mar-20 " v-if="list.questionType==='3'">
              <div class="list-cont u-mar-t20">
                <a-table :columns="columns" :pagination="false" :data-source="dangerDetail" bordered>
                </a-table>
              </div>
            </div>
            <div class="list-box  u-mar-20 " v-if="list.questionType==='3'">
              <div class="list-cont u-mar-t20">
                <a-table :columns="columns" :pagination="false" :data-source="dangerDetail" bordered>
                </a-table>
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
    BarEcharts
    // PreBarEcharts
  },
  data() {
    this.taskCode = this.$route.query.taskCode
    return {
      activeKey: ['0', '1', '2', '3'],
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      form: this.$form.createForm(this),
      columns,
      dataLists: [
        {
          content: [],
          id: 0,
          questionDocUrl: '',
          questionType: '1',
          title: ' 单选题目一，选择一个选项'
        },
        {
          content: [],
          id: 1,
          questionDocUrl: '',
          questionType: '2',
          title: '多选题目，下列那些是正确的选项'
        },
        {
          content: [],
          id: 2,
          questionDocUrl: '',
          questionType: '3',
          title: ' 填空题，填写正确的内容'
        },
        {
          content: [],
          id: 3,
          questionDocUrl: '',
          questionType: 4,
          title: '附件题'
        }
      ],
      multipleList: {
        'content': [
          '选项一',
          '选项二',
          '选择三'
        ],
        answerSum: '100',
        'dateNum': '100',
        'docUrl': '',
        'questionType': '2',
        'statisticsAnswersByUserDtoList': [
          {
            'answer': '11',
            'completeUserName': '李四',
            'schoolName': '学校一'
          },
          {
            'answer': '12',
            'completeUserName': '张三',
            'schoolName': '学校一'
          }
        ],
        'statisticsAnswersDtoList': [
          {
            'answer': '选项一',
            'count': 1,
            'rate': 0
          },
          {
            'answer': '选项二',
            'count': 19,
            'rate': 0
          },
          {
            'answer': '选择三',
            'count': 80,
            'rate': 0
          }
        ],
        'taskType': '2',
        'templateQuestionlId': '',
        'title': '多选一',
        'year': null
      },
      radioList: {
        'content': [
          '选项一',
          '选项二',
          '选择三'
        ],
        answerSum: '100',
        'dateNum': '100',
        'docUrl': '',
        'questionType': '2',
        'statisticsAnswersByUserDtoList': [
          {
            'answer': '11',
            'completeUserName': '李四',
            'schoolName': '学校一'
          },
          {
            'answer': '12',
            'completeUserName': '张三',
            'schoolName': '学校一'
          }
        ],
        'statisticsAnswersDtoList': [
          {
            'name': '是',
            'value': 1,
            'rate': 0
          },
          {
            'name': '否',
            'value': 19,
            'rate': 0
          }
        ],
        'taskType': '2',
        'templateQuestionlId': '',
        'title': '多选一',
        'year': null
      },
      detailedData: {},
      dangerLevel: {}, // 隐患情况
      dangerDetail: [
        {
          schoolName: '采育小学'
        },
        {
          schoolName: '采育小学'
        }
      ], // 隐患明细table
      dangerSchool: {
        yes: '1',
        no: '99',
        schoolName: '学校A'
      },
      multipleData: [
        {
          biggerCount: '3',
          schoolName: '看见摔倒的奶奶过去扶起'
        },
        {
          biggerCount: '55',
          schoolName: '地上有100元。拾起来占为己有'
        },
        {
          biggerCount: '20',
          schoolName: '学校D'
        },
        {
          biggerCount: '10',
          schoolName: '学校f'
        }
      ],
      general: {}, // 检查的总体情况
      mainIssues: [], // 存在的问题
      name: '',
      reform: {}, // 整改情况
      time: '' // 时间
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  async mounted() {
    await this.getDetails()
    // this._seeStatistics()
  },
  methods: {
    ...mapActions('home', ['seeStatistics', 'seeStatisticsLists']),
    async getDetails() {
      const res = await this.seeStatisticsLists({ taskCode: this.taskCode })
      this.dataLists = res.data
    },
    async _seeStatistics() {
      const req = {
        'dateNum': 0,
        'questionId': 107,
        'taskTemplateCode': 'S9x7ya0g0dlvk',
        'year': 0
      }
      const res = await this.seeStatistics(req)
      console.log(this.dataLists)
    },
    setBi() {
      // Highcharts.chart('backSchool', backSchool)
      // Highcharts.chart('area', area)
      // Highcharts.chart('circle', circle)
    },
    changeActivekey(key) {
      console.log(key)
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

</style>
