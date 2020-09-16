<template>
  <div class="task-add bg page-layout qui-fx-ver">
    <div class="content pos-box">
      <div class="task-cont u-bg-fff u-padd-20">
        <div class="detail-title">
          <span class="title-tab-pane on u-type-primary">预览任务</span>
        </div>
        <div class="detail-info u-padd-30 u-content-color u-fx-ver">
          <div class="u-font-1 u-fx-ac-jc u-bold">教育局下发演示任务</div>
          <a-divider class="u-type-primary-bg" />
          <a-row :gutter="[0,0]" type="flex" class="u-mar-b10" >
            <a-col :span="4" :offset="8" >
              发布人：admin
            </a-col>
            <a-col :span="10" :push="2" >
              发布时间：2019-05-27 &nbsp;
            </a-col>
          </a-row>
          <a-row :gutter="[0,0]" type="flex">
            <a-col :span="4" :offset="8" >
              任务开始时间：admin
            </a-col>
            <a-col :span="10" :push="2" >
              任务结束时间：-05-27 &nbsp;
            </a-col>
          </a-row>
          <a-row :gutter="[0,0]" class="u-mar-t10" type="flex" justify="center">
            <a-col :span="18" >
              <a-carousel arrows >
                <div
                  slot="prevArrow"
                  slot-scope="props"
                  class="custom-slick-arrow"
                  style="left: 10px;zIndex: 1"
                >
                  <a-icon type="right-circle" />
                </div>
                <div
                  slot="nextArrow"
                  slot-scope="props"
                  class="custom-slick-arrow"
                  style="right: 10px;zIndex: 3">
                  <a-icon type="right-circle" />
                </div>
                <div> <img :src="baseUrl" /></div>
                <div> <img :src="baseUrl" /></div>
                <div> <img :src="baseUrl" /></div>
                <div> <img :src="baseUrl" /></div>
              </a-carousel>
            </a-col>
          </a-row>
          <a-row :gutter="[0,0]" class="u-mar-t10" type="flex" justify="center">
            <a-col :span="18" >
              市城乡建设委员会欢迎大家积极举报涉黑涉恶问题线索：</br>

              &nbsp;&nbsp;1.在工程项目建设过程中，强揽土石方、劳务施工，垄断建筑机械设备租赁和建筑砂石料供应，强收“保护费”、敲诈勒索、恶意阻拦施工。

              电话：0531-66605634；电子邮箱：sjwjgc@163.com；

              邮寄地址：济南历下区龙鼎大道1号龙奥大厦F435室</br>

              &nbsp;&nbsp;2.在工程项目招投标过程中，以威胁、恐吓、暴力等手段，强迫他人接受限定条件或退出竞争，强迫中标人放弃中标或转包，交易过程寻衅滋事、恶意投诉。

              电话：0531-68967002；电子邮箱：sjwzbtb7002@163.com；</br>

              邮寄地址：济南市站前街9号政务中心2号楼1002室</br>

              &nbsp;&nbsp;3.在工程款结算和农民工工资支付过程中，恶意拖欠、暴力讨薪、聚众滋事。</br>

              电话：0531-61378850；电子邮箱：qingqianban8869@163.com；</br>

            </a-col>
          </a-row>
          <div class="u-mar-t40">
            <detail-title-left >上传附件</detail-title-left>
            <div class="download-box u-fx u-mar-t10">
              <div class="icon u-mar-l40  u-mar-r10">图标</div>
              <div class="text">示例1.doc</div>
              <div class="kb  u-light-color u-mar-l10">(1.23M)</div>
              <div class="dowload u-type-primary">下载</div>
            </div>
          </div>
        </div>
      </div>
      <div class="task-cont report  u-padd-20 u-bg-fff  u-mar-t20">
        <div class="detail-title">
          <span class="title-tab-pane on u-type-primary">要求上报内容</span>
        </div>
        <div class="detail-info u-mar-t30">
          <div class="u-mar">
            <div>单选题</div>
            <div class="subject u-mar-t10 u-padd-l20 u-padd-t10 u-padd-b10">
              <div class="qui-fx u-mar-t10" v-for="(list, i) in 2" :key="i">
                <div class="qui-fx-ver">题目是：</div>
                <div class="qui-fx-ver u-mar-l20">
                  <div>是否发现过黑恶势力行为？</div>
                  <div class="u-mar-t10">
                    <a-radio-group>
                      <a-radio :value="1">Option A</a-radio>
                      <a-radio :value="2">Option B</a-radio>
                    </a-radio-group>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="u-mar">
            <div>多选题</div>
            <div class="subject u-mar-t10 u-padd-l20 u-padd-t10 u-padd-b10">
              <div class="qui-fx u-mar-t10" v-for="(list, i) in 2" :key="i">
                <div class="qui-fx-ver">题目是：</div>
                <div class="qui-fx-ver u-mar-l20">
                  <div>是否发现过黑恶势力行为？</div>
                  <div class="u-mar-t10">
                    <a-checkbox-group>
                      <a-checkbox :value="1">Option A</a-checkbox>
                      <a-checkbox :value="2">Option B</a-checkbox>
                    </a-checkbox-group>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="u-mar">
            <div>填空题</div>
            <div class="subject u-mar-t10 u-padd-l20 u-padd-t10 u-padd-b10">
              <div class="qui-fx u-mar-t10" v-for="(list, i) in 2" :key="i">
                <div class="qui-fx-ver">题目是：</div>
                <div class="qui-fx u-mar-l20">
                  <div>是否发现过黑恶势力行为？</div>
                  <div class="qui-fx-f1">
                    <a-input placeholder="Basic usage" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { quillEditor } from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import DetailTitleLeft from '../../component/DetailTitleLeft'
