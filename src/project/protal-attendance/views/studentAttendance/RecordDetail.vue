<template>
  <a-modal
    width="800px"
    title="操作记录"
    v-model="dialogTag"
    :maskClosable="false"
    :destroyOnClose="true"
    :footer="null"
  >
    <table-list
      :columns="columns"
      :table-list="recordList">
    </table-list>
  </a-modal>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import columns from '../../assets/js/table/studentOperate'
export default {
  name: 'RecordDetail',
  components: {
    TableList
  },
  data () {
    return {
      dialogTag: false,
      columns,
      recordList: [],
      recordId: ''
    }
  },
  async mounted () {
  },
  methods: {
    ...mapActions('home', [
      'getStudentOperate'
    ]),
    async showList () {
      const res = await this.getStudentOperate({ id: this.recordId })
      this.recordList = res.data
    }
  }
}
</script>
<style lang="less" scoped>
</style>
