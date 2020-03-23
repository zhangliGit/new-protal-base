<template>
  <div class="page-layout qui-fx-ver">
    <choose-user ref="user" @submit="submitUser" v-model="chooseTag"></choose-user>
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left"></div>
    </search-form>
    <a-table
      :pagination="false"
      :rowKey="record => record.id"
      :columns="columns"
      :dataSource="doorList"
    >
      <template slot="index" slot-scope="text, record, index">{{ index + 1 }}</template>
      <template slot="doorDevice" slot-scope="text">
        <div v-for="(control, index) in text" :key="index" class="control-list">
          <delete-tag @delTag="delControl" :tag-info="control"></delete-tag>
        </div>
      </template>
      <template slot="doorUser" slot-scope="text">
        <div v-for="(user, index) in text" :key="index" class="control-list">
          <delete-tag @delTag="delControl" :tag-info="user"></delete-tag>
        </div>
      </template>
      <template slot="actions" slot-scope="text">
        <a-tag>绑定设备</a-tag>
        <a-tag @click="addUser">添加门卫</a-tag>
      </template>
    </a-table>
  </div>
</template>

<script>
import DeleteTag from '@c/DeleteTag'
import ChooseUser from '@c/ChooseUser'
import SearchForm from '@c/SearchForm'
import { mapActions } from 'vuex'
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
    dataIndex: 'area',
    width: '15%'
  },
  {
    title: '门禁设备',
    dataIndex: 'doorDevice',
    width: '25%',
    scopedSlots: {
      customRender: 'doorDevice'
    }
  },
  {
    title: '门卫姓名',
    dataIndex: 'doorUser',
    width: '25%',
    scopedSlots: {
      customRender: 'doorUser'
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
      doorList: []
    }
  },
  mounted() {
    this.getDoorList()
  },
  methods: {
    ...mapActions('home', ['getDoorSet']),
    async getDoorList() {
      const res = await this.getDoorSet()
      this.doorList = res.data
    },
    addUser() {
      this.chooseTag = true
    },
    delControl() {},
    searchForm() {},
    submitUser() {
      setTimeout(() => {
        this.$refs.user.reset()
      }, 1200)
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
