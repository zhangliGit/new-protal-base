<template>
  <div class="student-detail page-layout qui-fx-ver">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="基本信息">
      </a-tab-pane>
    </a-tabs>
    <div class="top">
      <div class="qui-fx-ver">
        <p class="info qui-fx">
          <span>学年： {{ year }}学年</span>
          <span>姓名： {{ studentInfo.userName }}</span>
          <span>学号： {{ studentInfo.workNo }}</span>
          <span>年级： {{ studentInfo.gradeName }}</span>
          <span>班级： {{ studentInfo.className }}</span>
          <span>入学年份： {{ studentInfo.admissionTime }}</span>
          <span>性别： {{ studentInfo.sex | getSex() }}</span>
          <span>状态： {{ studentInfo.sex | getSex() }}</span>
          <span>走住读类型： {{ studentInfo.hasDorm | getDorm() }}</span>
          <span>卡号： {{ studentInfo.className }}</span>
        </p>
        <p class="phone qui-fx">
          <span class="qui-fx-ac">人脸照片：</span>
          <a-popover placement="right">
            <template slot="content">
              <img :src="studentInfo.photoUrl" style="max-width: 200px; max-height: 220px; display: block;" alt="">
            </template>
            <img :src="studentInfo.photoUrl" style="max-width: 80px; max-height: 80px; display: block;" alt="">
          </a-popover>
        </p>
        <span>备注： {{ studentInfo.remark }}</span>
      </div>
    </div>
    <a-tabs default-active-key="1" @change="tabChange" v-model="tabValue">
      <a-tab-pane key="1" tab="学生家长">
        <div class="content qui-fx-ver qui-fx-f1">
          <div class="table qui-fx-ver qui-fx-f1">
            <table-list
              :columns="highStuDetail.columns"
              :table-list="parentsList">
              <template v-slot:other1="other1">
                <div>
                  <a-switch
                    :disabled="other1.record.hasMainParent"
                    @click.native.stop
                    @change="changeMain($event,other1.record)"
                    v-model="other1.record.hasMainParent"
                  />
                </div>
              </template>
            </table-list>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="异动记录">
        <div class="content qui-fx-ver qui-fx-f1">
          <div class="table qui-fx-ver qui-fx-f1">
            <table-list
              :columns="highStuDetail.changeColumns"
              :table-list="changeList">
              <template v-slot:other1="other1">
                {{ other1.record.oldGradeName }}{{ other1.record.oldClassName }}
              </template>
              <template v-slot:other2="other2">
                {{ other2.record.newGradeName }}{{ other2.record.newClassName }}
              </template>
            </table-list>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3" tab="调宿记录">
        <div class="content qui-fx-ver qui-fx-f1">
          <div class="table qui-fx-ver qui-fx-f1">
            <table-list
              :columns="highStuDetail.dormColumns"
              :table-list="dormList">
              <template v-slot:other1="other1">
                {{ other1.record.oldBuildingName }}{{ other1.record.oldFloorName }}{{ other1.record.oldRoomName }}
              </template>
              <template v-slot:other2="other2">
                {{ other2.record.newBuildingName }}{{ other2.record.newFloorName }}{{ other2.record.newRoomName }}
              </template>
            </table-list>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import { Switch } from 'ant-design-vue'
import NoData from '@c/NoData'
import highStuDetail from '../../assets/js/table/highStuDetail.js'

export default {
  name: 'HighStuDetail',
  components: {
    NoData,
    TableList,
    ASwitch: Switch
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  data() {
    return {
      highStuDetail,
      changeTag: false,
      changeTitle: '变更',
      userCode: '',
      year: '',
      parentsList: [],
      changeList: [],
      dormList: [],
      selectedParent: '',
      studentInfo: {},
      childCode: '',
      yearId: '',
      status: '1',
      tabValue: '1',
      photoList: [],
      noDataTag: false,
      height: 0
    }
  },
  mounted() {
    console.log(window.innerHeight)
    this.height = window.innerHeight - 460
    this.userCode = this.$route.query.userCode
    this.year = this.$route.query.year
    this.yearId = this.$route.query.yearId
    console.log(this.userCode)
    this.showStudentInfo()
  },
  methods: {
    ...mapActions('home', [
      'queryStudentInfoById',
      'queryParents',
      'setParents',
      'getChangeList',
      'getDormChangeList',
      'getIntro'
    ]),
    tabChange() {
      console.log(this.tabValue)
      this.showList()
    },
    changeMain(value, e) {
      console.log(value, e)
      this.parentsList.map((ele) => {
        ele.hasMainParent = false
      })
      const index = this.parentsList.findIndex((list) => list.id === e.id)
      if (index !== -1) {
        this.parentsList[index].hasMainParent = value
      }
      const req = {
        childCode: e.studentCode,
        parentCode: e.parentCode
      }
      this.setParents(req).then((res) => {
        this.$message.success('设置成功')
        this.$tools.goNext(() => {
          this.showList()
        })
      })
    },
    async showStudentInfo() {
      const res = await this.queryStudentInfoById({ userCode: this.userCode, schoolYearId: this.yearId })
      this.studentInfo = res.data
      this.childCode = res.data.userCode
      this.showList()
    },
    async showList() {
      if (this.tabValue === '1') {
        const res = await this.queryParents({ childCode: this.childCode })
        this.parentsList = res.data
        this.parentsList.map((ele) => {
          ele.hasMainParent = ele.hasMainParent === '1'
        })
      } else if (this.tabValue === '2') {
        const res = await this.getChangeList({ schoolCode: this.userInfo.schoolCode, userCode: this.userCode })
        this.changeList = res.data
      } else if (this.tabValue === '3') {
        const res = await this.getDormChangeList({ schoolCode: this.userInfo.schoolCode, userCode: this.userCode })
        this.dormList = res.data
      }
    },
    parentChange(value) {
      this.selectedParent = value
    }
  }
}
</script>
<style lang="less" scoped>
.student-detail {
  height: 100%;
  padding-top: 10px;
  .tit {
    margin-bottom: 20px;
    p {
      border-left: 3px solid #6882da;
      padding-left: 10px;
      font-weight: bold;
      margin: 0 0 0 10px;
      line-height: 25px;
      height: 25px;
      font-size: 16px;
    }
  }
  .top {
    background: #fff;
    padding: 10px 20px;
    margin-bottom: 10px;
    .info {
      margin-bottom: 20px;
      flex-wrap: wrap;
      span {
        margin-right: 50px;
        padding: 10px 0;
      }
    }
    .phone {
      margin-bottom: 20px;
      img {
        width: 80px;
        height: 80px;
        margin-right: 20px;
        border-radius: 4px;
      }
    }
  }
  .content {
    background: #fff;
    padding: 0 20px;
    .table {
      margin-bottom: 20px;
    }
  }
  .intro{
    .line {
      width: 2px;
      height: 14px;
    }
    .content{
      text-indent: 2em;
    }
    .photo-list {
      margin-bottom: 10px;
      border-radius: 4px;
      overflow: hidden;
      width: 240px;
      height: 200px;
      background-color:#fff;
      float: left;
      margin-right: 1.5%;
      position: relative;
      & > img {
        width: 240px;
        height: 180px;
        display: block;
      }
    }
  }
}
</style>
