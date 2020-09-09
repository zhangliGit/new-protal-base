<template>
  <div class="page-layout qui-fx-ver">
    <div class="mode-content qui-fx">
      <div ref="imageWrapper" id="content" class="box-scroll content-left" :style="{height: (scrollH - 60) + 'px'}">
        <draggable
          :list="list"
          :options="{group:'article', disabled: disabled}"
          @start="start22"
          @end="end22"
          class="dragArea11"
          :style="{'backgroundImage' : 'url('+gridImg+')','height': '660px', 'width':'100%'}">
          <div class="notice-card qui-fx-ver" v-for="(item,i) in list" :key="i" :style="{'width':''+(item.x)+'px','height':''+(item.y)+'px'}">
            <div class="qui-fx-f1 qui-fx-ver qui-fx-jsb right-img" :style="{'backgroundImage': 'url('+item.img+')'}"></div>
            <div class="notice-title qui-fx-jc qui-je">{{ item.title }}</div>
            <div v-if="item.img">
              <a-button icon="delete" class="del-btn" @click="handleDel(i, item.key)"></a-button>
            </div>
          </div>
        </draggable>
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
          :style="{height: (scrollH - 150) + 'px'}">
          <div :id="item.x + '^' + item.y + '^' + item.key" :class="item.flag ? 'undraggable notice-card qui-fx-ver ' : 'notice-card qui-fx-ver ' " v-for="(item, index) in imgList" :key="item.key" @click="chooseImg(item, index)">
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
import bImg1 from '../../assets/img/1_1.png'
import bImg2 from '../../assets/img/1_2.png'
import bImg3 from '../../assets/img/2_2.png'
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
      bImg1,
      bImg2,
      bImg3,
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
      imgList: [
        {
          key: '0',
          title: '班级课表',
          img: bImg2,
          x: 200,
          y: 420
        },
        {
          key: '1',
          title: '班级相册',
          img: bImg3,
          x: 420,
          y: 420
        },
        {
          key: '2',
          title: '班级视频',
          img: bImg3,
          x: 420,
          y: 420
        },
        {
          key: '3',
          title: '新闻',
          img: bImg1,
          x: 200,
          y: 200
        },
        {
          key: '4',
          title: '公告',
          img: bImg1,
          x: 200,
          y: 200
        },
        {
          key: '5',
          title: '值日生',
          img: bImg1,
          x: 200,
          y: 200
        },
        {
          key: '6',
          title: '倒数日',
          img: bImg1,
          x: 200,
          y: 200
        },
        {
          key: '7',
          title: '天气',
          img: bImg1,
          x: 200,
          y: 200
        },
        {
          key: '8',
          title: '班级名片',
          img: bImg1,
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
          '200': '1',
          '420': '2'
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
        const position = this.transform('position', { x: ev.to.childNodes[ev.newIndex].offsetLeft, y: ev.to.childNodes[ev.newIndex].offsetTop })
        console.log(position)
        if (this.girdNum >= 12) {
          this.$message.error('超过限制')
          return
        }
        this.setList.push({
          name: ev.item.innerText,
          id: ev.item.id.split('^')[2],
          width: this.transform('size', ev.item.id.split('^')[0]),
          height: this.transform('size', ev.item.id.split('^')[1]),
          position
        })
        this.$set(this.imgList[ev.oldIndex], 'flag', true)
        console.log(this.setList)
      }
    },
    start22 (event) {
      this.falgs = '222222'
    },
    end22 (ev) {
      this.falgs = 'article'
    },
    handleDel (index, key) {
      this.list.splice(index, 1)
      const q = this.imgList.find((value, index, arr) => {
        return value.key === key
      })
      this.$set(q, 'flag', false)
      const j = this.setList.findIndex(list => list.id === key)
      this.girdNum -= this.setList[j].width * this.setList[j].height
      this.setList.splice(j, 1)
      console.log(this.setList)
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
      html2canvas(this.$refs.imageWrapper).then(canvas => {
        const dataURL = canvas.toDataURL('image/png')
        this.imgUrl = dataURL
        if (this.imgUrl !== '') {
          this.dialogTableVisible = true
        }
        console.log(this.imgUrl)
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
    .dragArea11{
      margin-bottom: 20px;
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
      margin: 3px 0;
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
    }
  }
  .wrap-table{
    width: 100%;
  }
</style>
