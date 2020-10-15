<template>
  <div class="Danger page-layout bg-fff u-padd-10">
    <a-tabs default-active-key="1" class="a-tab" @change="callback">
      <a-tab-pane key="1" tab="安全课堂">
        <safe-class-item></safe-class-item>
      </a-tab-pane>
      <a-tab-pane key="2" tab="课堂习题" force-render>
        <!-- <danger-supervision></danger-supervision> -->
      </a-tab-pane>
      <a-tab-pane key="3" tab="课堂资源" force-render>
        <!-- <danger-supervision></danger-supervision> -->
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  name: 'Danger',
  components: {
    SafeClassItem: () => import('./SafeClassItem')
    // DangerSupervision: () => import('./DangerSupervision')
    // DangerSupervision: () => import('./DangerSupervision')
  },
  data() {
    return {}
  },
  mounted() {},
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
