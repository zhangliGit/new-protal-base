<template>
  <div class="home-page page-layout qui-fx-ver">
    <div class="select-year">
      <a-select :value="selectYear" style="width: 120px" @change="handleChangeYear">
        <a-select-option v-for="item in yearList" :value="item.value" :key="item.value">
          {{ item.title }}
        </a-select-option>
      </a-select>
      <a-button
        class="add-action-btn"
        icon=""
        :style="{ marginLeft: '20px', width: '78px', height: '30px' }"
        @click.stop="changeGrade"
      >
        切换
      </a-button>
    </div>
    <div class="stu-overview">
      <div class="view-item" v-for="item in viewList" :key="item.id">
        <div class="item-left">
          <img :src="item.icon" alt="" />
        </div>
        <div class="item-right">
          <span class="view-title">{{ item.title }}</span>
          <span class="view-count">{{ item.count }}</span>
        </div>
      </div>
    </div>
    <div class="task-list">
      <div class="task-title">
        <span class="title-icon"></span>
        <span>
          {{ title }}
        </span>
      </div>
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
    align: 'center'
  },
  {
    title: '招生人数',
    dataIndex: 'allCount',
    align: 'center'
  },
  {
    title: '申请人数',
    dataIndex: 'applyCount',
    align: 'center'
  },
  {
    title: '录取人数',
    dataIndex: 'enterCount',
    align: 'center'
  },
  {
    title: '已报到/未报道',
    dataIndex: 'isReport',
    align: 'center'
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
          count: 3000,
          icon: require('../../assets/img/zhaosheng@2x.png')
        },
        {
          id: 'applyCount',
          title: '申请人数',
          count: 2990,
          icon: require('../../assets/img/shenqing@2x.png')
        },
        {
          id: 'newStuCount',
          title: '迎新人数',
          count: 2990,
          icon: require('../../assets/img/yingxin@2x.png')
        },
        {
          id: 'reportCount',
          title: '报到人数',
          count: 2900,
          icon: require('../../assets/img/baodao@2x.png')
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
  methods: {
    handleChangeYear(value) {
      this.selectYear = value
    },
    changeGrade() {}
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
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;

  .view-item {
    display: flex;
    width: 350px;
    height: 140px;
    margin-left: 10px;
    padding: 0 10px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.06);
    border-radius: 9px;

    .item-left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 76px;
        height: 76px;
      }
    }

    .item-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      font-family: PingFang SC;
      color: #333333;

      .view-title {
        font-size: 16px;
        font-weight: 500;
      }

      .view-count {
        font-size: 35px;
        font-weight: bold;
      }
    }
  }
  .view-item:first-child {
    margin-left: 0;
  }
}
.task-list {
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
}
.task-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  font-weight: 500;

  .title-icon {
    display: block;
    width: 4px;
    height: 17px;
    background: #9698d6;
    margin-right: 14px;
  }
}
.task-table {
  box-sizing: border-box;
  padding: 10px 0;
}

/deep/ .ant-select-selection {
  border-color: #c9c9c9;
}
/deep/ .ant-table-thead tr th {
  background: rgba(150, 152, 214, 0.6) !important;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #515a6e;
}
/deep/ .ant-table-tbody tr td {
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #515a6e;
}
/deep/ .ant-table-tbody tr:hover {
  background-color: #EFF0F9;
}
</style>
