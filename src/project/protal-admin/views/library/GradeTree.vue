<template>
  <div class="grade-tree">
    <a-skeleton v-if="treeData.length == 0 && !noData" active :paragraph="{rows: 10}" />
    <no-data v-if="noData" msg="暂无数据~"></no-data>
    <a-tree
      :showLine="true"
      :style="{ maxHeight: maxHeight + 'px' }"
      v-if="treeData.length > 0"
      :treeData="data"
      :defaultExpandAll="false"
    >
      <template slot="title" slot-scope="{ title,id }">
        <span @click="select(id)" class="u-type-primary-ligth-bg u-bd" >
          {{ title }}
        </span>
      </template>
    </a-tree>
  </div>
</template>

<script>
import NoData from '@c/NoData'
import { mapState } from 'vuex'
export default {
  name: 'GradeTree',
  components: {
    NoData
  },
  props: {
    treeData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      noData: false,
      data: [],
      maxHeight: 0
    }
  },
  watch: {
    treeData() {
      this.data = this.treeData
      this.maxHeight = window.screen.height - 280
      this.data = this.initData(this.treeData)
    }
  },
  computed: {
    ...mapState('home', ['schoolCode'])
  },
  created() {

  },
  mounted() {

  },
  methods: {
    initData(arr, parentId, parentName) {
      arr.forEach(i => {
        i.scopedSlots = {
          title: 'title'
        }
        i.title = i.categoryName
        i.key = i.id + Math.random()
        if (i.children && i.children.length > 0) {
          this.initData(i.children, i.key, i.title)
        }
      })
      return arr
    },
    onExpand() {},
    // 点击节点
    select(id) {
      this.$emit('select', id)
    }
  }
}
</script>

<style lang="less" scoed>
.grade-tree {
  padding: 0 10px;
  width: 220px;
  overflow-y: auto;
}
</style>
