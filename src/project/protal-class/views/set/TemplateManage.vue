<template>
  <div class="page-layout qui-fx-ver">
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
                <a-dropdown>
                  <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                    更多 <a-icon type="down" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a @click.stop="editTemplate(item.id)">编辑模板</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a @click.stop="delTemplate(item.id)">删除模板</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a @click.stop="useTemplate(item.id)">应用到指定设备</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
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
    editTemplate(id) {
      console.log(id)
    },
    delTemplate(id) {
      console.log(id)
    },
    useTemplate(id) {
      console.log(id)
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
    overflow: hidden;
    margin: 20px 0 20px 1%;
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
