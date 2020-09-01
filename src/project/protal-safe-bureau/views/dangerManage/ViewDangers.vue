<template>
  <div class="view-dangers page-layout">
    <div class="information page-layout bg-fff">
      <div class="half flex u-line2" >
        <div class="lable  u-type-primary-light-bg u-fx-je u-bd-r u-padd-10" >隐患地点:</div>
        <div class="content  u-fx-jl  u-bd-r u-padd-10" >{{ data.address }}</div>
      </div>
      <div class="half flex u-line2" >
        <div class="lable  u-type-primary-light-bg u-fx-je u-bd-r u-padd-10" >负责人:</div>
        <div class="content  u-fx-jl  u-bd-r u-padd-10" >{{ data.leaderName }}</div>
      </div>
      <div class="half flex u-line2" >
        <div class="lable  u-type-primary-light-bg u-fx-je u-bd-r u-padd-10" >隐患类型:</div>
        <div class="content  u-fx-jl  u-bd-r u-padd-10" >{{ data.address }}</div>
      </div>
      <div class="half flex u-line2" >
        <div class="lable  u-type-primary-light-bg u-fx-je u-bd-r u-padd-10" >处理人:</div>
        <div class="content  u-fx-jl  u-bd-r u-padd-10" >{{ data.handerName }}</div>
      </div>
      <div class="half flex u-line2" >
        <div class="lable  u-type-primary-light-bg u-fx-je u-bd-r u-padd-10" >隐患状态:</div>
        <div class="content  u-fx-jl  u-bd-r u-padd-10" >{{ data.state | getDangerState }}</div>
      </div>
      <div class="half flex u-line2" >
        <div class="lable  u-type-primary-light-bg u-fx-je u-bd-r u-padd-10" >要求处理完时间:</div>
        <div class="content  u-fx-jl  u-bd-r u-padd-10" >{{ data.handleDuration | gmtToDate }}</div>
      </div>
      <div class="half flex u-line2" >
        <div class="lable  u-type-primary-light-bg u-fx-je u-bd-r u-padd-10" >风险等级:</div>
        <div class="content  u-fx-jl  u-bd-r u-padd-10" >{{ data.level | getDangerLevel }}</div>
      </div>
      <div class="half flex u-line2" >
        <div class="lable  u-type-primary-light-bg u-fx-je u-bd-r u-padd-10" >是否允许转派:</div>
        <div class="content  u-fx-jl  u-bd-r u-padd-10" >{{ data.hasDispense==='0'?'不可以':data.hasDispense==='1'?'可以':'' }}</div>
      </div>
      <div class="all flex u-line2" >
        <div class="lable  u-type-primary-light-bg u-fx-je u-bd-r u-fx-ac u-padd-10" >隐患图片:</div>
        <div class="content  u-fx-jl u-fx-ac  u-bd-r" >
          <div class="img u-mar-l10" v-for="(item,index) in data.dangerPhotoUrls" :key="index">
            <img :src="item" alt="" >
          </div>
        </div>
      </div>
      <div class="all flex u-line2" >
        <div class="lable  u-type-primary-light-bg u-fx-je u-bd-r u-fx-ac u-padd-10" >隐患描述:</div>
        <div class="content u-fx-ac u-padd-l10  u-fx-jl  u-bd-r" >{{ data.address }}</div>
      </div>
      <div class="all changxiang flex u-line2" >
        <div class="lable  u-type-primary-light-bg u-fx-je u-bd-r u-fx-ac u-padd-10" >整改图片:</div>
        <div class="content  u-fx-ac u-padd-l10 u-fx-jl  u-bd-r" >{{ data.address }}</div>
      </div>
    </div>
    <div class="processingFlow page-layout bg-fff u-mar-t20 u-bd-b">
      <div class="title u-line1 u-bd-b">处理流程</div>
      <div class="content u-mar-t20 u-padd-l20">
        <a-timeline>
          <a-timeline-item v-for="(item,index) in data.processes" :key="index" color="gray">
            <a-row type="flex" >
              <a-col :span="8" >
                {{ item.content }}
              </a-col>
              <a-col :span="10" >
                {{ item.createTime | gmtToDate }}
              </a-col>
            </a-row>
          </a-timeline-item>
        </a-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'SubmitForm',
  components: {},
  computed: {
    status: {
      get() {
        return this.value
      },
      set() {
        this.$emit('input', false)
      }
    }
  },
  data() {
    return {
      data: {

      }
    }
  },
  created() {
    this.id = this.$route.query.id || ''
    this._getDangerInfo()
  },
  methods: {
    ...mapActions('home', ['getDangerInfo', 'subsidy', 'getSchool']),
    async _getDangerInfo() {
      const res = await this.getDangerInfo(this.id)
      this.data = res.data
    }
  }
}
</script>
<style lang="less" scoped>
.view-dangers{
  padding: 20px;
  .img{
    width: 60px;
    height: 60px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .information{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .half{
        display: flex;
        width: 50%;
        .lable{
        &:nth-of-type(even){
          border-left: none;
        }
        width: 50%;
        box-sizing: border-box;
        border-top: 1px solid  rgb(196, 176, 228) !important;
        border-left: 1px solid  rgb(196, 176, 228) !important;
        }
        .content{
        box-sizing: border-box;
        width: 100%;
        border-top: 1px solid rgb(181, 165, 228) !important;
        border-right: 1px solid rgb(181, 165, 228) !important;
        border-left: 1px solid rgb(181, 165, 228) !important;
        }
    }
    .all{
      width: 100%;
       display: flex;
        height: 80px;
      .lable{
        box-sizing: border-box;
        width: 20%;
        border-top: 1px solid  rgb(196, 176, 228) !important;
        border-left: 1px solid  rgb(196, 176, 228) !important;
        }
        .content{
        box-sizing: border-box;
        width: 100%;
        border-top: 1px solid rgb(181, 165, 228) !important;
        border-right: 1px solid rgb(181, 165, 228) !important;
        border-left: 1px solid rgb(181, 165, 228) !important;
        }

    }
    .changxiang{
        border-bottom: 1px solid  rgb(181, 165, 228) !important;
      }
  }
  .processingFlow{
    .title{
      line-height: 40px;
    }
    .content{

    }
  }
}
</style>
