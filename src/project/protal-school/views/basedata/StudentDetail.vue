<template>
  <div class="student-detail page-layout qui-fx-ver">
    <div class="tit">
      <p class="qui-fx qui-fx-ac">基本信息</p>
    </div>
    <div class="top">
      <div class="qui-fx-ver">
        <p class="info qui-fx">
          <span>学年：2018-2019学年</span>
          <span>姓名：张思</span>
          <span>学号：2900080123</span>
          <span>年级：一年级</span>
          <span>班级：1班</span>
          <span>入学年份：2019</span>
          <span>性别：男</span>
          <span>卡号：40012058545</span>
        </p>
        <p class="phone qui-fx">
          <span class="qui-fx-ac">人脸：</span>
          <a-popover placement="right" v-for="i in 3" :key="i">
            <template slot="content">
              <img src="http://canpoint.oss-cn-beijing.aliyuncs.com/2019/11/11/168f2f964c8c48b09fc0be10dc9d9025.jpg" style="max-width: 200px; max-height: 220px; display: block;" alt="">
            </template>
            <img src="http://canpoint.oss-cn-beijing.aliyuncs.com/2019/11/11/168f2f964c8c48b09fc0be10dc9d9025.jpg" style="max-width: 50px; max-height: 50px; display: block;" alt="">
          </a-popover>
        </p>
        <span>备注：安全回家</span>
      </div>
    </div>
    <div class="tit">
      <p class="qui-fx qui-fx-ac">学生家长</p>
    </div>
    <div class="content qui-fx-ver qui-fx-f1">
      <div class="add qui-fx-je qui-fx-ac">
        <span>设置主要家长：</span>
        <a-select placeholder="请选择" style="width: 100px" @change="parentChange">
          <a-select-option v-for="i in 6" :key="i" :value="i">
            家长{{ i }}
          </a-select-option>
        </a-select>
        <a-button style="margin-left:20px" type="primary" @click="save">保存</a-button>
      </div>
      <div class="table qui-fx-ver qui-fx-f1">
        <table-list
          :columns="columns"
          :table-list="parentsList">
        </table-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
const columns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '家长姓名',
    dataIndex: 'userName',
    width: '10%'
  },
  {
    title: '家长电话',
    dataIndex: 'phone',
    width: '10%'
  },
  {
    title: '亲属关系',
    dataIndex: 'relation',
    width: '10%'
  },
  {
    title: '注册时间',
    dataIndex: 'birthday',
    width: '10%'
  }
]
export default {
  name: 'StudentDetail',
  components: {
    TableList
  },
  data () {
    return {
      columns,
      parentsList: [],
      selectedParent: ''
    }
  },
  mounted () {
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'getIndex'
    ]),
    async showList () {
      const res = await this.getIndex()
      this.parentsList = res.data
    },
    parentChange (value) {
      this.selectedParent = value
    },
    save () {
      console.log(this.selectedParent)
    }
  }
}
</script>
<style lang="less" scoped>
.student-detail{
  height:100%;
  padding-top: 10px;
  .tit{
    margin-bottom: 20px;
    p{
      border-left: 3px solid #6882da;
      padding-left: 10px;
      font-weight: bold;
      margin: 0 0 0 10px;
      line-height: 25px;
      height: 25px;
      font-size: 16px;
    }
  }
   .top{
    background: #fff;
    border:1px solid #ddd;
    padding: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    .info{
      margin-bottom: 20px;
      span{
        margin-right: 50px;
      }
    }
    .phone{
      margin-bottom: 20px;
      img{
        width: 50px;
        height: 50px;
        margin-right: 20px;
        border-radius: 4px;
      }
    }
  }
  .content{
    background: #fff;
    padding: 0 20px;
    .add{
      max-width: 1000px;
      margin:10px 0;
    }
    .table{
      max-width: 1000px;
      margin-bottom: 20px;
    }
  }
}
</style>
