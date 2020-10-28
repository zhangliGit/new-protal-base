<template>
  <div class="page-layout classResources qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="resourcesPageSearchLabel">
      <div slot="right">
        <a-button icon="plus" class="add-action-btn mar-l10" @click="add(0)">添加资源</a-button>
      </div>
    </search-form>
    <table-list
      is-check
      is-zoom
      v-model="chooseList"
      @selectAll="selectAll"
      :page-list="pageList"
      :columns="resourcesPageListColumns"
      :table-list="findList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑">
          <a-button size="small" class="edit-action-btn" icon="form" @click="add(1,action.record)"></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="下载">
          <a-button size="small" class="download-action-btn" icon="download" @click="download(action.record)"></a-button>
        </a-tooltip>
        <a-popconfirm
          placement="topLeft"
          ok-text="确定"
          cancel-text="取消"
          @confirm="delResources(action.record)">
          <template slot="title">
            确定删除该任务吗？
          </template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete" ></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    <canvas width="500" height="500" id="canvas"></canvas>
  </div>
</template>
<script>
<<<<<<< HEAD
import html2canvas from 'html2canvas'
import hostEnv from '@config/host-env'
=======

>>>>>>> 8b329c2d398082eb42e30b90ec8ab85b65474074
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SearchForm from '@c/SearchForm'
import { resourcesPageSearchLabel } from '../../../assets/js/searchLabel.js'
import { resourcesPageListColumns } from '../../../assets/js/tableColumns'
export default {
  name: 'ClassResources',
  components: {
    TableList,
    PageNum,
    SearchForm
  },
  data() {
    return {
      resourcesPageListColumns,
      resourcesPageSearchLabel,
      total: 0,
      pageList: {
        page: 1,
        size: 20
      },
      findList: [],
      chooseList: [], // 当有选择项时，被选中的项，返回每项的唯一id
      searchList: {}
    }
  },
  computed: {
    ...mapState('home', ['userInfo', 'eduCode'])
  },
  created() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['pageResource', 'delResource']),
    async showList() {
      const req = {
        source: '1',
        ...this.pageList,
        ...this.searchList,
        userCode: this.userInfo.userCode,
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.pageResource(req)
      this.findList = res.data.records
      this.total = res.data.total
    },
    searchForm(values) {
      this.searchList = values
      this.showList()
    },
    selectAll() {},
    async delResources(record) {
      await this.delResource(record.id)
      this.showList()
    },
    // 下载图片
    downloadImg(url) {
      const canvas = document.getElementById('canvas')
      const aLink = document.createElement('a')
      aLink.download = '下载图片'
      aLink.href = canvas.toDataURL(url)
      aLink.dispatchEvent(new MouseEvent('click', {}))
    },
    // 不跳转下载
    download(record) {
      const url = record.resourceUrl
      const reg = /\.(gif|jpg|jpeg|png|GIF|JPEG|JPG|PNG)$/
      const isImg = reg.test(url)
      if (isImg) {
        this.downloadImg(url)
      } else {
        var a = document.createElement('a')
        a.id = 'expertFile'
        a.href = url
        document.body.append(a)
        a.click()
        document.getElementById('expertFile').remove()
      }
    },
    add(type, record) {
      this.$router.push({
        path: '/safeClass/addResources',
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
.classResources{
  height: 100%;
  width: 100%;

}
</style>
