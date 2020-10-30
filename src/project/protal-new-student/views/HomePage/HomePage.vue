<template>
  <div class="home-page page-layout qui-fx-ver">
    <div class="select-year">
      <a-select :value="selectYear" style="width: 120px" @change="handleChangeYear">
        <a-select-option v-for="item in yearList" :value="item.value" :key="item.value">
          {{ item.title }}
        </a-select-option>
      </a-select>
    </div>
    <div class="stu-overview">
      <div class="view-item" v-for="item in viewList" :key="item.id">
        <span>{{ item.title }}</span>
        <span class="view-count">{{ item.count }}</span>
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
    title: '录取人数',
    dataIndex: 'enterCount',
    width: '10%'
  },
  {
    title: '已报到/未报道',
    dataIndex: 'isReport',
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
      yearList: [
        {
          value: '2020',
          title: '2020级'
        },
        {
          value: '2019',
          title: '2019级'
        }
      ],
      selectYear: '2020',
      columns,
      title: '招生专业',
      taskList: [
        {
          subjectName: '软件技术',
          allCount: 600,
          applyCount: 500,
          enterCount: 458,
          isReport: '300/300'
        },
        {
          subjectName: '软件测试',
          allCount: 400,
          applyCount: 360,
          enterCount: 350,
          isReport: '300/300'
        }
      ],
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
        }
        // {
        //   id: 'hasPayCount',
        //   title: '已缴费人数',
        //   count: 2500
        // }
      ]
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    handleChangeYear(value) {
      this.selectYear = value
    }
  }
}
</script>
<style lang="less" scoped>
.home-page {
  padding: 20px 40px;
  box-sizing: border-box;
}
.stu-overview {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 30px 0;

  .view-item {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 260px;
    height: 120px;
    padding: 10px 0;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;

    .view-count {
      font-weight: bold;
    }
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
