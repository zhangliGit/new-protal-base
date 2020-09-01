<template>
  <div class="upload-file qui-fx">
    <div
      @mouseover="showTip(index)"
      v-for="(pic, index) in fileList"
      :key="pic.id"
      class="qui-fx qui-fx-ac-jc mar-t10"
      :style="{position: 'relative', marginRight: '10px', backgroundColor: '#fff', padding: '18px', border: '1px dashed #ccc', height: fileInfo.h || 120 + 'px', width: fileInfo.w || 120 + 'px'}">
      <div @mouseleave="showTip()" class="showTip qui-fx-ac-jc" v-if="currentIndex === index">
        <div>
          <a-icon type="eye" @click="show(pic)"></a-icon>
          <a-icon type="delete" @click="del(pic)"></a-icon>
        </div>
      </div>
      <video v-if="type === 'video'" :src="pic.url" style="width: 80px; height: 80px" />
      <img v-else style="width: 80px; height: 80px" :src="pic.url" alt=""/>
    </div>
    <a-upload
      :multiple="true"
      name="fileList"
      listType="picture-card"
      class="avatar-uploader mar-t10"
      :showUploadList="false"
      :action="reqUrl"
      :accept="type === 'image' ? 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon,image/jpg' : type === 'video' ? 'video/mp4' : ''"
      :beforeUpload="beforeUpload"
      @change="uploadPic"
    >
      <div v-if="fileList.length < length" :style="{height: fileInfo.h || 120 + 'px', width: fileInfo.w || 120 + 'px'}" class="qui-fx-ac-jc">
        <div><a-icon style="font-size: 20px" :type="uploadTag ? 'loading' : 'plus'" /></div>
        <div class="ant-upload-text">{{ fileInfo.tip }}</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false" width="800px">
      <div class="qui-fx-ac-jc">
        <video v-if="type === 'video'" :src="previewImage" controls object-fit="contain" :style="{maxHeight: videoHeight + 'px', maxWidth: '100%'}"></video>
        <img v-else :style="{maxHeight: videoHeight + 'px', maxWidth: '100%'}" :src="previewImage" />
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'UploadVideo',
  props: {
    type: {
      type: String,
      default: 'video'
    },
    length: {
      type: Number,
      default: 1
    },
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    fileInfo: {
      type: Object,
      default: () => {
        return {
          url: '',
          h: 120,
          w: 120,
          tip: '上传视频'
        }
      }
    }
  },
  data () {
    return {
      reqUrl: '',
      previewVisible: false,
      uploadTag: false,
      previewImage: '',
      currentIndex: -1,
      videoHeight: 0
    }
  },
  mounted () {
    this.reqUrl = this.fileInfo.url
    this.videoHeight = (document.body.clientHeight) * 0.8
  },
  computed: {
    fileList: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    showTip (index = -1) {
      this.currentIndex = index
    },
    show (file) {
      this.previewVisible = true
      this.previewImage = file.url
    },
    del (file) {
      const index = this.fileList.findIndex(item => {
        return item.uid === file.uid
      })
      this.$emit('delUpload', this.fileList[index].id)
      this.fileList.splice(index, 1)
    },
    beforeUpload (file) {
      const isLt100M = file.size / 1024 / 1024 < 100
      if (!isLt100M) {
        this.$message.error('大小必须小于100M')
      }
      if (this.type === 'video') {
        const isMp4 = file.type === 'video/mp4'
        if (!isMp4) {
          this.$message.error('请上传mp4格式的视频文件')
        }
        return isMp4 && isLt100M
      } else if (this.type === 'image') {
        const isJpg = file.type === 'image/jpeg'
        const isPng = file.type === 'image/png'
        if (!isJpg && !isPng) {
          this.$message.error('请上传图片格式的文件(jpg/png)')
        }
        return (isJpg || isPng) && isLt100M
      }
    },
    uploadPic (info) {
      if (info.file.status === 'uploading') {
        this.uploadTag = true
        return
      }
      if (info.file.status === 'done') {
        if (info.file.response.code === 400) {
          this.$message.warning(info.file.response.message)
          return
        }
        this.fileList.push({
          uid: info.file.uid,
          uname: info.file.name,
          id: Array.isArray(info.file.response.data) ? info.file.response.data[0].id : info.file.response.data.id,
          url: Array.isArray(info.file.response.data) ? info.file.response.data[0].url : info.file.response.data.url
        })
        this.uploadTag = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
  /deep/ .ant-upload.ant-upload-select-picture-card > .ant-upload {
    padding: 0px !important;
  }
  /deep/ .ant-upload-picture-card-wrapper{
    width: auto;
  }
  .showTip {
    position: absolute;
    z-index: 9;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    i {
      cursor: pointer;
      color:#fff;
      padding: 0 8px;
      font-size: 18px;
    }
  }
  .upload-file{
    flex-wrap: wrap;
  }
</style>
