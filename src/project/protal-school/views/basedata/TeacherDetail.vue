<template>
  <div class="student-detail page-layout qui-fx-ver">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="基本信息">
      </a-tab-pane>
    </a-tabs>
    <div class="top">
      <div class="qui-fx-ver">
        <p class="info qui-fx">
          <span>姓名： {{ teacherInfo.userName }}</span>
          <span>性别： {{ teacherInfo.sex | getSex() }}</span>
          <span>工号： {{ teacherInfo.workNo }}</span>
          <span>手机号： {{ teacherInfo.mobile }}</span>
          <span>邮箱： {{ teacherInfo.email }}</span>
          <span>组织机构： {{ teacherInfo.orgName }}</span>
          <span>状态： {{ teacherInfo.onJob | getJodStatus() }}</span>
        </p>
        <p class="phone qui-fx">
          <span class="qui-fx-ac">人脸照片：</span>
          <a-popover placement="right">
            <template slot="content">
              <img :src="teacherInfo.photoUrl" style="max-width: 200px; max-height: 220px; display: block;" alt="">
            </template>
            <img :src="teacherInfo.photoUrl" style="max-width: 80px; max-height: 80px; display: block;" alt="">
          </a-popover>
        </p>
        <span>备注： {{ teacherInfo.remark }}</span>
      </div>
    </div>
    <a-tabs default-active-key="1" @change="tabChange" v-model="tabValue">
      <a-tab-pane key="0" tab="个人简介">
        <no-data msg="暂无数据~" v-if="noDataTag"></no-data>
        <div v-else class="content qui-fx-ver qui-fx-f1 u-auto" :style="{ height: height + 'px' }">
          <div class="table intro qui-fx-ver qui-fx-f1">
            <div class="u-fx-ac u-mar-b10">
              <img class="line" src="http://canpointtest.com/mobile-img/line.png"/>
              <span class="u-mar-l20 u-font-01 u-bold">个人简介：</span>
            </div>
            <div class="u-mar-b20">
              <span class="content">{{ introduction }}</span>
            </div>
            <div v-if="photoList.length > 0" class="u-fx-ac u-mar-b10">
              <img class="line" src="http://canpointtest.com/mobile-img/line.png"/>
              <span class="u-mar-l20 u-font-01 u-bold">个人风采：</span>
            </div>
            <div class="">
              <div class="photo-list" v-for="(item, i) in photoList" :key="i">
                <img class="intro-img" :src="item.url"/>
                <div class="u-fx-ac-jc u-te">{{ item.photoDes }}</div>
              </div>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NoData from '@c/NoData'

export default {
  name: 'TeacherDetail',
  components: {
    NoData
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  data() {
    return {
      userCode: '',
      teacherInfo: {},
      tabValue: '0',
      photoList: [],
      introduction: '',
      noDataTag: false,
      height: 0
    }
  },
  mounted() {
    this.height = window.innerHeight - 460
    this.userCode = this.$route.query.userCode
    console.log(this.userCode)
    this.showInfo()
  },
  methods: {
    ...mapActions('home', [
      'detailInfo',
      'getIntro'
    ]),
    tabChange() {
      console.log(this.tabValue)
      this.showList()
    },
    async showInfo() {
      const res = await this.detailInfo({ userCode: this.userCode, schoolCode: this.userInfo.schoolCode })
      this.teacherInfo = res.data
      this.showList()
    },
    async showList() {
      if (this.tabValue === '0') {
        const res = await this.getIntro({
          schoolCode: this.userInfo.schoolCode,
          userCode: this.userCode,
          userType: '4'
        })
        if (!res.data || res.data.introduction === '') {
          this.introduction = ''
          this.photoList = []
          this.noDataTag = true
          return
        }
        this.introduction = res.data.introduction
        if (res.data.outUserStyleDtoList.length === 0) {
          return
        }
        this.photoList = res.data.outUserStyleDtoList.map((el) => {
          return {
            url: el.photoUrl,
            id: el.id,
            photoDes: el.photoDes
          }
        })
      }
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
      width: 18%;
      min-width: 180px;
      height: 200px;
      background-color:#fff;
      float: left;
      margin-right: 1.5%;
      position: relative;
      & > img {
        width: 100%;
        height: 180px;
        display: block;
      }
    }
  }
}
</style>
