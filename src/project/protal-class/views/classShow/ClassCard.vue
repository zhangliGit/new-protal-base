<template>
  <div class="class-card qui-fx">
    <div class="left">
      <class-tree @select="select"></class-tree>
    </div>
    <div class="right qui-fx-ver">
      <div class="tit" style="margin-top: 10px">
        <p class="qui-fx qui-fx-ac">班级格言</p>
      </div>
      <a-input
        allowClear
        :maxLength="30"
        placeholder="请输入班级格言"
        v-model="inputText">
      </a-input>
      <div class="tit">
        <p class="qui-fx qui-fx-ac">班级简介</p>
      </div>
      <a-textarea
        allowClear
        :maxLength="200"
        :autoSize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入班级简介"
        v-model="areaText">
      </a-textarea>
      <!-- <div class="tit" style="margin-bottom: 10px">
        <p class="qui-fx qui-fx-ac">班级全家福</p>
      </div>
      <div class="qui-fx qui-fx-ac">
        <upload-multi :length="1" v-model="fileList" :fileInfo="fileInfo" ></upload-multi>
        <span style="font-size:12px;margin-left:10px;">说明：支持上JPG、PNG格式的图片，图片大小不得超过10M。</span>
      </div> -->
      <div class="button">
        <a-button type="primary" @click="save">
          保存
        </a-button>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import UploadMulti from '@c/UploadMulti'
import { mapActions, mapState } from 'vuex'
import ClassTree from '@c/ClassTree'
export default {
  components: {
    ClassTree,
    UploadMulti
  },
  data () {
    return {
      inputText: '',
      areaText: '',
      fileInfo: {
        tip: '上传图片',
        h: 480, // 高度
        w: 480 // 宽度
      },
      fileList: []
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted () {
  },
  methods: {
    ...mapActions('home', ['getClassMotto', 'addClassMotto']),
    // 选中年级
    select (item) {
      console.log(item)
      if (item.classCode) {
        this.classInfo = item
        this.getMotto()
      }
    },
    async getMotto () {
      const req = {
        ...this.classInfo,
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getClassMotto(req)
      if (!res.data) {
        this.inputText = ''
        this.areaText = ''
      } else {
        this.inputText = res.data.motto
        this.areaText = res.data.introduce
      }
    },
    async save() {
      console.log(this.inputText)
      if (this.inputText === '') {
        this.$message.error('请输入班级格言')
        return
      }
      if (this.areaText === '') {
        this.$message.error('请输入班级简介')
        return
      }
      const req = {
        ...this.classInfo,
        motto: this.inputText,
        introduce: this.areaText,
        schoolCode: this.userInfo.schoolCode
      }
      if (this.addOrEditTag) {
        req.id = this.mottoId
      }
      this.addClassMotto(req).then(() => {
        this.$message.success('编辑成功')
        this.$tools.goNext(() => {
          this.getMotto()
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.class-card{
  flex: 1;
  overflow: hidden;
  .left{
    background: #fff;
    margin-right: 10px;
    padding: 10px;
    width: 200px;
  }
  .right{
    position: relative;
    flex: 1;
    background: #fff;
    padding: 10px;
    width: calc(100% - 210px);
    .tit{
      margin: 20px 0;
      p {
        border-left: 3px solid @main-color;
        padding-left: 10px;
        font-weight: bold;
        margin: 0 0 0 5px;
        line-height: 16px;
        height: 16px;
      }
    }
    input{
      margin-bottom: 20px;
    }
    .button{
      margin: 20px auto;
    }
    .footer{
      position: absolute;
      width: calc(100% - 20px);
      bottom: 0;
      height: 200px;
      background: url('../../assets/img/class_show.png') no-repeat;
      background-size: 100% 200px;
    }
  }
}
</style>
