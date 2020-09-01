<template>
  <div class="page-layout qui-fx-ver">
    <a-tabs v-model="autoKey" @change="tabChange">
      <a-tab-pane tab="横板" key="1">
      </a-tab-pane>
      <a-tab-pane tab="竖版" key="2">
      </a-tab-pane>
    </a-tabs>
    <div class="qui-fx-f1">
      <div class="box-scroll" :style="{height: scrollH -50+ 'px'}">
        <div class="notice-card notice qui-fx-ac-jc">
          <div class="float-add-btn" @click="add"></div>
          <div>添加</div>
        </div>
        <div class="notice-card qui-fx" v-for="item in noticeList" :key="item.id" style="position: relative;">
          <div class="qui-fx-f1 qui-fx-ver qui-fx-jsb" >
            <div class="qui-te">
              <span class="title">{{ item.title }}</span>
              <a-popover>
                <template slot="content">
                  {{ item.content }}
                </template>
                <span class="content">{{ item.content }}</span>
              </a-popover>
            </div>
            <div class="notice-img qui-fx-ac-jc" :style="{'backgroundImage': 'url('+item.photoUrl+')'}">
            </div>
            <div class="qui-fx-jsb qui-fx-ac">
              <div>
                <div class="disable" v-if="item.useNum === 0">未启用</div>
                <div class="useNum" v-else>{{ item.useNum }}台设备使用中</div>
              </div>
              <div class="notice-action">
                <a-tag color="#2db7f5" @click="modifyApp(item)">编辑</a-tag>
                <a-tag color="#f50" style="margin-left: 5px;" @click="delClick(item)">删除</a-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <page-num :total="total" v-model="pageList" @change-page="welcomeGet"></page-num>
  </div>
</template>
<script>
import PageNum from '@c/PageNum'
import { mapState, mapActions } from 'vuex'
import photoUrl from '@a/img/bg_1.png'
export default {
  name: 'TemplateManage',
  components: {
    PageNum
  },
  data() {
    return {
      autoKey: '1',
      noticeList: [{
        title: '默认模板',
        content: '系统提供的默认模板，不可删除',
        id: 'M144i03z0yvzin1',
        photoUrl: photoUrl,
        useNum: 1
      },
      {
        title: '模板A',
        content: '说明文字说明文字说明文字说明文字',
        id: 'M144i03z0yvzin2',
        photoUrl: photoUrl,
        useNum: 0
      }],
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      scrollH: 0
    }
  },
  computed: {
    ...mapState('home', [
      'authWebUserInfo'
    ])
  },
  mounted() {
    this.scrollH = document.documentElement.offsetHeight - 200
  },
  methods: {
    ...mapActions('home', ['getWelcome']),
    tabChange() {
      if (this.autoKey === '1') {
        this.noticeList = [
          {
            title: '默认模板',
            content: '系统提供的默认模板，不可删除',
            id: 'M144i03z0yvzin1',
            photoUrl: photoUrl,
            useNum: 1
          },
          {
            title: '模板A',
            content: '说明文字说明文字说明文字说明文字',
            id: 'M144i03z0yvzin2',
            photoUrl: photoUrl,
            useNum: 0
          }]
      }
      if (this.autoKey === '2') {
        this.noticeList = []
      }
    },
    async welcomeGet () {
      this.pageList.schoolScheme = this.authWebUserInfo.exts.schoolScheme
      const res = await this.getWelcome(this.pageList)
      this.total = res.data.total
      this.noticeList = res.data.list
    },
    add(type) {
      let path = ''
      path = `/templateManage/template`
      this.$router.push({ path })
    },
    modifyApp() {

    },
    delClick (record) {
      this.$tools.delTip('确认要删除该欢迎模式吗?', () => {
        this.$message.success('删除成功')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.notice-card {
    border-radius: 4px;
    background-color:#f5f5f5;
    padding: 10px;
    float: left;
    width: 23.33%;
    margin-left: 1%;
    overflow: hidden;
    margin-bottom: 20px;
    min-height: 200px;
    .title{
      font-size: 16px;
      font-weight: bold;
      margin-right: 10px;
    }
    .content{
      color: #666;
    }
    .useNum{
      color: @main-color;
    }
    .disable{
      color: #ccc;
    }
  }
  .notice{
    height: 296px;
  }
  .notice-img {
    margin: 15px 15px 15px 0;
    width: 100%;
    height: 200px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .float-add-btn {
    width: 100px;
    height: 100px;
    background: url('../../assets/img/add-btn.png') no-repeat;
    background-size: 100%;
  }
</style>
