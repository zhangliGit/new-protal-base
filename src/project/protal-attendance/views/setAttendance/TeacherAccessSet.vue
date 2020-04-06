<template>
  <div class="page-layout qui-fx-ver">
    <div class="qui-fx-jsb qui-fx-ac">
      <div></div>
      <div class="top-btn-group">
        <a-button icon="plus" type="primary" @click="addGroup(0)">添加考勤组</a-button>
      </div>
    </div>
    <table-list :page-list="pageList" :columns="columns" :table-list="recordList">
      <template v-slot:accessTimes="accessTime">
        <div class="qui-fx-ver">
          <div class="qu-fx" v-for="item in accessTime.record.accessTime" :key="item.id">
            <span style="margin-right:10px;">{{ item.week }}</span>
            <span>{{ item.time.toString() }}</span>
          </div>
        </div>
      </template>
      <template v-slot:accessEqs="accessEq">
        <div class="qui-fx-ver">
          <div class="qu-fx" v-for="item in accessEq.record.accessEq" :key="item.id">
            <span>{{ item.eq }}</span>
          </div>
        </div>
      </template>
      <template v-slot:crews="crew">
        <div class="qui-fx qui-fx-ac">
          {{ crew.record.crew.toString() }}
          <a-button
            size="small"
            type="primary"
            icon="plus"
            style="margin-left:10px;"
            @click="addCrew(crew.record.id)"
          ></a-button>
        </div>
      </template>
      <template v-slot:actions="action">
        <div>
          <a-tooltip placement="topLeft" title="编辑">
            <a-button
              size="small"
              icon="form"
              @click="addGroup(1,action.record.id)"
              style="margin-right: 5px; background: #67BCDA; color:#fff"
            ></a-button>
          </a-tooltip>
          <a-tooltip placement="topLeft" title="删除">
            <a-button
              size="small"
              @click="delGroup(action.record.id)"
              icon="delete"
              style="margin-right: 5px; background: #ff4949; color:#fff"
            ></a-button>
          </a-tooltip>
        </div>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from './TableList'
import PageNum from '@c/PageNum'
const columns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '考勤组名称',
    dataIndex: 'name',
    width: '10%'
  },
  {
    title: '考勤时间',
    dataIndex: 'accessTime',
    width: '20%',
    scopedSlots: {
      customRender: 'accessTime'
    }
  },
  {
    title: '考勤设备',
    dataIndex: 'accessEq',
    width: '20%',
    scopedSlots: {
      customRender: 'accessEq'
    }
  },
  {
    title: '考勤人员',
    width: '20%',
    scopedSlots: {
      customRender: 'crew'
    }
  },
  {
    title: '操作',
    width: '20%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'TeacherAccessSet',
  components: {
    TableList,
    PageNum
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  data() {
    return {
      columns,
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      recordList: []
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getAccessList']),
    async showList() {
      const req = {
        ...this.pageList,
        // schoolCode: this.userInfo.schoolCode,
        schoolCode: 'QPZX',
        type: '1'
      }
      const res = await this.getAccessList(req)
      this.total = res.total
      this.recordList = res.data.list
    },
    // 添加控制组
    addGroup(type, id) {
      console.log(123)
      const obj = {
        path: '/teacherAccessSet/setGroup',
        query: type === 0 ? { type: 'teacher' } : { id, type: 'teacher' }
      }
      this.$router.push(obj)
    },
    // 删除控制组
    delGroup(id) {
      this.$tools.delTip('确定删除吗?', () => {
        console.log(id)
      })
    },
    // 适用人员管理
    addCrew(id) {
      console.log(id)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
