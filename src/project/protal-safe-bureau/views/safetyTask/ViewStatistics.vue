<template>
  <div class="accident-add page-layout  bg-fff qui-fx-ver">
    <div class="content pos-box">
      <div class="title u-fx-ac-jc u-mar-t40 u-bold u-font-1 u-mar-b40">开学需要注意事项</div>
      <div class="search-box u-fx u-mar-l20">
        <div>月计划：</div>
        <div><a-input placeholder="Basic usage" /></div>
      </div>
      <div class="list-box  u-mar-20 ">
        <div class="list-title u-type-primary-bg u-main-color u-bold u-padd-10">
          Q1、(单选题)近一周是否出现体温异常的情况？
        </div>
        <div class="list-cont u-fx-ac-jc">
          <pre-echarts v-if="dangerSchool.length>0" :dataList="dangerSchool"></pre-echarts>
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
      <div class="list-box  u-mar-20 ">
        <div class="list-title u-type-primary-bg u-main-color u-bold u-padd-10">
          Q2、(单选题)近一周是否出现体温异常的情况？
        </div>
        <div class="list-cont u-fx-ac-jc">
          图表
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
      <div class="list-box  u-mar-20 ">
        <div class="list-title u-type-primary-bg u-main-color u-bold u-padd-10">
          Q3、(单选题)近一周是否出现体温异常的情况？
        </div>
        <div class="list-cont u-mar-t20">
          <a-table :columns="columns" :pagination="false" :data-source="dangerDetail" bordered>
          </a-table>
        </div>
      </div>
      <div class="list-box  u-mar-20 ">
        <div class="list-title u-type-primary-bg u-main-color u-bold u-padd-10">
          Q4、附件
        </div>
        <div class="list-cont u-mar-t20">
          <a-table :columns="columns" :pagination="false" :data-source="dangerDetail" bordered>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PreEcharts from './PreEcharts'
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
  name: 'ViewsReport',
  components: {
    NoData,
    PreEcharts
    // PreBarEcharts
  },
  data() {
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
      dangerSchool: [
        {
          biggerCount: '3',
          generalCount: '1',
          heavyCount: '4',
          lowCount: '9',
          schoolName: '学校A'
        },
        {
          biggerCount: '3',
          generalCount: '1',
          heavyCount: '8',
          lowCount: '9',
          schoolName: '学校B'
        },
        {
          biggerCount: '3',
          generalCount: '1',
          heavyCount: '4',
          lowCount: '9',
          schoolName: '学校C'
        },
        {
          biggerCount: '3',
          generalCount: '4',
          heavyCount: '4',
          lowCount: '9',
          schoolName: '学校D'
        },
        {
          biggerCount: '1',
          generalCount: '1',
          heavyCount: '4',
          lowCount: '9',
          schoolName: '学校f'
        }
      ], // 隐患数量排名图标数据
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
    // this.code = this.$route.query.code
    // this.getDetails()
  },
  methods: {
    ...mapActions('home', ['seeReport']),
    async getDetails() {
      const res = await this.seeReport(this.code)
      const { findDanger, general, mainIssues, name, reform, time } = res.data
      this.dangerLevel = findDanger.dangerLevel
      this.dangerDetail = findDanger.dangerDetail
      const dangerSchool = [
        {
          biggerCount: '3',
          generalCount: '1',
          heavyCount: '4',
          lowCount: '9',
          schoolName: '学校A'
        },
        {
          biggerCount: '3',
          generalCount: '1',
          heavyCount: '8',
          lowCount: '9',
          schoolName: '学校B'
        },
        {
          biggerCount: '3',
          generalCount: '1',
          heavyCount: '4',
          lowCount: '9',
          schoolName: '学校C'
        },
        {
          biggerCount: '3',
          generalCount: '4',
          heavyCount: '4',
          lowCount: '9',
          schoolName: '学校D'
        },
        {
          biggerCount: '1',
          generalCount: '1',
          heavyCount: '4',
          lowCount: '9',
          schoolName: '学校f'
        }
      ]
      // this.dangerSchool = dangerSchool
      if (findDanger.dangerSchool.length > 0 && findDanger.dangerSchool.length <= 5) {
        this.dangerSchool = findDanger.dangerSchool
      } else if (findDanger.dangerSchool.length > 5) {
        findDanger.dangerSchool.length = 5
        this.dangerSchool = findDanger.dangerSchool
      }
      this.general = general
      this.mainIssues = mainIssues
      this.name = name
      this.reform = reform
      this.time = time
    },
    setBi() {
      // Highcharts.chart('backSchool', backSchool)
      // Highcharts.chart('area', area)
      // Highcharts.chart('circle', circle)
    },
    cancel() {
      this.$router.go(-1)
    }

  }
}
</script>
<style lang="less" scoped>
@deep: ~'>>>';
.accident-add {
  // padding: 20px;
  box-sizing: content-box;
  .content {
    height: calc(100% - 10px);
    overflow-y: scroll;
     .list-box{
      .list-cont{
          //修改表头文字、背景颜色
          @{deep} .ant-table-thead > tr >th{
          background: #ecf5ff !important;
        }
      }
    }
  }
  .u-line50{
    line-height: 50px !important;
  }

}

</style>
