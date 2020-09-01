<template>
  <div class="card-reading-recharge page-layout qui-fx-ver pad-l10" >
    <a-row class="heigth-40">
      <a-col >
        请将卡片放置在发卡器上
      </a-col>
    </a-row>
    <a-row class="heigth-50">
      <a-col :span="8">
        <a-input placeholder="请将卡片放置在发卡器上" />
      </a-col>
    </a-row>
    <a-row >
      <a-col class="pad-t10" :span="23">
        <a-menu :defaultSelectedKeys="['title']" class="top" mode="horizontal">
          <a-menu-item key="title">
            充值记录
          </a-menu-item>
        </a-menu>
      </a-col>

    </a-row>

  </div>
</template>

<script>
import { mapState } from 'vuex'
// import hostEnv from '@config/host-env'
export default {
  name: 'GradeTree',
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
      defaultExpandedKeys: [],
      schoolYearId: '',
      schoolYear: ''
    }
  },
  components: {
  },
  computed: {
    ...mapState('home', ['schoolCode'])
  },
  mounted() {
    this.initMenu()
  },
  methods: {

    async initMenu() {

    }
  }
}
</script>

<style lang="less" scoed>
.card-reading-recharge {
  padding: 50px 20px 20px 30px;
  .heigth-50{
    line-height: 50px;
  }
}
</style>
