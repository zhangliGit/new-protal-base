<template>
  <div class="home page-layout qui-fx-ver">
    <a-modal
      :title="checkTitle"
      :visible="checkVisible"
      :confirm-loading="confirmLoading"
      @ok="handleCheckOk"
      @cancel="handleCheckCancel"
    >
      <div class="check-result check-box">
        <div class="check-title">审核结果：</div>
        <div class="check-area">
          <a-radio-group name="radioGroup" v-model="checkData.result">
            <a-radio :value="1"> 通过(录取) </a-radio>
            <a-radio :value="2"> 不通过(不录取) </a-radio>
          </a-radio-group>
        </div>
      </div>
      <div class="check-text check-box">
        <div class="check-title">审核意见：</div>
        <div class="check-area">
          <a-textarea
            :style="{ width: '100%' }"
            v-model="checkData.text"
            placeholder="请输入审核意见"
            :auto-size="{ minRows: 3, maxRows: 8 }"
          />
        </div>
      </div>
    </a-modal>
    <div class="head-btn">
      <a-button type="primary" @click="checkClick"> 审核 </a-button>
      <a-button type="primary" :style="{ marginLeft: '10px' }" @click="editMsg"> 编辑 </a-button>
    </div>
    <div class="message-box">
      <div class="base-message message">
        <div class="title">基本信息</div>
        <div class="base-msg-table">
          <div class="table-list">
            <div class="msg-item" v-for="item in baseList" :key="item.id">
              <div class="name common">{{ item.name }}</div>
              <div class="text common">{{ item.text }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="project-message message">
        <div class="title">审核信息</div>
        <div class="project-msg-table"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TaskDetails',
  components: {},
  data() {
    return {
      checkTitle: '审核',
      checkVisible: false,
      confirmLoading: false,
      checkData: {
        result: '',
        checkText: ''
      }
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    console.log(this.$route.query.id)
  },
  methods: {
    ...mapActions('home', ['getReserveList', 'delReserve']),
    async showList() {
      const req = {
        ...this.searchObj,
        ...this.pageList,
        schoolCode: this.userInfo.schoolCode,
        type: '1'
      }
      const res = await this.getReserveList(req)
      this.bookingList = res.data.list
      this.bookingList.map((el) => {
        el.placeName = el.placeName.replace(/,/g, '-')
      })
      this.total = res.data.total
    },
    // 打开审核弹框
    checkClick() {
      this.checkVisible = true
    },
    // 审核提交
    handleCheckOk() {
      this.checkVisible = false
    },
    // 取消审核
    handleCheckCancel() {
      this.checkVisible = false
    },
    // 编辑
    editMsg() {
      const id = this.$route.query.id
      this.$router.push({
        path: `/taskManage/addTask`,
        query: {
          id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px 40px;
}
.check-box {
  display: flex;

  .check-title {
    width: 100px;
    margin-bottom: 20px;
  }
  .check-area {
    flex: 1;
  }
}
.head-btn {
  width: 80%;
  margin: 0 auto;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.message-box {
  flex: 1;
  overflow-y: scroll;
}
.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  height: 46px;
  padding: 0 10px;
  font-size: 16px;
  background: rgba(242, 242, 242, 1);
}
.message {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.base-message {
  padding: 30px 0;
  margin-bottom: 50px;

  .base-msg-table {
    display: flex;
    box-sizing: border-box;
    width: 80%;
    padding: 40px 100px;
    border: 1px solid rgba(242, 242, 242, 1);

    .table-list {
      display: flex;
      flex-wrap: wrap;
      flex: 1;

      .msg-item {
        display: flex;
        width: 50%;
        border: 1px solid #ccc;

        .common {
          box-sizing: border-box;
          height: 40px;
          padding: 0 8px;
        }

        .name {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 40%;
          background-color: rgba(242, 242, 242, 1);
        }
        .text {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 60%;
        }
      }
      .msg-item:nth-child(1) {
        border-bottom: 0;
      }
      .msg-item:nth-child(2) {
        border-left: 0;
        border-bottom: 0;
      }
      .msg-item:nth-child(4) {
        border-left: 0;
      }
      .msg-item:nth-child(5) {
        border-top: 0;
      }
    }
  }
}

.project-message {
  padding: 30px 0;
  .project-msg-table {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    box-sizing: border-box;
    width: 80%;
    padding: 40px 100px;
    border: 1px solid rgba(242, 242, 242, 1);
  }

  /deep/ .ant-table-thead {
    background: rgba(242, 242, 242, 1);
  }
}
</style>
