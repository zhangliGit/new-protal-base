<template>
  <div class="page-layout qui-fx-ver">
    <div class="mode-content qui-fx">
      <div id="content" class="box-scroll content-left" :style="{height: (scrollH - 60) + 'px'}">
        <div ref="imageWrapper" class="imageWrapper">
          <draggable
            :list="list"
            :options="{group:'article', disabled: disabled, sort: false}"
            class="dragArea11"
            :style="{'backgroundImage' : 'url('+gridImg+')','height': '660px', 'width':'100%'}">
            <div class="notice-card qui-fx-ver" v-for="(item,i) in list" :key="i" :style="{'width':''+(item.x)+'px','height':''+(item.y)+'px'}">
              <div class="qui-fx-f1 qui-fx-ver qui-fx-jsb right-img" :style="{'backgroundImage': 'url('+item.img+')'}"></div>
              <div class="notice-title qui-fx-jc qui-je" style="background: #fff">{{ item.title }}</div>
              <div v-if="item.img && delTag">
                <a-button icon="delete" class="del-btn" @click="handleDel(i, item.key)"></a-button>
              </div>
            </div>
          </draggable>
        </div>
        <div class="wrap-table qui-fx-f1 qui-fx-ver">
          <a-form :form="form">
            <a-form-item :label-col="{ span: 2 }" :wrapper-col="{ span: 16 }" label="模板名称">
              <a-input
                placeholder="请输入模板名称"
                type="text"
                v-decorator="['name',{rules: [{max: 10,required: true,message: '请输入模板名称'}]}]"
              />
            </a-form-item>
            <a-form-item :label-col="{ span: 2 }" :wrapper-col="{ span: 16 }" label="模板简介">
              <a-input
                placeholder="请输入模板简介"
                type="text"
                v-decorator="['remark',{rules: [{max: 10,required: true,message: '请输入模板简介'}]}]"
              />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 4 }">
              <a-button class="mar-r10">
                取消
              </a-button>
              <a-button type="primary" @click="addSubmit">
                保存
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div class="qui-fx-f1 box-scroll content-right">
        <a-button type="primary">组件库</a-button>
        <draggable
          :list="imgList"
          :options="{group:{name: falgs,pull:'clone'},filter: '.undraggable', sort: false}"
          @start="start"
          @end="end"
          class="dragArea box"
          :move="allowMove"
          :style="{height: (scrollH - 150) + 'px'}">
          <div :id="item.x + '^' + item.y + '^' + item.key" :class="item.flag ? 'undraggable notice-card qui-fx-ver choose' : 'notice-card qui-fx-ver ' " v-for="(item, index) in imgList" :key="item.key" @click="chooseImg(item, index)">
            <div class="qui-fx-f1 qui-fx-ver qui-fx-jsb right-img" :style="{'backgroundImage': 'url('+item.img+')'}"></div>
            <div class="notice-title qui-fx-jc qui-je">{{ item.title }}</div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import html2canvas from 'html2canvas'
