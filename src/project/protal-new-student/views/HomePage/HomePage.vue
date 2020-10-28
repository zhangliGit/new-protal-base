<template>
  <div class="home-page page-layout qui-fx-ver">
    <div class="stu-overview">
      <div class="view-item" v-for="item in viewList" :key="item.id">
        <span>{{ item.title }}</span>
        <span>{{ item.count }}</span>
      </div>
    </div>
    <div class="task-list">
      <div class="task-title">{{ title }}</div>
      <div class="task-table">
        <table-list :columns="columns" :table-list="taskList" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TableList from '@c/TableList'
const columns = [
  {
    title: '任务名称',
    dataIndex: 'taskName',
    width: '25%'
  },
  {
    title: '专业名称',
    dataIndex: 'subjectName',
    width: '20%'
  },
  {
    title: '招生人数',
    dataIndex: 'allCount',
    width: '10%'
  },
  {
    title: '申请人数',
    dataIndex: 'applyCount',
    width: '10%'
  },
  {
    title: '已报道',
    dataIndex: 'hasReport',
    width: '10%'
  },
  {
    title: '未报道',
    dataIndex: 'noReport',
    width: '10%'
  },
  {
    title: '已缴费',
    dataIndex: 'hasPay',
    width: '10%'
  }
]

export default {
  name: 'HomePage',
  components: {
    TableList
  },
  data() {
    return {
      columns,
      title: '招生任务',
      taskList: [
        {
          taskName: '2020计算机学院招生计划',
          subjectName: '软件技术',
          allCount: 600,
          applyCount: 500,
          hasReport: 458,
          noReport: 300,
          hasPay: 300
        },
        {
          taskName: '2020计算机学院招生计划',
          subjectName: '软件测试',
          allCount: 400,
          applyCount: 360,
          hasReport: 350,
          noReport: 300,
          hasPay: 300
        }
      ],
      studentCount: {
        planCount: 3000,
        applyCount: 2899,
        newCount: 2899,
        reportCount: 2000,
        hasPay: 1999
      },
      viewList: [
        {
          id: 'planCount',
          title: '计划招生人数',
          count: 3000
        },
        {
          id: 'applyCount',
          title: '申请人数',
          count: 2990
        },
        {
          id: 'newStuCount',
          title: '迎新人数',
          count: 2990
        },
        {
          id: 'reportCount',
          title: '报到人数',
          count: 2900
        },
        {
          id: 'hasPayCount',
          title: '已缴费人数',
          count: 2500
        }
      ]
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.home-page {
  padding: 20px 40px;
  box-sizing: border-box;
}
.stu-overview {
  overflow: hidden;

  .view-item {
    float: left;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 240px;
    height: 120px;
    margin-right: 30px;
    margin-bottom: 30px;
    padding: 10px 0;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
.task-list {
  border: 1px solid rgba(242, 242, 242, 1);
  border-top: 0;
}
.task-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 46px;
  padding: 0 10px;
  font-size: 16px;
  background: rgba(242, 242, 242, 1);
}
.task-table {
  box-sizing: border-box;
  padding: 20px 40px;
}
</style>
