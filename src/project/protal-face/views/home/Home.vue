<template>
  <div class="data-view pos-box qui-fx-ver">
    <div class="pos-box qui-fx-ver" style="padding: 0 30px 30px;">
      <div class="data-top qui-fx">
        <div class="qui-fx-f1">
          <dv-decoration-8 :color="borderColor" style="width:100%;height:60px;" />
        </div>
        <div class="qui-fx-f2">
          <div class="pos-box data-title">
            <img :src="logo" alt="" />
          </div>
          <dv-decoration-5 :color="borderColor" dur="6" style="width:100%;height:60px; color:#ff"> </dv-decoration-5>
        </div>
        <div class="qui-fx-f1">
          <div class="pos-box data-time">{{ dateTime }}</div>
          <dv-decoration-8 :color="borderColor" :reverse="true" style="width:100%;height:60px;" />
        </div>
      </div>
      <div class="qui-fx-f1 qui-fx">
        <div class="data-left qui-fx-f1 qui-fx-ver">
          <div class="data-video qui-fx-f1">
            <dv-border-box-9>
              <div class="pos-box qui-fx-ac qui-fx-jc">
                <div class="contrast-photo">
                  <div class="photo">
                    <dv-border-box-8>
                      <img :src="face1" alt="" />
                    </dv-border-box-8>
                  </div>
                  <div class="info">
                    <div>地点：学校东大门</div>
                    <div>时间：2020-04-12 12:12:24</div>
                  </div>
                </div>
                <div class="contrast-result qui-fx-ver qui-fx-ac">
                  <dv-decoration-9 class="result">
                    66%
                  </dv-decoration-9>
                  <dv-decoration-11 class="number">对比成功</dv-decoration-11>
                </div>
                <div class="contrast-photo">
                  <div class="photo">
                    <img :src="face1" alt="" />
                  </div>
                  <div class="info">
                    <div>姓名：张立</div>
                    <div>卡号：439019281721821721278</div>
                  </div>
                </div>
              </div>
            </dv-border-box-9>
          </div>
          <div class="data-record">
            <dv-border-box-10 :color="borderColor">
              <div class="pos-box" style="width: 99%; margin-right: 1%; overflow-x:scroll;white-space: nowrap">
                <div class="contrast-list" v-for="contrast in contrastList" :key="contrast.id">
                  <div class="pic qui-fx">
                    <img :src="contrast.img1" alt="" />
                    <img class="pic-two" :src="contrast.img2" alt="" />
                  </div>
                  <div class="info">
                    <div class="qui-fx-jsb">
                      <div>姓名: {{ contrast.name }}</div>
                      <div>地点：{{ contrast.address }}</div>
                    </div>
                    <div>卡号：{{ contrast.cardNo }}</div>
                    <div>时间：{{ contrast.time }}</div>
                  </div>
                </div>
              </div>
            </dv-border-box-10>
          </div>
        </div>
        <div class="data-face">
          <dv-border-box-10 :color="borderColor">
            <div class="pos-box box-scroll qui-fx-ver qui-fx-jsa" style="height: 97%; margin-top: 3%;">
              <div
                class="bg-show qui-fx"
                :style="{ color: record.color }"
                v-for="(record, index) in recordList"
                :key="index"
              >
                <div class="bg-wh">
                  <img :src="record.img" alt="" />
                </div>
                <div class="qui-fx-f1">
                  <div class="title">{{ record.title }}</div>
                  <div class="total qui-fx">
                    <div class="total-number" v-for="(num, ind) in record.total.split('')" :key="ind">
                      <dv-border-box-10 :color="[record.color, record.color]">{{ num }}</dv-border-box-10>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-10>
        </div>
      </div>
    </div>
    <dv-border-box-11 :titleWidth="300" class="qui-fx-f1 qui-fx-ver" title="贵阳观山湖区华润小学"></dv-border-box-11>
  </div>
</template>

