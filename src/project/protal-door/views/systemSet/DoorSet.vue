<template>
  <div class="page-layout qui-fx-ver">
    <choose-user ref="user" @submit="submitUser" is-check v-model="chooseTag"></choose-user>
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left"></div>
    </search-form>
    <a-table
      :pagination="false"
      :rowKey="record => record.placeCode"
      :columns="columns"
      :dataSource="doorList"
    >
      <template slot="index" slot-scope="text, record, index">{{ index + 1 }}</template>
      <template slot="controlGroupList" slot-scope="text">
        <div v-for="(control, index) in text" :key="index" class="control-list">
          <delete-tag @delTag="delControl" :tag-info="control"></delete-tag>
        </div>
      </template>
      <template slot="userInfoList" slot-scope="text,record">
        <div v-for="(user, index) in text" :key="index" class="control-list">
          <delete-tag @delTag="delUser(user,record)" :tag-info="userDeal(user)"></delete-tag>
        </div>
      </template>
      <template slot="actions" slot-scope="text">
        <a-tag>绑定设备</a-tag>
        <a-tag @click="addUser(text)">添加门卫</a-tag>
      </template>
    </a-table>
  </div>
</template>

<script>
import DeleteTag from '@c/DeleteTag'
import ChooseUser from '@c/ChooseUser'
import SearchForm from '@c/SearchForm'
import { mapState, mapActions } from 'vuex'
const searchLabel = [
  {
    value: 'name', // 表单属性
    type: 'input', // 表单类型
    label: '门卫姓名', // 表单label值
    placeholder: '请输入姓名' // 表单默认值(非必选字段)
  }
]
const columns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '出入口',
    dataIndex: 'placeName',
    width: '15%'
  },
  {
    title: '门禁设备',
    dataIndex: 'controlGroupList',
    width: '25%',
    scopedSlots: {
      customRender: 'controlGroupList'
    }
  },
  {
    title: '门卫姓名',
    dataIndex: 'userInfoList',
    width: '25%',
    scopedSlots: {
      customRender: 'userInfoList'
    }
  },
  {
    title: '操作',
    width: '25%',
    scopedSlots: {
      customRender: 'actions'
    }
  }
]
export default {
  name: 'DoorSet',
  components: { SearchForm, DeleteTag, ChooseUser },
  data() {
    return {
      chooseTag: false,
      columns,
      searchLabel,
      doorList: [],
      placeCode: '',
      pageSize: {
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.getDoorList()
  },
  methods: {
    ...mapActions('home', ['getDoorSet', 'addDoor', 'delDoor']),
    userDeal(user) {
      return {
        name: user.userName,
        ...user
      }
    },
    async getDoorList() {
      this.pageSize.schoolCode = this.userInfo.schoolCode
      const res = await this.getDoorSet(this.pageSize)
      this.doorList = res.data
    },
    addUser(text) {
      console.log('text', text)
      this.placeCode = text.placeCode
      this.chooseTag = true
    },
    delControl(user) {
      console.log('user', user)
    },
    delUser(user, record) {
      const req = {
        placeCode: record.placeCode,
        schoolCode: this.userInfo.schoolCode,
        userCode: user.userCode
      }
      this.delDoor(req).then(res => {
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.getDoorList()
        })
      })
    },
    searchForm() {},
    submitUser(item) {
      const userList = item.map(el => {
        el.userType = '1'
        return el
      })
      const req = {
        placeCode: this.placeCode,
        schoolCode: this.userInfo.schoolCode,
        userList: userList
      }
      this.addDoor(req).then(res => {
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.$refs.user.reset()
          this.getDoorList()
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.control-list {
  display: inline-block;
  margin: 0 10px 10px 0;
}
</style>