import { mapState, mapActions } from 'vuex'
import gridImg from '../../assets/img/grid.png'
import chassHomework from '../../assets/img/chass-homework.png'
import classAlbum from '../../assets/img/class-album.png'
import classCount from '../../assets/img/class-count.png'
import classDuty from '../../assets/img/class-duty.png'
import classHomeworkTj from '../../assets/img/class-homework-tj.png'
import classInform from '../../assets/img/class-inform.png'
import classMessage from '../../assets/img/class-message.png'
import classPraise from '../../assets/img/class-praise.png'
import classSchedule from '../../assets/img/class-schedule.png'
import classShow from '../../assets/img/class-show.png'
export default {
  name: 'AddWelcome',
  components: {
    draggable,
    html2canvas
  },
  props: {
  },
  data () {
    return {
      form: this.$form.createForm(this),
      gridImg,
      scrollH: 0,
      appForm: {},
      active: 0,
      classList: [],
      chooseList: [],
      type: 0,
      id: '',
      classCardList: [],
      falgs: 'article',
      disabled: false,
      imgUrl: '',
      list: [],
      setList: [],
      girdNum: 0,
      position: 1,
      delTag: true,
      imgList: [
        {
          key: '0',
          title: '课程表',
          img: classSchedule,
          x: 200,
          y: 420
        },
        {
          key: '1',
          title: '今日作业',
          img: chassHomework,
          x: 200,
          y: 200
        },
        {
          key: '2',
          title: '相册',
          img: classAlbum,
          x: 420,
          y: 420
        },
        {
          key: '3',
          title: '倒计时',
          img: classCount,
          x: 200,
          y: 200
        },
        {
          key: '4',
          title: '值日生',
          img: classDuty,
          x: 200,
          y: 200
        },
        {
          key: '5',
          title: '作业统计',
          img: classHomeworkTj,
          x: 200,
          y: 200
        },
        {
          key: '6',
          title: '通知公告',
          img: classInform,
          x: 200,
          y: 420
        },
        {
          key: '7',
          title: '留言',
          img: classMessage,
          x: 200,
          y: 200
        },
        {
          key: '8',
          title: '表扬栏',
          img: classPraise,
          x: 200,
          y: 200
        },
        {
          key: '9',
          title: '班级简介',
          img: classShow,
          x: 200,
          y: 200
        }
      ]
    }
  },
  computed: {
    ...mapState('home', [
      'userInfo'
    ])
  },
  mounted() {
    this.showList()
    this.scrollH = document.documentElement.offsetHeight
  },
  methods: {
    ...mapActions('home', [
      'addWelcome'
    ]),
    transform(type, val) {
      if (type === 'size') {
        const data = {
          '200': 1,
          '420': 2
        }
        return data[val]
      } else if (type === 'position') {
        if (parseInt(val.y / 210) >= 2) {
          if (parseInt(val.x / 210) >= 3) {
            return 12
          } else if (parseInt(val.x / 210) >= 2) {
            return 11
          } else if (parseInt(val.x / 210) >= 1) {
            return 10
          } else {
            return 9
          }
        } else if (parseInt(val.y / 210) >= 1) {
          if (parseInt(val.x / 210) >= 3) {
            return 8
          } else if (parseInt(val.x / 210) >= 2) {
            return 7
          } else if (parseInt(val.x / 210) >= 1) {
            return 6
          } else {
            return 5
          }
        } else {
          if (parseInt(val.x / 210) >= 3) {
            return 4
          } else if (parseInt(val.x / 210) >= 2) {
            return 3
          } else if (parseInt(val.x / 210) >= 1) {
            return 2
          } else {
            return 1
          }
        }
      }
    },
    start (event) {
      console.log(event)
    },
    end (ev) {
      console.log(ev)
      if (ev.to.className === 'dragArea11') {
        console.log(ev.item.id)
        console.log(ev.to.childNodes[ev.newIndex].offsetLeft, ev.to.childNodes[ev.newIndex].offsetTop)
        console.log(ev.to.childNodes)
        this.setList = Array.prototype.slice.call(ev.to.childNodes).map(ele => {
          return {
            name: ele.innerText,
            width: this.transform('size', ele.offsetWidth),
            height: this.transform('size', ele.offsetHeight),
            position: this.transform('position', { x: ele.offsetLeft, y: ele.offsetTop })
          }
        })
        this.$set(this.imgList[ev.oldIndex], 'flag', true)
        console.log(this.setList)
      }
    },
    yzSize(item) {
      if (item.position > 0 && item.position < 5 && ((item.position + item.width) > 5 || item.height > 3)) {
        return false
      }
      if (item.position > 4 && item.position < 9 && ((item.position - 4 + item.width) > 5 || item.height > 2)) {
        return false
      }
      if (item.position > 8 && item.position < 13 && ((item.position - 8 + item.width) > 5 || item.height > 1)) {
        return false
      }
      return true
    },
    allowMove(ev) {
      console.log(ev.draggedContext.element)
      if (this.setList.length > 0 && this.setList[this.setList.length - 1].position + 1 > 12) {
        return false
      }
      let allowTag = true
      this.setList.push({
        name: ev.draggedContext.element.title,
        width: this.transform('size', ev.draggedContext.element.x),
        height: this.transform('size', ev.draggedContext.element.y),
        position: this.setList.length === 0 ? 1 : this.setList[this.setList.length - 1].position + 1
      })
      this.setList.forEach(el => {
        if (!this.yzSize(el)) {
          allowTag = false
        }
      })
      const i = this.setList.findIndex((value, index, arr) => {
        return value.name === ev.draggedContext.element.title
      })
      this.setList.splice(i, 1)
      return allowTag
    },
    handleDel (index, key) {
      this.list.splice(index, 1)
      const q = this.imgList.find((value, index, arr) => {
        return value.key === key
      })
      const i = this.setList.findIndex((value, index, arr) => {
        return value.name === q.title
      })
      this.setList.splice(i, 1)
      this.$set(q, 'flag', false)
    },
    async showList () {
    },
    chooseImg (item, index) {
      this.active = index
    },
    addSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
        }
      })
      let allowTag = true
      this.setList.forEach(el => {
        if (!this.yzSize(el)) {
          allowTag = false
        }
      })
      if (!allowTag) {
        this.$message.error('格式错误')
        return
      }
      this.delTag = false
      this.$nextTick(() => {
        html2canvas(this.$refs.imageWrapper, {
          scale: 0.8,
          width: 900,
          height: 660
        }).then(canvas => {
          const dataURL = canvas.toDataURL('image/png')
          this.imgUrl = dataURL
          console.log(this.imgUrl)
        })
        this.delTag = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .control-tab {
    width: 180px;
    background-color:#fff;
  }
  .mode-content{
    background-color:#fff;
    padding: 20px 0px 20px 20px;
    overflow-y: auto;
  }
  .go-back{
    margin-bottom: 5px;
    color: #1890ff;
    cursor: pointer;
  }
  .content-left{
    width: 900px;
    height: 100%;
    overflow: auto;
    margin-right: 20px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .imageWrapper{
      width: 900px;
      height: 660px;
    }
    .dragArea11{
      margin-bottom: 20px;
      overflow: hidden;
    }
    .content-input{
      margin-bottom:40px;
      width: 60%;
      height: 10%;
      text-align: center;
      font-size: 18px;
      border-radius: 8px;
    }
  }
  .notice-card {
    border-radius: 4px;
    float: left;
    width: 200px;
    height: 200px;
    margin: 10px;
    overflow: hidden;
    border: 1px solid #ccc;
    height: 200px;
    cursor: pointer;
    position: relative;
    .del-btn{
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .notice-title{
      padding: 3px 0;
    }
    .add{
      p{
        margin-top: 5px;
      }
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #ddd;
    }
  }
  .active{
    border: 2px solid @main-color;
  }
  .qui-fx-f6 {
    min-width: 0px;
    flex: 6;
    position: relative;
  }
  .right-img{
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .content-right{
    background: #f5f5f5;
    padding: 10px;
    margin: 0 10px;
    .box{
      overflow: auto;
      margin: 10px 0;
      border-radius: 8px;
      .notice-card {
        max-width: 200px;
        width: calc( 50% - 20px);
      }
      .choose{
        border: 1px solid @main-color;
      }
    }
  }
  .wrap-table{
    width: 100%;
  }
</style>
