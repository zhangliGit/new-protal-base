<template>
  <div class="add-find page-layout bg-fff qui-fx-ver">
    <div class="card" v-for="(item,index) in dataList" :key="index">
      <div class="title-tab">
        <span class="title-tab-pane on u-type-primary">{{ item.name }}</span>
      </div>
      <div class="cont u-fx-wp u-mar-t10">
        <div
          class="list_box u-fx-ac-jc u-mar-10"
          v-for="(v,index2) in item.schoolAndStateList"
          :key="index2"
          @click="reviewDetails(v.taskId)">
          <div class="title u-bold u-font-1">{{ v.schoolName }}</div>
          <div class="btn u-fx-ac-jc u-font-01" :class="v.state==4?'green':''">
            {{ v.state | taskStatus }}
          </div>
        </div>
      </div>
    </div>
    <div class="card ">
      <div class="title-tab">
        <span class="title-tab-pane on u-type-primary">光明街道</span>
      </div>
      <div class="cont u-fx-wp u-mar-t10">
        <div class="list_box u-fx-ac-jc  u-mar-10">
          <div class="title u-bold u-font-1">梅沙河里小学</div>
          <div class="btn u-fx-ac-jc u-font-01">检查待审核</div>
        </div>
        <div class="list_box u-fx-ac-jc  u-mar-10">
          <div class="title u-bold  u-font-1">梅沙河里小学</div>
          <div class="btn u-fx-ac-jc green u-font-01">督查完成</div>
        </div>
        <div class="list_box u-fx-ac-jc u-bold u-font-1 u-mar-10">梅沙河里小学
          <div class="btn u-fx-ac-jc u-font-01 ">检查待审核</div>
        </div>
        <div class="list_box u-fx-ac-jc u-bold u-font-1 u-mar-10">梅沙河里小学
          <div class="btn u-fx-ac-jc u-font-01 ">检查待审核</div>
        </div>
        <div class="list_box u-fx-ac-jc u-bold u-font-1 u-mar-10">梅沙河里小学
          <div class="btn u-fx-ac-jc u-font-01 ">检查待审核</div>
        </div>
        <div class="list_box u-fx-ac-jc u-bold u-font-1 u-mar-10">梅沙河里小学
          <div class="btn u-fx-ac-jc u-font-01 ">检查待审核</div>
        </div>

      </div>
    </div>
    <special-detail ref="SpecialDetail" ></special-detail>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SpecialDetail from './SpecialDetail'
export default {
  name: 'Views',
  components: {
    // SpecialDetail: () => import('./SpecialDetail')
    SpecialDetail
  },
  data() {
    this.code = this.$route.query.code || ''
    return {
      dataList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getStreetStatus']),
    async showList() {
      const res = await this.getStreetStatus(this.code)
      console.log(res)
      this.dataList = res.data
    },
    reviewDetails(id) {
      this.$refs.SpecialDetail.$refs.modal.visible = true
      this.$refs.SpecialDetail.showDetail(id)
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.add-find {
  padding: 20px;
  .card{
    .title-tab{
    border-bottom: 1px solid #DEDEDE;
    height: 30px;
    position: relative;
    display: flex;
    justify-content: space-between;
      .title-tab-pane{
        height: 30px;
        font-size: 14px;
        color: #666;
        margin-right: 40px;
        border-bottom: 1px solid #DEDEDE;
        display: inline-block;
        font-weight: 400;
        cursor: pointer;
        &.on{
          color: #6882da;
          border-bottom: 2px solid #6882da;
          font-weight: bold;
        }
      }
    }
    .list_box{
      width: 250px;
      height: 100px;
      background: url('../../assets/img/wanchengbg.png')  no-repeat;
      background-size:100% 100%;
      .btn{
        margin-top: 5px;
        color: #fff;
        width: 90px;
        height: 25px;
        background-color: #ff5454;
        border-radius: 15px;
      }
      .green{
        background-color: #00a35f;
      }
    }
  }
}
</style>
