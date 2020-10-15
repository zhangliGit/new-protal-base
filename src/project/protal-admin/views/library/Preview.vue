<template>
  <div class="page-layout qui-fx-ver">
    <div class="content pos-box">
      <h2 class="u-fx-ac-jc u-type-primary u-mar-t40 u-mar-b20">{{ detailInfo.name }}</h2>
      <a-row type="flex" class="u-tips-color" >
        <a-col :span="6" class="u-fx" >
          <div class="text u-fx-ac-jc">发布人：{{ detailInfo.publisherName }}</div>
        </a-col>
        <a-col :span="6" class="u-fx" >
          <div class="text u-fx-ac-jc">知识库分类：{{ detailInfo.category }}</div>
        </a-col>
        <a-col :span="6" class="u-fx" >
          <div class="text u-fx-ac-jc">文件分类：{{ detailInfo.fileTypeName }}</div>
        </a-col>
        <a-col :span="6" class="u-fx" >
          <div class="text u-fx-ac-jc">发布时间：{{ detailInfo.createTime | gmtToDate('date') }}</div>
        </a-col>
      </a-row>
      <div class="cont u-fx-ac-jc u-mar-t40" v-html="detailInfo.des"></div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import hostEnv from '@config/host-env'
import NoData from '@c/NoData'
import moment from 'moment'
export default {
  name: 'TaskDetail',
  components: {
    NoData
  },
  data() {
    return {
      detailInfo: {}
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.id = this.$route.query.id
    this.showDetail()
  },
  methods: {
    ...mapActions('home', ['klgInfo']),
    moment,
    // 获取详情
    async showDetail() {
      const req = {
        'id': this.id,
        'schoolCode': this.userInfo.schoolCode,
        'source': '1',
        'userName': this.userInfo.userName
      }
      const res = await this.klgInfo(req)
      this.detailInfo = res.data
      this.docName = 'res.data.docName'
      this.show = !res.data.docUrl
      this.flag = !res.data.docUrl
    },
    handleChange() {},
    exportClick (docUrl) {
      if (docUrl) {
        const url = `${hostEnv.zx_subject}/file/downLoad/doc?url=${docUrl}`
        window.open(url)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  height: calc(100% - 10px);
  overflow-y: scroll;
  .fill-top {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: #4d4cac;
    border-bottom: 1px solid #ccc;
    .fill-head {
      text-align: center;
      border-bottom: 3px solid #4d4cac;
    }
    .task {
      width: 70px;
    }
    .report {
      width: 100px;
    }
  }
  .ant-calendar-picker {
    width: 100% !important;
  }
}
.top {
  border-bottom: 1px solid #ccc;
}
.subject {
  background-color: #fafafa;
}
.upload {
  height: 25px;
  border-bottom: 1px solid #4d4cac;
  .upload-title {
    margin-left: 15px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      height: 18px;
      width: 5px;
      background-color: #4d4cac;
      left: -15px;
      top: 3px;
    }
  }
}
img {
  width: 30px;
  height: 30px;
}
</style>
