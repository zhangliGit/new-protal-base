<template>
  <div class="leave-detail page-layout qui-fx-ver">
    <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
      <a-menu-item key="title">
        {{ title }}
      </a-menu-item>
    </a-menu>
    <div class="info qui-fx-wp">
      <p v-for="item in detailInfo" :key="item.key">
        <span>{{ item.key }}</span>
        <span>:</span>
        <span>{{ item.val }}</span>
      </p>
    </div>
    <!--     <div class="pic qui-fx-wp">
      <p>
        <span>图片</span>
        <span>:</span>
        <span></span>
      </p>
    </div> -->
    <a-menu :defaultSelectedKeys="['title']" mode="horizontal">
      <a-menu-item key="title">审批流程</a-menu-item>
    </a-menu>
    <div class="title">
      <p>审批人</p>
    </div>
    <div class="process qui-fx-jsb qui-fx-ac">
      <div class="qui-fx-jsa qui-fx-ac">
        <img :src="approveImg" alt="">
        <div class="qui-fx-ver">
          <span>{{ approveName }}</span>
          <span>{{ approveState }}</span>
        </div>
      </div>
      <span>{{ approveTime }}</span>
    </div>
    <div class="title">
      <p>抄送人</p>
    </div>
    <div class="process qui-fx-jsb qui-fx-ac" v-for="item in leaveData" :key="item.id">
      <div class="qui-fx-jsa qui-fx-ac">
        <img :src="item.photoPic" alt="">
        <div class="qui-fx-ver">
          <span>{{ item.name }}</span>
          <span>{{ item.status | getStatus() }}</span>
        </div>
      </div>
      <span>{{ item.dealTime }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'StudentLeaveDetail',
  components: {
  },
  data () {
    return {
      current: 'title',
      detailInfo: [
        {
          key: '姓名',
          val: '张三'
        },
        {
          key: '年级',
          val: '一年级'
        },
        {
          key: '班级',
          val: '1班'
        },
        {
          key: '请假事由',
          val: '事假'
        },
        {
          key: '是否出校',
          val: '是'
        },
        {
          key: '审批单号',
          val: '20191210113331957'
        },
        {
          key: '请假时间',
          val: '2019-12-10 11:31:00 ~ 2019-12-11 11:31:00'
        },
        {
          key: '请假时长',
          val: '24小时'
        },
        {
          key: '审批状态',
          val: '审批通过'
        }
      ],
      title: '基本信息',
      leaveData: [],
      approveName: '',
      approveState: 0,
      approveTime: '',
      approveImg: ''
    }
  },
  async mounted () {
    this.showData()
  },
  methods: {
    ...mapActions('home', [
      'studentsLeaveProcess'
    ]),
    async showData () {
      const res = await this.studentsLeaveProcess()
      this.leaveData = res.data
      console.log(this.leaveData)
      this.approveName = this.leaveData[0].name
      this.approveTime = this.leaveData[0].dealTime
      this.approveImg = this.leaveData[0].photoPic
      this.approveState = this.leaveData[0].status === 1 ? '待审批' : this.leaveData[0].status === 2 ? '审批通过' : '审批不通过'
    }
  }
}
</script>
<style lang="less" scoped>
.leave-detail{
  background: #fff;
  .info,.pic{
    margin-top:20px;
    padding: 0 20px;
    p{
      margin-right: 50px;
      span{
        margin:0 5px;
      }
    }
  }
  .pic{
    margin-top:0;
  }
  .title{
    margin:10px;
    p{
      margin:0;
      font-weight: bold;
    }
  }
  .process{
    width: 400px;
    margin:10px;
    img{
      width: 60px;
      height: 60px;
      background: #ddd;
      border-radius: 100%;
      margin-right: 10px;
    }
  }
}
</style>
