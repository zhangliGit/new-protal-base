<template>
  <div class="major-tree">
    <a-skeleton v-if="treeData.length == 0 && !noData" active :paragraph="{ rows: 10 }" />
    <no-data v-if="noData" msg="暂无数据~"></no-data>
    <a-tree
      :style="{ maxHeight: maxHeight + 'px' }"
      v-if="treeData.length > 0"
      @select="select"
      :treeData="treeData"
      :defaultExpandedKeys="defaultSelectedKeys"
      :defaultSelectedKeys="defaultSelectedKeys"
    ></a-tree>
  </div>
</template>

<script>
import NoData from '@c/NoData'
import $ajax from '@u/ajax-serve'
import { mapState } from 'vuex'
import hostEnv from '@config/host-env'
export default {
  name: 'MajorTree',
  props: {
    isChoose: {
      type: Boolean,
      default: false
    },
    school: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      noData: false,
      treeData: [],
      gradeId: '',
      classId: '',
      gradeList: [],
      defaultSelectedKeys: [],
      schoolYear: '',
      maxHeight: 0
    }
  },
  components: {
    NoData
  },
  computed: {
    ...mapState('home', ['schoolCode'])
  },
  mounted() {
    this.maxHeight = window.screen.height - 280
    this.initMenu()
  },
  methods: {
    // 点击节点
    select(obj, tree) {
      if (obj.length === 0) {
        return
      }
      const gradeIds = []
      this.gradeList.forEach((el) => {
        return gradeIds.push(el.gradeId)
      })
      if (gradeIds.indexOf(obj[0]) === -1) {
        this.classId = obj[0]
      } else {
        this.gradeId = obj[0]
        this.classId = ''
      }
      if (tree.selectedNodes.length === 0) return
      const selectObj = {
        title: tree.selectedNodes[0].data.props.title,
        code: tree.selectedNodes[0].data.props.code,
        gradeName: tree.selectedNodes[0].data.props.gradeName,
        subjectCode: tree.selectedNodes[0].data.props.subjectCode,
        classCode: tree.selectedNodes[0].data.props.classCode
      }
      this.$emit('select', selectObj)
    },
    // 获取节点数据
    async initMenu() {
      const req = {
        schoolCode: this.school ? this.school : this.schoolCode
      }
      const res = await $ajax.get({
        url: `${hostEnv.ljj_admin}/class/manage/node`,
        params: req
      })
      if (res.data === null || res.data.length === 0) {
        this.noData = true
        return
      } else {
        this.noData = false
      }
      const selectObj = {
        title: res.data[0].gradeName + '级',
        code: res.data[0].gradeCode,
        key: res.data[0].gradeCode,
        gradeName: res.data[0].gradeName,
        subjectCode: '',
        classCode: ''
      }
      this.defaultSelectedKeys = [res.data[0].gradeCode]
      this.treeData = res.data.map((item) => {
        return {
          gradeName: item.gradeName,
          subjectCode: '',
          classCode: '',
          title: item.gradeName + '级',
          code: item.gradeCode,
          key: item.gradeCode,
          children: item.subjectNodeDtos ? this.filterSub(item.subjectNodeDtos) : []
        }
      })
      this.$emit('select', selectObj)
    },
    // 处理专业节点
    filterSub(data) {
      const newData = data.map(el => {
        return {
          gradeName: el.gradeName,
          subjectCode: el.subjectCode,
          classCode: '',
          title: el.subjectName,
          code: el.subjectCode,
          key: el.subjectCode,
          children: el.classNodeDtos ? this.filterClass(el.classNodeDtos, el.gradeName, el.subjectCode) : []
        }
      })
      return newData
    },
    // 处理班级节点
    filterClass(data, gradeName, subjectCode) {
      const newData = data.map(el => {
        return {
          gradeName: gradeName,
          subjectCode: subjectCode,
          classCode: el.classCode,
          title: el.className,
          code: el.classCode,
          key: el.classCode
        }
      })
      return newData
    }
  }
}
</script>

<style lang="less" scoed>
.major-tree {
  padding: 0 10px;
  width: 220px;
  overflow-y: auto;
}
</style>
