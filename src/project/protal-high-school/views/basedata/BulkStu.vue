<template>
  <div class="bulk-import page-layout qui-fx-ver">
    <div class="top qui-fx-ver">
      <div class="line qui-fx">
        <span class="title qui-fx-ac">下载模板：</span>
        <div class="qui-fx">
          <a-button style="margin-right:20px" type="primary" @click="download"> <a-icon type="download" /> 下载模板 </a-button>
        </div>
      </div>
      <div class="tips qui-fx-ver mar-b10 u-padd-20">
        <p>帮助提示：</p>
        <div class="qui-fx-ver" v-if="isStudent">
          <p>1、学生信息采集表：下载模板，按模板格式录入学生信息。不可修改表格文件名“student”；</p>
          <p>2、学生照片：支持JPG，大小20kb-100kb，分辨率400*400-800*800，以学生姓名命名，每个人的照片名称必须与学生列表中人员姓名一致；</p>
          <p>3、上传文件：将学生信息采集表与所有学生人脸照片放在同一个文件夹下，文件夹名称不限，将文件夹压缩为ZIP压缩包后上传；</p>
        </div>
        <div>
          <a-button style="margin-right:20px" type="primary" @click="download"> <a-icon type="download" /> 下载模板 </a-button>
        </div>
      </div>
      <div class="line qui-fx">
        <span class="title qui-fx-ac">选择文件：</span>
        <div class="qui-fx">
          <a-upload
            class="qui-fx qui-fx-ac"
            :multiple="false"
            name="multipartFile"
            :data="{fileType: 'zip'}"
            accept=".zip"
            :fileList="fileList"
            :withCredentials="true"
            :customRequest="customRequest"
            :beforeUpload="beforeUpload">
            <a-button style="margin-right:20px" type="primary"> <a-icon type="upload" /> 选择压缩包 </a-button>
          </a-upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import selectImg from '../../assets/img/database/role/select.png'
import deleteImg from '../../assets/img/database/role/delete.png'
import { mapState, mapActions } from 'vuex'
import PageNum from '@c/PageNum'
import hostEnv from '@config/host-env'
export default {
  name: 'BulkStu',
  components: {
    PageNum
  },
  data () {
    return {
      selectImg,
      deleteImg,
      isStudent: false,
      pageList: {
        page: 1,
        size: 20
      },
      resList: [],
      fileUrl: '',
      total: 100,
      fileList: [],
      result: false,
      orgCode: '',
      orgName: ''
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created () {
    this.orgCode = this.$route.query.code
    this.orgName = this.$route.query.name
    console.log(this.orgCode)
    console.log(this.orgName)
    this.isStudent = true
    this.fileUrl = `${hostEnv.lz_user_center}/userinfo/student/user/upload`
  },
  mounted () {
  },
  methods: {
    ...mapActions('home', [
      'downStudentsTemplate', 'downStudentsTemplate'
    ]),
    deleteList (action) {
    },
    reelect (action) {

    },
    lead () {
    },
    beforeUpload (file) {
      console.log(file)
      const isZip = file.type === 'application/x-zip-compressed' || 'application/zip'
      if (!isZip) {
        this.$message.error('请上传格式为ZIP的压缩包')
      }
      return (isZip)
    },
    customRequest (data) { // 上传提交
      this.resList = []
      const formData = new FormData()
      formData.append('multipartFile', data.file)
      this.fileList = [data.file]
      this.saveFile(formData)
    },
    saveFile (formData) {
      let params = {}
      if (this.isStudent) {
        params = {
          classId: this.$route.query.id,
          schoolCode: this.userInfo.schoolCode
        }
      }
      axios({
        method: 'post',
        url: this.fileUrl,
        data: formData,
        params
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message.success(`导入成功`)
          console.log(res.data.data)
          this.result = true
          this.resList = res.data.data
          this.resList.forEach((ele, index) => {
            ele.id = index
            ele.result = '失败'
          })
        } else {
          this.result = false
          this.$message.error(res.data.message)
          this.fileList = []
        }
      }).catch((error) => {
        console.log(error)
        this.$message.error(error)
        this.fileList = []
      })
    },
    download () {
      if (this.isStudent === true) {
        window.location.href = `${hostEnv.lz_user_center}/userinfo/student/user/download/template`
      } else if (this.isTeacher) {
        window.location.href = `${hostEnv.lz_user_center}/userinfo/teacher/user/download/teacher/template`
      }
    }
  }
}
</script>
<style lang="less" scoped>
.bulk-import{
  height: 100%;
  .top{
    padding: 20px;
    margin-bottom: 20px;
    .line{
      margin-bottom: 20px;
      .title{
        font-size: 14px;
        font-weight: bold;
        margin-right: 20px;
        min-width: 70px;
      }
      .download{
        color:@main-color;
        cursor: pointer;
      }
    }
    /deep/ .ant-upload-list-item-info{
      padding: 0 22px 0 4px;
    }
  }
  .content{
    background: #fff;
    padding: 20px 0;
    .tit{
      margin-bottom: 20px;
      .res{
        p{
          border-left: 3px solid @main-color;
          padding-left: 10px;
          margin: 0 0 0 10px;
          font-weight: bold;
          line-height: 16px;
          height: 16px;
          font-size: 16px;
          span{
            margin:0 5px;
          }
          span.success{
            color:@main-color;
          }
          span.error{
            color:#e81515;
          }
        }
      }
    }
    .action{
      div{
        cursor: pointer;
        margin: 4px 30px 0 0;
        img{
          width: 20px;
          height: 20px;
        }
        span{
          font-size:12px;
        }
      }
    }
  }
}
.tips {
  background-color: #e6f3fc;
}
</style>
