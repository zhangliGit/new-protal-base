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
import moment from 'moment'
import Modal from '../../component/Modal'
import NoData from '@c/NoData'
const formData = [
  {
    value: 'description',
    initValue: '',
    type: 'input',
    label: '隐患描述',
    placeholder: '请输入隐患描述'
  },
  {
    value: 'address',
    initValue: '',
    type: 'input',
    label: '隐患位置',
    placeholder: '请输入隐患位置'
  },
  {
    type: 'upload',
    label: '隐患图片上传'
  },
  {
    value: 'leaderName',
    initValue: [],
    list: [],
    type: 'select',
    label: '负责人',
    placeholder: '请选择负责人'
  }
]
export default {
  name: 'SpecialDetail',
  components: {
    Modal,
    NoData
  },
  data() {
    this.id = ''
    return {
      teamLeaderCode: 'QPJYJ', // 小组长Code
      supervisionCode: 'QPJYJ', // 小组长Code
      formData,
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
    moment,
    async showDetail(id) {
      this.id = id
      const res = await this.specialTaskDetail(id)
      console.log(res)
      this.detailInfo = res.data
      this.detailInfo.itemList = this.detailInfo.itemList.map(el => {
        return {
          ...el,
          standardList: el.standardList.map(item => {
            return {
              ...item,
              examineResult: item.examineResult !== '0',
              inspectionResult: item.inspectionResult !== '0',
              selfResult: item.selfResult !== '0'
            }
          })
        }
      })
    },
    close() {
      this.$refs.modal.close()
    },
    // 提交
    submitOk(type) {
      this.isLoad = true
      const resultList = []
      this.detailInfo.itemList.map(el => {
        el.standardList.map(item => {
          if (this.type === '1') {
            resultList.push({ id: item.id, result: item.selfResult ? '1' : '0' })
          } else {
            resultList.push({ id: item.id, result: item.examineResult ? '1' : '0' })
          }
        })
      })
      const req = {
        resultList: resultList,
        submitType: type,
        taskId: this.detailInfo.taskId,
        userCode: this.userInfo.schoolCode,
        userName: this.userInfo.schoolName
      }
      this.modifySpecial(req)
        .then(res => {
          this.isLoad = false
          this.$message.success('操作成功')
          this.$tools.goNext(() => {
            this.$refs.modal.visible = false
            this.$parent.showList()
          })
        })
        .catch(res => {
          this.isLoad = false
        })
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
