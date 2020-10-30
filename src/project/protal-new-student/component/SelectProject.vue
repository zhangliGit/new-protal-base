<template>
  <a-modal
    class="list-modal"
    :title="title"
    :visible="visible"
    @cancel="cancelSelect"
    :maskClosable="false"
    :destroyOnClose="true"
    width="70%"
    @ok="addHandle"
  >
    <div>
      <a-row>
        <a-col :span="5"> 2020级专业： </a-col>
        <a-col :span="17">
          <div class="checkbox-list">
            <div v-for="item in projectList" :key="item.id" class="checkbox-item">
              <a-checkbox :checked="item.checked" @change="selectProject(item.id)"> {{ item.projectName }} </a-checkbox>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-modal>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    projectList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {},
  methods: {
    cancelSelect() {
      this.$emit('cancel')
    },
    addHandle() {
      const list = this.projectList.filter((item) => {
        return item.checked === true
      })
      this.$emit('submit', list)
    },
    selectProject(id) {
      this.$emit('clickSelect', id)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .ant-col .checkbox-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  .checkbox-item {
    width: 100px;
  }
}
</style>
