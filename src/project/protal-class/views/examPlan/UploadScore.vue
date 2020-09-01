<template>
  <a-modal width="800px" title="录入成绩" v-model="status" :maskClosable="false" :destroyOnClose="true">
    <div class="upload-title"></div>
  </a-modal>
</template>

<script>
export default {
  name: 'ShowDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    status: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', false)
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    handleOk() {
      this.status = false
      this.$emit('submit')
    }
  }
}
</script>

<style lang="less"></style>
