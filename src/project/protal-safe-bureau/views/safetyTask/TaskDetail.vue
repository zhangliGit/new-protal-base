<template>
  <Modal title="xxx小学" :width="800" ref="modal" @ok="close">
    <div class="content">
      <div class="detail-info">
        <div class="u-fx-ac-jc u-bold u-font-3 u-mar-b10">教育局下发演示任务</div>
        <div class="u-fx-ac-jc u-mar-b10">发布人：&nbsp;admin发布时间：&nbsp;2019-05-27 &nbsp;15:44:12</div>
        <div class="u-fx-ac-jc u-mar-b10">任务开始时间：&nbsp;2019-05-27&nbsp; 任务结束时间：&nbsp;2019-06-01</div>
        <div class=" report-cont  u-mar-t30">
          <div class="title u-bold">要求上报内容</div>
          <div class="u-mar  wh">
            <div class="u-fx">
              <div class="u-mar-r10">单选题</div>
              <div class="subject u-bd-1px u-padd-l20  u-padd-b10">
                <div class="qui-fx u-mar-t10" >
                  <div class="qui-fx-ver">题目是：</div>
                  <div class="qui-fx-ver u-mar-l20">
                    <div>是否发现过黑恶势力行为？</div>
                    <div class="u-mar-t10">
                      <a-radio-group>
                        <a-radio :value="1">发现</a-radio>
                        <a-radio :value="2">未发现</a-radio>
                      </a-radio-group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="div u-bold u-mar-t20">填报流水</div>
            <div>校歌演示学校已经上报</div>
            <div>校歌演示学校已经上报</div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Modal from '../../component/Modal'
export default {
  name: 'TaskDetail',
  components: {
    Modal
  },
  data() {
    this.id = ''
    return {
      detailInfo: [],
      processes: [],
      activeKey: ['1'],
      isLoad: false,
      type: '',
      customStyle:
        'background: #9698d6;margin-bottom: 24px;border: 0;overflow: hidden'
    }
  },
  computed: {
    ...mapState('home', ['userInfo']),
    userCode: {
      get() {
        return this.userInfo.schoolCode
      },
      set() {
        this.$emit('input', false)
      }
    }
  },
  mounted() {

  },
  methods: {
    ...mapActions('home', ['specialTaskDetail', 'updateInspect', 'modifySpecial']),
    async showDetail(id) {
      this.id = id
      const res = await this.specialTaskDetail(id)
      console.log(res)
    },
    close() {
      this.$refs.modal.close()
    }
  }
}
</script>
<style lang="less" scoped>
  .content {
    height: calc(100% - 10px);
    overflow-y: scroll;
    .detail-info {
      // padding-top: 20px;
      // min-height: 500px;
      overflow-y: scroll;
      background-color: #fff;
      .report-cont{
        padding-left: 100px;
      }
    }
  }
</style>
