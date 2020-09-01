<template>
  <div class="qui-fx-ver qui-fx-f1" style="padding: 10px;">
    <a-modal
      mask
      :footer="null"
      width="800px"
      :maskClosable="false"
      :title="noticeTitle"
      :visible="isShow"
      @ok="isShow = false"
      @cancel="isShow = false"
    >
      <div class="u-tx-c u-font-2 u-padd-b10">{{ newDetail.title }}</div>
      <div class="u-tx-c u-padd-b10 u-font-01 u-tips-color">
        <span>发布人：{{ newDetail.publisherName }}</span>
        <span class="u-padd-l">发布时间：{{ $tools.getDate(newDetail.creatTime) }}</span>
      </div>
      <div class="u-fx-ac">
        <div @click="seeNotice('left')" class="left-icon" v-if="currentIndex !== 0 && isIcon"></div>
        <div class="u-line2 u-fx-f1" style="height: 500px" v-html="newDetail.content"></div>
        <div
          @click="seeNotice('right')"
          class="right-icon"
          v-if="currentIndex !== unReadList.length - 1 && isIcon"
        ></div>
      </div>
      <div class="u-tx-r">
        <a-button type="default" v-if="false">不在提示</a-button>
        <a-button type="primary" class="u-mar-l" @click="isShow = false">关闭</a-button>
      </div>
    </a-modal>
    <div class="banner-img">
      <img :src="Banner" alt />
    </div>
    <div class="qui-fx-f1 qui-fx content qui-of">
      <div class="qui-fx-f1 content-box qui-fx-ver" style="margin-right: 10px;">
        <div class="title qui-fx-ac">
          <img :src="app" alt />我的应用
        </div>
        <div class="qui-fx-f1 app">
          <div class="pos-box" style="overflow-y: auto; padding-bottom: 10px">
            <no-data style="padding-top: 100px" v-if="menuList.length === 0" msg="暂无应用~"></no-data>
            <ul>
              <li
                @click="goApp(index)"
                v-for="(list, index) in menuList"
                :key="list.id"
                class="qui-fx-ac-jc"
                :style="{ backgroundColor: colors[0] }"
              >
                <img :src="list.icon" @error="$tools.errorImg($event)" alt />
                <div style="margin-top: 15px" class="qui-te">{{ list.name.split('#')[0] }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content-box qui-fx-ver">
        <div class="title qui-fx-ac">
          <img :src="news" alt />平台消息
        </div>
        <div class="qui-fx-f1 notice">
          <div class="pos-box" style="overflow: auto; padding-bottom: 10px">
            <no-data style="padding-top: 100px" v-if="newList.length === 0" msg="暂无消息~"></no-data>
            <ul>
              <li
                @click="seeNotice(list, index)"
                v-for="(list, index) in newList"
                :key="list.id"
                class="qui-fx u-fx-ac"
              >
                <div class="tips" v-if="!list.readStatus"></div>
                <div class="qui-fx-f1 qui-te u-content-color">{{ list.title }}</div>
                <div class="u-tips-color">{{ $tools.getDate(list.creatTime).substr(5, 11) }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Banner from '../assets/img/banner.png'
import news from '../assets/img/news.png'
import app from '../assets/img/app.png'
import NoData from '@c/NoData'
export default {
  name: 'BasicContent',
  computed: {
    ...mapState('home', ['menuList', 'loginType', 'schoolCode'])
  },
  data() {
    return {
      unReadList: [],
      isIcon: false,
      currentIndex: 0,
      noticeTitle: '消息详情',
      isShow: false,
      Banner,
      news,
      app,
      appList: [],
      newList: [],
      newDetail: { creatTime: '' },
      colors: [
        '#4D4CAC',
        '#56A36C',
        '#5E8579',
        '#77C34F',
        '#2E68AA',
        '#7E884F',
        '#E08031',
        '#199475',
        '#0B6E48',
        '#044D22'
      ]
    }
  },
  components: {
    NoData
  },
  async mounted() {
    this._searchNotice()
  },
  methods: {
    ...mapActions('home', ['searchPersonNotice', 'readPersonNotice']),
    /**
     * @des 列表
     */
    async _searchNotice() {
      const res = await this.searchPersonNotice({
        page: 1,
        size: 20,
        userCode: this.loginType.userCode,
        eduCode: this.schoolCode
      })
      this.newList = res.data.list.map(item => {
        return {
          id: item.noticeCode,
          ...item
        }
      })
      this.unReadList = res.data.list.filter(item => {
        return item.popFalg === '1' && !item.readStatus
      })
      if (this.unReadList.length > 0) {
        this.isShow = true
        this.isIcon = true
        this.newDetail = this.unReadList[0]
        this.readStatus(this.newDetail)
      }
    },
    /**
     * @description 查询公告详情
     */
    seeNotice(index, _index) {
      this.isShow = true
      if (index === 'left') {
        this.currentIndex--
        this.newDetail = this.unReadList[this.currentIndex]
      } else if (index === 'right') {
        this.currentIndex++
        this.newDetail = this.unReadList[this.currentIndex]
      } else {
        this.newList[_index].readStatus = '1'
        this.isIcon = false
        this.newDetail = index
      }
      this.readStatus(this.newDetail)
    },
    /**
     * @description 阅读消息
     */
    async readStatus(item) {
      await this.readPersonNotice({
        eduCode: this.schoolCode,
        noticeCodes: [item.noticeCode],
        userCode: this.loginType.userCode
      })
    },
    goApp(index) {
      const url = this.menuList[index].url || ''
      /**
       * @des 校端看板
       */
      if (url.indexOf('school-view') > -1) {
        window.open(
          url +
            '&schoolCode=' +
            JSON.parse(window.sessionStorage.getItem('loginInfo')).schoolCode +
            '&schoolName=' +
            JSON.parse(window.sessionStorage.getItem('loginInfo')).schoolName
        )
        return
      }
      if (url.indexOf('http') > -1 || url.indexOf('https') > -1) {
        window.open(url + '?id=' + JSON.parse(window.sessionStorage.getItem('loginInfo')).id)
      } else {
        this.$emit('entryApp', index)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.banner-img {
  height: 380px;
  img {
    width: 100%;
    height: 380px;
  }
}
.left-icon {
  width: 30px;
  height: 30px;
  background: url('../assets/img/left.png') no-repeat;
  background-size: 30px;
  margin-right: 20px;
  cursor: pointer;
}
.right-icon {
  width: 30px;
  height: 30px;
  background: url('../assets/img/right.png') no-repeat;
  background-size: 30px;
  margin-left: 20px;
  cursor: pointer;
}
.content-box {
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 1px 1px 3px #f5f5f5;
  padding: 15px;
  overflow: hidden;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 1px #ccc dashed;
    img {
      margin-right: 10px;
    }
  }
}
.content {
  margin-top: 10px;
}
.app {
  li {
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    margin-top: 30px;
    background-color: rgba(77, 76, 172);
    box-shadow: 1px 1px 6px #e8e8e8;
    float: left;
    cursor: pointer;
    height: 100px;
    margin-left: 1.33%;
    transition: all 0.3s ease;
    width: 11%;
    font-size: 14px;
    img {
      width: 40px;
      height: 40px;
    }
    &:hover {
      transform: scale(1.05);
    }
  }
}
.notice {
  overflow: hidden;
  width: 400px;
  .tips {
    margin-right: 6px;
    background-color: @u-type-primary;
    width: 8px;
    height: 8px;
    border-radius: 100%;
  }
  li {
    height: 50px;
    line-height: 50px;
    padding-right: 8px;
    transition: padding 0.3s ease;
    border-bottom: 1px #f5f5f5 solid;
    cursor: pointer;
    &:hover {
      color: @main-color;
      padding-left: 4px;
    }
  }
}
</style>