<script>
import face1 from '../../images/face1.jpg'
import face2 from '../../images/face2.jpg'
import face3 from '../../images/face3.jpg'
import face4 from '../../images/face4.jpg'
import face5 from '../../images/face5.jpg'
import face6 from '../../images/face6.jpg'
import face7 from '../../images/face7.jpg'
import face8 from '../../images/face8.jpg'
import face9 from '../../images/face9.jpg'
import zx from '../../images/bg-zx.png'
import dx from '../../images/bg-dx.png'
import lx from '../../images/bg-lx.png'
import warn from '../../images/warn.png'
import success from '../../images/success.png'
import logo from '../../images/logo.png'
export default {
  name: 'Home',
  components: {},
  computed: {},
  data() {
    return {
      logo,
      warn,
      success,
      face1,
      face2,
      dateTime: '',
      contrastList: [
        {
          id: 1,
          img1: face1,
          img2: face2,
          name: '张立',
          address: '校大门',
          cardNo: '429006182738918271621',
          time: '2020-04-12 10:12:23'
        },
        {
          id: 2,
          img1: face1,
          img2: face2,
          name: '张立',
          address: '校大门',
          cardNo: '429006182738918271621',
          time: '2020-04-12 10:12:23'
        }
      ],
      recordList: [
        {
          img: zx,
          title: '实时在校人数',
          total: '1345',
          color: '#c2ae29'
        },
        {
          img: dx,
          title: '今日到校人数',
          total: '1000',
          color: '#2ec5c0'
        },
        {
          img: lx,
          title: '今日离校人数',
          total: '1200',
          color: '#d02629'
        }
      ],
      imgList: [
        {
          id: 1,
          url: face1,
          name: '李传亮'
        },
        {
          id: 2,
          url: face2,
          name: '朱本福'
        },
        {
          id: 3,
          url: face3,
          name: '宋祥'
        },
        {
          id: 4,
          url: face4,
          name: '张文键'
        },
        {
          id: 5,
          url: face5,
          name: '张坤'
        },
        {
          id: 6,
          url: face6,
          name: '张立'
        },
        {
          id: 7,
          url: face7,
          name: '高鸿志'
        },
        {
          id: 8,
          url: face8,
          name: '王选章'
        },
        {
          id: 9,
          url: face9,
          name: '朱旭'
        }
      ],
      borderColor: ['#204486', '#00ffff'],
      faceList: []
    }
  },
  directives: {
    scale: {
      inserted: function(el) {}
    }
  },
  mounted() {
    setInterval(() => {
      this.dateTime = this.getDateTime()
    }, 1000)
    setInterval(() => {
      const obj = {
        id: Math.floor(Math.random() * 10000),
        img1: face1,
        img2: face2,
        name: Math.floor(Math.random() * 100),
        address: '校大门',
        cardNo: '429006182738918271621',
        time: '2020-04-12 10:12:23'
      }
      if (this.faceList.length > 50) {
        this.contrastList.splice(50)
      }
      this.contrastList.unshift(obj)
    }, 1500)
  },
  methods: {
    // 获取时间日期
    getDateTime() {
      var today = new Date()
      var hou
      var time
      var day
      if (today.getHours() <= 12 && today.getHours() >= 0) {
        hou = today.getHours()
        time = 'AM'
      } else if (today.getHours() <= 24 && today.getHours() > 12) {
        hou = today.getHours() - 12
        time = 'PM'
      }
      var d = parseInt(today.getDay())
      if (d === 0) {
        day = '日'
      } else if (d === 1) {
        day = '一'
      } else if (d === 2) {
        day = '二'
      } else if (d === 3) {
        day = '三'
      } else if (d === 4) {
        day = '四'
      } else if (d === 5) {
        day = '五'
      } else if (d === 6) {
        day = '六'
      }
      return (
        today.getFullYear() +
        '年' +
        (today.getMonth() + 1) +
        '月' +
        today.getDate() +
        '日 ' +
        (hou < 10 ? '0' + hou : hou) +
        ':' +
        (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()) +
        ':' +
        (today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds()) +
        ' ' +
        ' 星期' +
        day
      )
    }
  }
}
</script>

<style lang="less" scoped>
.data-view {
  background-color: #041e49;
}
.box-scroll {
  overflow: hidden;
}
@keyframes moveLeft {
  0% {
    width: 0px;
  }
  100% {
    width: 320px;
  }
}
.data-title {
  z-index: 99;
  top: -20px;
  width: 100%;
  height: 40px;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 4px;
  text-align: center;
  img {
    width: 4.2rem;
    margin: 0 auto;
    height: auto;
    display: block;
  }
}
.data-time {
  top: -5px;
  z-index: 99;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 600;
  color: #87eff8;
  text-align: center;
}
.data-top {
  padding-top: 30px;
  height: 120px;
  letter-spacing: 2px;
  background: #041e49;
}
.data-left {
  .data-video {
    margin: 10px 0 20px 0;
  }
  .data-record {
    height: 30vh;
  }
  .contrast-photo {
    .photo {
      border: 6px #204486 solid;
      border-radius: 8px;
      width: 2.4rem;
      height: 2.6rem;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .info {
      padding: 0.1rem 0;
      color: #87eff8;
      line-height: 0.25rem;
    }
  }
  .contrast-result {
    margin: 0 0.5rem;
    .result {
      width: 1.5rem;
      height: 1.5rem;
      color: #fff;
      font-size: 24px;
    }
    .number {
      width: 2.4rem;
      height: 0.7rem;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 2px;
      margin-top: 0.4rem;
    }
  }
  .contrast-list {
    padding: 0.1rem;
    width: 320px;
    height: 26vh;
    display: inline-block;
    position: relative;
    background: #06104d;
    animation: moveLeft ease-out 0.3s;
    margin-left: 0.12rem;
    margin-top: 0.2rem;
    border: 4px #204486 solid;
    border-radius: 2px;
    position: relative;
    img {
      width: 140px;
      display: block;
      height: 150px;
    }
    .pic-two {
      margin-left: 0.1rem;
    }
    .info {
      color: #87eff8;
      padding: 0.05rem 0;
      line-height: 0.22rem;
    }
  }
}
.data-face {
  margin: 10px 0 0px 20px;
  width: 5rem;
  .bg-show {
    margin: 0 auto;
    width: 4.06rem;
    height: 1.72rem;
    background: url('../../images/bg-show.png') no-repeat;
    background-size: 100%;
    .bg-wh {
      width: 0.67rem;
      height: 0.61rem;
      margin: 0.3rem 0 0 0.4rem;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .title {
      letter-spacing: 2px;
      margin: 0.2rem 0 0 0.6rem;
      font-size: 18px;
      font-weight: bold;
    }
    .total {
      margin: 0.15rem 0 0 0.6rem;
    }
    .total-number {
      width: 0.45rem;
      text-align: center;
      line-height: 0.5rem;
      height: 0.5rem;
      font-size: 30px;
      font-weight: bold;
      margin-right: 0.1rem;
    }
  }
}
</style>
