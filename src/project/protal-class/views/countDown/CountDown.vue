<template>
  <div class="page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button icon="plus" class="add-btn" @click="modify(0)">创建</a-button>
      </div>
    </search-form>
    <div class="qui-fx-f1" style="overflow-y:scroll">
      <no-data msg="暂无数据" v-if="noticeList.length === 0">
        <div slot="btn">
          <a-button icon="plus" class="add-btn" @click="modify(0)">创建</a-button>
        </div>
      </no-data>
      <div class="qui-fx qui-fx-wp mar-20" style="    max-height: 400px;">
        <div class="notice-card" v-for="item in noticeList" :key="item.id">
          <div class="qui-fx-f1 qui-fx-ver qui-fx-jsb">
            <div class=" qui-fx">
              <a-popover>
                <template slot="content" v-for="cl in item.outCountDownClassDtoList">
                  {{ cl.gradeName }}{{ cl.className }}
                </template>
                <span class="content">应用于 {{ item.outCountDownClassDtoList.length }}个班级</span>
              </a-popover>
            </div>
            <div
              class="notice-img qui-fx-ac-jc"
              style=" background: #3c9bed "
              v-if="item.endTime >= new Date().getTime()"
            >
              <div class="juli_">
                <h2>
                  距离 <span>{{ item.name }}</span> {{ item.tips }}
                </h2>
                <h1>{{ Math.round((item.endTime - new Date().getTime()) / (1000 * 60 * 60 * 24)) }}天</h1>
              </div>
            </div>
            <div
              class="notice-img qui-fx-ac-jc"
              style=" background: #d3d3d3 "
              v-if="item.endTime < new Date().getTime()"
            >
              <div class="pState">
                <h2>距离{{ item.name }}{{ item.tips }}</h2>
                <h1>0天</h1>
              </div>
            </div>
            <div class="qui-fx-jsb qui-fx-ac">
              <div>
                <a-tag color="#3c9bed" class="content-state" v-if="item.endTime >= new Date().getTime()"> 进行中</a-tag>
                <a-tag color="#d3d3d3" class="content-state" v-if="item.endTime < new Date().getTime()"> 已过期</a-tag>
              </div>
              <div class=" qui-fx" v-if="item.endTime >= new Date().getTime()">
                <a-tooltip placement="topLeft" title="编辑">
                  <a-button size="small" class="edit-action-btn" icon="form" @click="modify(1, item)"></a-button>
                </a-tooltip>
                <a-tooltip placement="topLeft" title="删除">
                  <a-button size="small" class="del-action-btn" icon="delete" @click="deleteCount(item.id)"></a-button>
                </a-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    <add-count ref="addCount" :title="title" @update="showList"></add-count>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import SearchForm from '@c/SearchForm'
import PageNum from '@c/PageNum'
import Tools from '@u/tools'
import moment from 'moment'
import AddCount from '../../component/AddCount'
import NoData from '@c/NoData'
const searchLabel = [
  {
    list: [
      {
        key: '',
        val: '全部'
      },
      {
        key: 1,
        val: '进行中'
      },
      {
        key: 2,
        val: '已过期'
      }
    ],
    value: 'type',
    type: 'select',
    label: '类型'
  }
]
export default {
  name: 'CountDown',
  components: {
    SearchForm,
    PageNum,
    AddCount,
    NoData
  },
  data() {
    return {
      searchLabel,
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      recordList: [],
      noticeList: [],
      title: '创建倒数日',
      type: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created() {},
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getcountList', 'getcountDetail', 'delCount']),
    moment,
    async showList(type = '') {
      const req = {
        ...this.pageList,
        type,
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getcountList(req)
      this.noticeList = res.data.list
      console.log(this.$tools.getDate(this.noticeList[2].endTime).substring(0, 10))
      this.total = res.data.total
    },
    searchForm(values) {
      this.pageList.page = 1
      this.type = values.type

      this.showList(values.type)
    },
    async modify(type, item) {
      if (type) {
        const res = await this.getcountDetail(item.id)
        const data = res.data
        this.$refs.addCount.appForm = data
        this.$refs.addCount.id = data.id
        this.$refs.addCount.name = data.name
        this.$refs.addCount.tips = data.tips
        this.$refs.addCount.appForm.endTime = moment(new Date(data.endTime), 'YYYY-MM-DD')
        this.$refs.addCount.classList = data.outCountDownClassDtoList
        if (type === 1) {
          this.title = '编辑倒数日'
          this.$refs.addCount.isView = false
          this.$refs.addCount.isLoad = false
        }
      } else {
        this.title = '创建倒数日'
        this.$refs.addCount.classList = []
        this.$refs.addCount.appForm = {}
      }
      this.$refs.addCount.addVisible = true
    },
    deleteCount(id) {
      this.$tools.delTip('确认要删除吗？', () => {
        this.delCount(id).then(res => {
          this.$message.success('删除成功')
          this.$tools.goNext(() => {
            this.showList(this.type)
          })
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.mar-20 {
  margin: 0 10px;
}
.notice-card {
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 10px;
  width: calc(25% - 20px);
  margin: 0 10px;
  overflow: hidden;
  margin-bottom: 20px;
  min-height: 200px;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
  }
  .content {
    color: #666;
  }
  .useNum {
    color: @main-color;
  }
  .disable {
    color: #ccc;
  }
}
.notice-img {
  margin: 0 15px 10px 0;
  width: 100%;
  height: 200px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .juli_ {
    text-align: center;
    background: url(./img/bg_1.png);
    // margin: 0 15px 10px 0;
    width: 80%;
    height: 150px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    h1 {
      color: #b2d8fb;
      font-size: 30px;
    }
    h2 {
      color: #fff;
      font-size: 22px;
      padding-top: 5px;
      span {
        color: #3c9bed;
      }
    }
  }
}
.time {
  font-size: 18px;
  line-height: 21px;
  height: 21px;
}
.pState {
  text-align: center;
  background: url(./img/bg_2.png);
  // margin: 0 15px 10px 0;
  width: 80%;
  height: 150px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  h1 {
    color: #d3d3d3;
    font-size: 25px;
  }
  h2 {
    color: #d3d3d3;
  }
}
</style>