const id = 0
export default {
  name: 'Preview',
  components: {
    quillEditor,
    DetailTitleLeft
  },
  data() {
    return {
      baseUrl: 'https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/',
      detailInfo: {}
    }
  },
  created() {
    this.form = this.$form.createForm(this, { name: 'dynamic_form_item' })
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.detailId = this.$route.query.id
    if (this.detailId) {
      this.showDetail()
    }
  },
  methods: {
    ...mapActions('home', ['myTaskDetail']),
    async showDetail() {
      const res = await this.myTaskDetail(this.detailId)
      const data = res.data
      this.detailInfo = data
    }
  }
}
</script>
<style lang="less" scoped>
@deep: ~'>>>';
.bg{
  background-color: #f0f2f5;
}
.cont-bg{
  background-color: #fafafa;
}
.task-add {
  box-sizing: border-box;
  .content {
    height: calc(100% - 10px);
    overflow-y: scroll;
    .task-cont{
      .detail-title{
        border-bottom: 1px solid #DEDEDE;
        height: 30px;
        position: relative;
        display: flex;
        justify-content: space-between;
        .title-tab-pane{
          height: 30px;
          font-size: 14px;
          color: #666;
          margin-right: 40px;
          border-bottom: 1px solid #DEDEDE;
          display: inline-block;
          font-weight: 400;
          cursor: pointer;
          &.on{
            color: #6882da;
            border-bottom: 2px solid #6882da;
            font-weight: bold;
          }
        }
      }
      .detail-info {

      }
    }
    .report{
      .left{
        width: 300px;
        height: 100%;
        margin-right: 40px;
        .list{
          margin-top:15px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          line-height: 50px;
        }
      }
      .rigth{
        width: 100%;
        //自定义表单样式
        .dynamic-delete-button {
          cursor: pointer;
          position: relative;
          top: 4px;
          font-size: 24px;
          color: #999;
          transition: all 0.3s;
        }
        .dynamic-delete-button:hover {
          color: #777;
        }
        .dynamic-delete-button[disabled] {
          cursor: not-allowed;
          opacity: 0.5;
        }
      }
    }
  }
}
//轮播图
.ant-carousel @{deep} .slick-slide {
  text-align: center;
  width: 900px;
  height: 450px;
  line-height: 450px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel @{deep} .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel @{deep} .custom-slick-arrow:before {
  display: none;
}
.ant-carousel @{deep} .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel @{deep} .slick-slide h3 {
  color: #fff;
}
</style>
