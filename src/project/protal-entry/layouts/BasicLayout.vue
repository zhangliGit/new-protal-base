<template>
  <a-layout class="qui-fx">
    <div :class="['slide-left', {'slide-left-close': slideTag}]">
      <side-menu
        ref="slideMenu"
        @goSrc="goSrc"
        mode="inline"
        :theme="navTheme"
      ></side-menu>
    </div>
    <div class="qui-fx-f1 qui-fx-ver">
      <header-top :school-list="schoolList"></header-top>
      <div class="qui-fx-f1 qui-fx">
        <basic-content v-if="!isEntryApp" @entryApp="entryApp"></basic-content>
        <iframe v-if="isEntryApp" id="iframe-content" src="" frameborder="0" @error="alert('Failed')"></iframe>
      </div>
    </div>
  </a-layout>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin'
import adminMenu from '../assets/js/admin-menu'
import BasicContent from './BasicContent'
import SideMenu from '../components/Menu/SideMenu'
import HeaderTop from '@/components/GlobalHeader/HeaderTop'

export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    SideMenu,
    HeaderTop,
    BasicContent
  },
  computed: {
    ...mapState('home', [
      'isEntryApp',
      'slideTag'
    ])
  },
  data () {
    return {
      routeAddress: [],
      schoolList: []
    }
  },
  watch: {
  },
  async mounted () {
    const { id, accountType, userType, schoolCode } = JSON.parse(window.sessionStorage.getItem('loginInfo') || { id: '485' })
    if (accountType === 1 && userType === 1) {
      this.updateState({
        key: 'menuList',
        data: adminMenu
      })
    } else {
      const res = await this.getApp({
        schoolCode,
        userType,
        plateformType: 2,
        userId: id
      })
      this.updateState({
        key: 'menuList',
        data: res.data
      })
    }
  },
  methods: {
    ...mapActions('home', [
      'getApp'
    ]),
    ...mapMutations('home', [
      'updateState'
    ]),
    entryApp (index) {
      /**
       * 设置进入应用和菜单展开状态值
       */
      this.updateState({
        key: 'isEntryApp',
        data: true
      })
      this.updateState({
        key: 'slideTag',
        data: false
      })
      this.$refs.slideMenu.changeModule(index)
    },
    goSrc (path) {
      this.$nextTick(() => {
        if (process.env.NODE_ENV === 'production') {
          document.querySelector('#iframe-content').src = `${window.location.origin}${path}`
        } else {
          let params
          if (path.indexOf('pc-protal') > -1) {
            params = path.replace('/pc-protal', '').split('#/')
          } else {
            params = path.split('#/')
          }
          document.querySelector('#iframe-content').src = `${window.location.origin}${params[0]}.html#/${params[1]}`
        }
      })
    }
  }
}
</script>

<style lang="less">
@import url('../../../components/global.less');

 #iframe-content {
   width: 100%;
   height: 100%;
 }
.address-list {
  height: 35px;
  margin-top: 4px;
  li {
    float: left;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    .act {
      color: @main-color;
      cursor: pointer;
    }
  }
}
.slide-left {
  transition: width .3s ease;
  width: 240px;
  overflow: hidden;
}
.slide-left-close {
  width: 50px;
}
.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
