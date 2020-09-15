<template>
  <div class="view-statistics page-layout  bg-fff qui-fx-ver">
    <div class="content pos-box">
      <div class="title u-fx-ac-jc u-mar-t40 u-bold u-font-1 u-mar-b40">开学需要注意事项</div>
      <div class="search-box u-fx-ac u-mar-l20">
        <div>月计划：</div>
        <div><a-input placeholder="Basic usage" /></div>
      </div>
      <div class="a-collapse-box u-padd-20">
        <a-collapse @change="changeActivekey" activeKey="1">
          <template #expandIcon="props">
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel class="u-mar-b20" key="1" header="Q1、(单选题)近一周是否出现体温异常的情况？">
            <div class="list-box  u-mar-20 ">
              <div class="list-cont u-fx-ac-jc">
                <pre-echarts v-if="Object.keys(dangerSchool).length>0" :dataList="dangerSchool"></pre-echarts>
                <a-empty v-else :image="simpleImage" />
              </div>
              <div class="list-cont u-mar-t20">
                <table border="0" class="u-bd-1px" width="100%" cellspacing:="0">
                  <tr class="u-type-primary-light-bg">
                    <th class="u-padd-10 u-bd-r u-bd-b" width="60%" >选项</th>
                    <th class="u-padd-10 u-bd-r u-bd-b" >计数</th>
                    <th class="u-padd-10 u-bd-b ">占比</th>
                  </tr>
                  <tr>
                    <td class="u-padd-10 u-bd-r u-bd-b " width="60%">是</td>
                    <td class="u-padd-10 u-bd-r u-bd-b " >1人</td>
                    <td class="u-padd-10  u-bd-b ">1%</td>
                  </tr>
                  <tr>
                    <td class="u-padd-10 u-bd-r u-bd-b ">否</td>
                    <td class="u-padd-10 u-bd-r u-bd-b ">99人</td>
                    <td class="u-padd-10  u-bd-b ">900%</td>
                  </tr>
                  <tr>
                    <td class="u-padd-10 " :colspan="3">答题人数：100</td>
                  </tr>
                </table>
              </div>
              <div class="list-cont u-mar-t20">
                <a-table :columns="columns" :pagination="false" :data-source="dangerDetail" bordered>
                </a-table>
              </div>
            </div>
          </a-collapse-panel>
          <a-collapse-panel class="u-mar-b20" key="2" header="Q2、(单选题)近一周是否出现体温异常的情况？" :disabled="false">
            <div class="list-box  u-mar-20 ">
              <!-- <div class="list-title u-type-primary-bg u-main-color u-bold u-padd-10">
              </div> -->
              <div class="list-cont u-fx-ac-jc">
                <bar-echarts v-if="multipleData.length>0" :multipleData="multipleData"></bar-echarts>
                <a-empty v-else :image="simpleImage" />
              </div>
              <div class="list-cont u-mar-t20">
                <table border="0" class="u-bd-1px" width="100%" cellspacing:="0">
                  <tr class="u-type-primary-light-bg">
                    <th class="u-padd-10 u-bd-r u-bd-b" width="60%" >选项</th>
                    <th class="u-padd-10 u-bd-r u-bd-b" >计数</th>
                    <th class="u-padd-10 u-bd-b ">占比</th>
                  </tr>
                  <tr>
                    <td class="u-padd-10 u-bd-r u-bd-b " width="60%">是</td>
                    <td class="u-padd-10 u-bd-r u-bd-b " >1人</td>
                    <td class="u-padd-10  u-bd-b ">1%</td>
                  </tr>
                  <tr>
                    <td class="u-padd-10 u-bd-r u-bd-b ">否</td>
                    <td class="u-padd-10 u-bd-r u-bd-b ">99人</td>
                    <td class="u-padd-10  u-bd-b ">900%</td>
                  </tr>
                  <tr>
                    <td class="u-padd-10 " :colspan="3">答题人数：100</td>
                  </tr>
                </table>
              </div>
              <div class="list-cont u-mar-t20">
                <a-table :columns="columns" :pagination="false" :data-source="dangerDetail" bordered>
                </a-table>
              </div>
            </div>
          </a-collapse-panel>
          <a-collapse-panel class="u-mar-b20" key="3" header="Q3、(单选题)近一周是否出现体温异常的情况？">
            <div class="list-box  u-mar-20 ">
              <div class="list-cont u-mar-t20">
                <a-table :columns="columns" :pagination="false" :data-source="dangerDetail" bordered>
                </a-table>
              </div>
            </div>
          </a-collapse-panel>
          <a-collapse-panel key="4" header="Q3、(单选题)近一周是否出现体温异常的情况？">
            <div class="list-box  u-mar-20 ">
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
    className: 'column-money',
    dataIndex: 'issue'
  },
  {
    title: '选项',
    dataIndex: 'issueAssess'
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
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      form: this.$form.createForm(this),
      columns,
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
  mounted() {
    this.getDetails()
  },
  methods: {
    ...mapActions('home', ['seeStatistics']),
    async getDetails() {
      const req = {
        taskTemplateCode: this.taskCode
      }
      const res = await this.seeStatistics(req)
      console.log(res)
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
