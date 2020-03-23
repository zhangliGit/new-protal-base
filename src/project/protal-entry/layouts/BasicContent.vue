<template>
  <div class="qui-fx-ver qui-fx-f1" style="padding: 10px;">
    <div class="banner-img">
      <img :src="Banner" alt="">
    </div>
    <div class="qui-fx-f1 qui-fx content qui-of">
      <div class="qui-fx-f1 content-box qui-fx-ver" style="margin-right: 10px;">
        <div class="title qui-fx-ac">
          <img :src="app" alt="">我的应用
        </div>
        <div class="qui-fx-f1 app">
          <div class="pos-box" style="overflow: auto; padding-bottom: 10px">
            <no-data style="padding-top: 100px" v-if="menuList.length === 0" msg="暂无应用~"></no-data>
            <ul>
              <li @click="goApp(index)" v-for="(list, index) in menuList" :key="list.id" class="qui-fx-ac-jc" :style="{backgroundColor: colors[0]}">
                <img :src="list.icon" @error="$tools.errorImg($event)" alt="">
                <div style="margin-top: 15px" class="qui-te">{{ list.name }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content-box qui-fx-ver">
        <div class="title qui-fx-ac">
          <img :src="news" alt="">平台消息
        </div>
        <div class="qui-fx-f1 notice">
          <div class="pos-box" style="overflow: auto; padding-bottom: 10px">
            <no-data style="padding-top: 100px" v-if="newList.length === 0" msg="暂无消息~"></no-data>
            <ul>
              <li v-for="list in newList" :key="list.id" class="qui-fx">
                <div class="qui-fx-f1 qui-te">{{ list.title }}</div>
                <div>{{ list.time }}</div>
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
    ...mapState('home', [
      'menuList'
    ])
  },
  data () {
    return {
      Banner,
      news,
      app,
      appList: [],
      newList: [],
      colors: ['#4D4CAC', '#56A36C', '#5E8579', '#77C34F', '#2E68AA', '#7E884F', '#E08031', '#199475', '#0B6E48', '#044D22']
    }
  },
  components: {
    NoData
  },
  mounted () {
  },
  methods: {
    ...mapActions('home', [
      'getNews'
    ]),
    goApp (index) {
      this.$emit('entryApp', index)
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
    margin-top: 10px
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
      height: 120px;
      margin-left: 1.75%;
      transition: all .3s ease;
      width: 14.6%;
      font-size: 14px;
      img {
        width: 60px;
        height: 60px;
      }
      &:hover {
        transform: scale(1.05)
      }
    }
  }
  .notice {
    overflow: hidden;
    width: 400px;
    li {
      height: 50px;
      line-height: 50px;
      padding-right: 8px;
      transition: padding .3s ease;
      border-bottom: 1px #f5f5f5 solid;
      cursor: pointer;
      &:hover {
        color: @main-color;
        padding-left: 4px;
      }
    }
  }
</style>
