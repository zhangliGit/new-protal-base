<template>
  <a-drawer
    title="绑定应用"
    :width="600"
    @close="onClose"
    :visible="visible"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    :destroyOnClose="true"
  >
    <a-alert message="点击选中应用模块，再次点击则取消，可同时选中多个模块" banner />
    <div class="app">
      <no-data v-if="applyList.length === 0" msg="暂无关联应用~"></no-data>
      <div
        :class="['app-check qui-fx-ac-jc',{'app-choose':item.check}]"
        v-for="(item,index) in applyList"
        :key="item.id"
        style="borderRadius:4px;"
        v-else
        @click="appClick(index)">
        <img class="right-img" :src="item.logoUrl" alt="">
        <div class="title qui-te">{{ item.appName }}</div>
        <!-- <div class="title" v-if="item.appName.length <= 8">{{ item.appName }}</div>
        <a-tooltip placement="bottomLeft" :title="item.appName" v-if="item.appName.length > 8">
          <div class="title">{{ item.appName.substring(0,8) }}...</div>
        </a-tooltip> -->
      </div>
    </div>
    <div
      :style="{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
      }"
    >
      <a-button :style="{marginRight: '8px'}" @click="onClose"> 取消 </a-button>
      <a-button @click="onDefine" type="primary">确定</a-button>
    </div>
  </a-drawer>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import NoData from '@c/NoData'
// import choose from '@a/img/choose.png'
export default {
  name: 'BindDrawer',
  components: {
    NoData
  },
  props: {
    schoolInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: false
    },
    bindList: {
      type: Array,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      applyList: [],
      searchValue: '',
      chooseValue: []
    }
  },
  computed: {
    ...mapState('home', ['schoolCode'])
  },
  mounted () {
  },
  methods: {
    ...mapActions('home', [
      'getApply', 'bindApply'
    ]),
    // 应用库列表
    async applyGetList () {
      const res = await this.getApply({ platform: 0 })
      const data = res.data.list.map(el => {
        return {
          ...el,
          check: false
        }
      })
      const result = this.bindList.map(el => {
        return el.id
      })
      this.applyList = data.filter(el => {
        return result.indexOf(el.id) === -1
      })
    },
    appClick (index) {
      this.applyList[index].check = !this.applyList[index].check
      this.appFilter()
    },
    appFilter () {
      this.chooseList = this.applyList.filter(el => {
        return el.check
      })
    },
    onDefine () {
      if (this.chooseList.length === 0) {
        this.$message.warning('请选择要绑定的应用')
        return
      }
      const appIdList = this.chooseList.map(el => {
        return el.id
      })
      const req = {
        schoolCode: this.schoolInfo.schoolCode,
        schoolId: this.schoolInfo.id,
        appIdList: appIdList
      }
      this.bindApply(req).then(res => {
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.$emit('update')
        })
      })
    },
    onClose () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
.app-check {
    width: 22.5%;
    height: 125px;
    margin:25px 0 5px 2%;
    font-size: 14px;
    float: left;
    text-align: center;
    cursor: pointer;
    border-radius: @radius;
    -webkit-box-shadow: 2px 2px 4px #eee;
    box-shadow: 2px 2px 4px #eee;
    background-color: rgba(77, 76, 172, .6);
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    .title {
      margin-top: 10px;
      overflow: hidden;
    }
    .right-img {
      width: 62px;
      height: 62px;
      display: block;
    }
}
.app-choose {
  background: url('../../assets/img/choose-blue.png') no-repeat right top;
  background-size: 25px 25px;
  background-color: #4D4CAC;
  border: 2px #4D4CAC solid
}

</style>
