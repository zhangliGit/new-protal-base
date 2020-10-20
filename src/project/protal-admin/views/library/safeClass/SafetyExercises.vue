<template>
  <div class="page-layout safetyExercises qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="exrcisesPageSearchLabel">
      <div slot="right">
        <a-button icon="del" class="add-action-btn u-mar-l10" @click="delAll">批量删除</a-button>
        <!-- <a-button icon="del" class="add-action-btn " @click="importExerci">导入</a-button> -->
        <a-button icon="del" class="add-action-btn " @click="downTemplate">下载模板</a-button>
        <a-button icon="plus" class="add-action-btn " @click="add(0)">添加习题</a-button>
        <a-button icon="del" class="add-action-btn " @click="exportExerci">导出</a-button>
        <a-upload
          style="width: 50px;"

          :multiple="false"
          :showUploadList="true"
          name="file"
          :fileList="fileList"
          :withCredentials="true"
          :customRequest="customRequest"
          :beforeUpload="beforeUpload"
        >
          <!-- accept=".xls" -->
          <!-- :data="{ fileType: 'xls' }" -->
          <a-button type="primary">导入</a-button>
        </a-upload>
      </div>
    </search-form>
    <table-list
      is-check
      is-zoom
      v-model="chooseList"
      @selectAll="selectAll"
      :page-list="pageList"
      :columns="exercisePageListColumns"
      :table-list="findList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑">
          <a-button size="small" class="edit-action-btn" icon="form" @click="add(1,action.record)"></a-button>
        </a-tooltip>
        <a-popconfirm
          placement="topLeft"
          ok-text="确定"
          cancel-text="取消"
          @confirm="delTask(action.record)">
          <template slot="title">
            确定删除该任务吗？
          </template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete" ></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
    <page-num v-if="total" v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>
<script>
import hostEnv from '@config/host-env'
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
import { exrcisesPageSearchLabel } from '../../../assets/js/searchLabel.js'
import { exercisePageListColumns } from '../../../assets/js/tableColumns'
import axios from 'axios'
export default {
  name: 'SafetyExercises',
  components: {
    TableList,
    PageNum,
    SearchForm
  },
  data() {
    return {
      exercisePageListColumns,
      exrcisesPageSearchLabel,
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      findList: [],
      chooseList: [], // 当有选择项时，被选中的项，返回每项的唯一id
      searchList: {},
      fileList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo', 'eduCode'])
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'ecsPage',
      'ecsRemove',
      'ecsRemoveAll',
      'ecsImport',
      'ecsExport',
      'ecsDownload'
    ]),
    async showList() {
      const req = {
        source: '1',
        ...this.pageList,
        ...this.searchList,
        userCode: this.userInfo.userCode,
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.ecsPage(req)
      this.findList = res.data.records
      this.total = res.data.total
    },
    searchForm(values) {
      this.searchList = values
      this.showList()
    },
    // 导出
    async exportExerci() {
      const req = {
        ...this.searchList,
        schoolCode: this.userInfo.schoolCode,
        source: '1'
      }
      if (this.chooseList.length === 0) {
        window.location.href = `${hostEnv.lz_safe}/class/exercises/export`
      } else {
        const req1 = {
          ...req,
          ids: this.chooseList
        }
        window.location.href = `${hostEnv.lz_safe}/class/exercises/export`
      }
      // const res = await this.ecsExport(req)
      // console.log(res)
    },
    // 下载模板
    async downTemplate() {
      window.location.href = `${hostEnv.lz_safe}/class/exercises/download`
      // const res = await this.ecsDownload()
      // window.open(res)
    },
    // 导入文件
    beforeUpload(file) {
      console.log(file)
      const isZip = file.type === 'application/vnd.ms-excel'
      if (!isZip) {
        this.$message.error('请上传格式为xls的文件')
      }
      return isZip
    },
    customRequest(data) {
      // 上传提交
      this.resList = []
      const formData = new FormData()
      formData.append('file', data.file)
      this.fileList = [data.file]
      this.saveFile(formData)
    },
    saveFile(formData) {
      axios({
        method: 'post',
        url: `${hostEnv.hzz_ecard}/accountInfo/importData?operator=${this.userInfo.userCode}`,
        data: formData
      }).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data)
          if (typeof res.data.data === 'string') {
            this.$message.error(res.data.data)
            return
          }
          this.$refs.importResult.addVisible = true
          this.bindObj = res.data.data
          this.bindObj.failData.map((ele, i) => {
            ele.id = i
          })
          this.fileList = []
        } else {
          this.$message.error(res.data.message)
          this.fileList = []
        }
      })
    },
    async importExerci() {
      // await this.ecsImport(record.id)
    },
    selectAll() {},
    async delTask(record) {
      await this.ecsRemove(record.id)
      this.showList()
    },
    async delAll() {
      if (this.chooseList.length <= 0) return
      const that = this
      this.$confirm({
        title: '提示',
        content: '确定删除该任务吗?',
        onOk () {
          that.ecsRemoveAll(that.chooseList).then(res => {
            that.$message.success('操作成功')
            that.showList()
          })
        },
        onCancel () {
        }
      })
    },
    add(type, record) {
      this.$router.push({
        path: '/safeClass/addExercises',
        query: {
          id: record ? record.id : '',
          type: type
        }
      })
    }

  }
}
</script>
<style lang="less" scoped>
.safetyExercises{
  height: 100%;
  width: 100%;

}
</style>
