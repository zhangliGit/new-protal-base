<template>
  <div class="page-layout qui-fx-ver">
    <div class="content pos-box">
      <div class="bg-fff">
        <div class="fill-top u-mar-b20">
          <div class="u-mar-l40"> 风险管理小组 </div>
        </div>
        <div>
          <a-form :form="form">
            <a-form-item label="组长" v-bind="formItemLayout" required>
              <div>
                <template v-for="tag in leaderList">
                  <a-tag :key="tag.userCode" :closable="true" :afterClose="() => userClose(tag,'leaderList')">
                    {{ tag.userName }}
                  </a-tag>
                </template>
                <a-tag style="background: #fff; borderStyle: dashed;" @click="addTag('leaderList')" > <a-icon type="plus" />添加 </a-tag>
              </div>
            </a-form-item>
            <a-form-item label="副组长" v-bind="formItemLayout" required>
              <div>
                <template v-for="tag in viceLeaderList">
                  <a-tag :key="tag.userCode" :closable="true" :afterClose="() => userClose(tag,'viceLeaderList')">
                    {{ tag.userName }}
                  </a-tag>
                </template>
                <a-tag style="background: #fff; borderStyle: dashed;" @click="addTag('viceLeaderList')" > <a-icon type="plus" />添加 </a-tag>
              </div>
            </a-form-item>
            <a-form-item label="组员" v-bind="formItemLayout" required>
              <div>
                <template v-for="tag in memberList">
                  <a-tag :key="tag.userCode" :closable="true" :afterClose="() => userClose(tag,'memberList')">
                    {{ tag.userName }}
                  </a-tag>
                </template>
                <a-tag style="background: #fff; borderStyle: dashed;" @click="addTag('memberList')" > <a-icon type="plus" />添加 </a-tag>
              </div>
            </a-form-item>
            <a-form-item label="应急值班电话：" v-bind="formItemLayout">
              <a-input
                style="width:80%;"
                v-decorator="[
                  'emergencyPhone',
                  {
                    initialValue: emergencyPhone,
                    rules: [{ required: true, message: '请输入电话' }]
                  }
                ]"
                placeholder="请输入电话"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" :style="{ textAlign: 'center' }">
              <a-button class="mar-l10" type="primary" @click="submitOk" :disabled="isLoad">保存</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div class="bg-fff">
        <div class="fill-top u-mar-b20">
          <div class="u-mar-l40"> 风险管理方案 </div>
        </div>
        <div class="qui-fx u-mar-l40">
          <div>文件模板：</div>
          <div>
            <div class="qui-fx-jsb u-mar-b10 u-type-primary u-font-01" v-for="(list,i) in docList" :key="i">
              <span> {{ list.val }} </span>
              <span class="u-mar-l40">下载</span>
            </div>
          </div>
        </div>
        <div class="qui-fx u-mar-l40 u-mar-t10">
          <div>工作任务：</div>
          <div>
            <a-button icon="plus" class="add-btn">上传文件</a-button>
            <div class="qui-fx down u-mar-t20" v-for="(item,index) in 10" :key="index">
              <img :src="img" />
              <div class="u-mar-l20 qui-fx-ver u-font-01">
                <div>aaa</div>
                <div class="qui-fx u-type-primary">
                  <div>下载</div>
                  <div class="u-mar-l20">删除</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <choose-post
      ref="choosePost"
      is-check
      :teacherList="active === 'viceLeaderList' ? viceLeaderList : active === 'leaderList' ? leaderList : active === 'memberList' ? memberList : []"
      v-if="userTag"
      v-model="userTag"
      @submit="choosePost"
      title="添加成员"
    ></choose-post>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import hostEnv from '@config/host-env'
import img from '../assets/img/wenjian.png'
import ChoosePost from '@c/choose/ChoosePost'
export default {
  name: 'RiskGroup',
  components: {
    ChoosePost
  },
  data() {
    return {
      img,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      },
      detailInfo: {},
      isLoad: false,
      emergencyPhone: '',
      docList: [
        {
          val: '学校风险辨识管控制度.doc',
          url: ''
        },
        {
          val: '学校双重预防体安全生产责任制.doc',
          url: ''
        },
        {
          val: '学校隐患排查治理制度.doc',
          url: ''
        }],
      userTag: false,
      active: '',
      leaderList: [],
      viceLeaderList: [],
      memberList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    // this.url = `${hostEnv.zx_subject}/file/upload/doc`
    this.showDetail()
  },
  methods: {
    ...mapActions('home', ['riskGroupList', 'saveRiskGroup']),
    // 获取详情 previewMyTask
    async showDetail() {
      const res = await this.riskGroupList(this.userInfo.schoolCode)
      this.leaderList = res.data.leaderList
      this.viceLeaderList = res.data.viceLeaderList
      this.memberList = res.data.memberList
      this.emergencyPhone = res.data.emergencyPhone
    },
    addTag(type) {
      this.active = type
      this.userTag = true
    },
    choosePost(list) {
      this[this.active] = list
      this.$refs.choosePost.reset()
    },
    userClose(removedTag, string) {
      this[string] = this[string].filter(tag => tag !== removedTag)
    },
    handleRemove(info, i) {
      this.fileList[i].show = true
    },
    exportClick (docUrl) {
      if (docUrl) {
        const url = `${hostEnv.zx_subject}/file/downLoad/doc?url=${docUrl}`
        window.open(url)
      }
    },
    filterData(data) {
      const newData = data.map(el => {
        return {
          code: el.userCode,
          name: el.userName
        }
      })
      return newData
    },
    submitOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.leaderList.length === 0 || this.viceLeaderList.length === 0 || this.memberList.length === 0) {
            this.$message.warning('请选择人员')
            return
          }
          values.schoolCode = this.userInfo.schoolCode
          values.leaderList = this.filterData(this.leaderList)
          values.viceLeaderList = this.filterData(this.viceLeaderList)
          values.memberList = this.filterData(this.memberList)
          this.saveRiskGroup(values)
            .then(() => {
              this.$message.success('操作成功')
              this.$tools.goNext(() => {
                this.isLoad = false
                this.showDetail()
              })
            })
            .catch(() => {
              this.isLoad = false
            })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  height: calc(100% - 10px);
  overflow-y: scroll;
  .fill-top {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      height: 18px;
      width: 3px;
      background-color: #4d4cac;
      left: 25px;
      bottom: 15px;
    }
  }
  img {
    width: 25px;
    height: 32px;
  }
.down {
    height: 40px;
  }
}
</style>
