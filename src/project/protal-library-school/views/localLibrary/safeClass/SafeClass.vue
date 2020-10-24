<template>
  <div class="Danger page-layout bg-fff u-padd-10">
    <a-tabs v-model="activeKey" class="a-tab" @change="callback">
      <a-tab-pane key="1" tab="安全课堂">
        <safe-class-item></safe-class-item>
      </a-tab-pane>
      <a-tab-pane key="2" tab="课堂习题" force-render>
        <safety-exercises v-if="activeKey==='2'"></safety-exercises>
      </a-tab-pane>
      <a-tab-pane key="3" tab="课堂资源" force-render>
        <class-resources v-if="activeKey==='3'"></class-resources>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
// import eventBus from '@u/eventBus'
export default {
  name: 'SafeClass',
  components: {
    SafeClassItem: () => import('./SafeClassItem'),
    safetyExercises: () => import('./SafetyExercises'),
    classResources: () => import('./ClassResources')
  },
  data() {
    return {
      activeKey: '1'
    }
  },
  created() {
    this.activeKey = this.$route.query.activeKey || '1'
  },
  mounted() {
  },
  methods: {
    callback(key) {
    }
  }
}
</script>
<style lang="less" scoped>
@deep: ~'>>>';
.Danger{
  .ant-tabs{
    height: 100%;
    @{deep} .ant-tabs-top-content.ant-tabs-content-animated{
      height: calc(100% - 60px);
    }
  }
}
</style>
