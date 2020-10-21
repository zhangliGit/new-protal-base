<template>
  <div class="template-show">
    <div class="template-list" v-for="(notice, index) in dataList" :key="index">
      <div class="u-fx-ac u-fx-jsb title">
        <div class="name u-bold u-font-2">{{ notice.title }}</div>
        <div>
          <a-tag color="blue">
            编辑
          </a-tag>
          <a-tag color="red">
            删除
          </a-tag>
        </div>
      </div>
      <div class="pic"></div>
      <div class="content">{{ notice.content }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TemplateList',
  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.template-list {
  border: 2px #f5f5f5 solid;
  box-shadow: 0 0 4px #eee;
  width: 23%;
  margin-left: 1.6%;
  float: left;
  .title {
    padding: 0 10px;
    height: 40px;
  }
  .pic {
    width: 100%;
    height: 150px;
    background-color: @u-bg-color;
  }
  .content {
    height: 25 0px;
    overflow-y: auto;
    color: @u-content-color;
    line-height: 24px;
    padding: 15px;
  }
}
</style>
