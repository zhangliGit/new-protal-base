<template>
  <div></div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import $tools from '@u/tools'
import task from '../../assets/js/table/task'
export default {
  name: 'MyTask',
  components: {
    TableList,
    PageNum,
    SearchForm
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    // this.showList()
  },
  methods: {
    ...mapActions('home', ['getMySafeTask', 'submitMyTask']),
    async showList() {
      this.searchList.schoolCode = this.userInfo.schoolCode
      this.searchList = Object.assign(this.searchList, this.pageList)
      const res = await this.getMySafeTask(this.searchList)
      this.taskList = res.data.records
      this.total = res.data.total
    },
    searchForm(values) {
      this.searchList = Object.assign(this.searchList, values)
      this.pageList.page = 1
      this.pageList.size = 20
      this.showList()
    },
    add(record) {
      this.$router.push({
        path: '/myTask/fillTask',
        query: {
          id: record ? record.id : ''
        }
      })
    },
    async addApp(type, record) {
      this.$router.push({
        path: '/inspectArea/areaAdd',
        query: {
          id: record ? record.record.id : ''
        }
      })
    },
    async submit() {
      await this.submitMyTask()
      this.$message.success('操作成功')
      this.$tools.goNext(() => {
        this.showList()
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
