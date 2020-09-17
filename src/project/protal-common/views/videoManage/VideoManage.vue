<template>
  <div class="page-layout qui-fx-ver">
    <div class="u-padd-10 qui-fx-je">
      <a-button type="primary" @click="addRole(0)"> <a-icon type="plus" />上传视频
      </a-button>
    </div>
    <no-data msg="暂无数据" v-if="false"></no-data>
    <div class="qui-fx-ver">
      <div class="u-auto" :style="{height: scrollH + 'px'}">
        <div
          class="notice-card qui-fx"
          v-for="(item, i) in 20"
          :key="i"
          style="position: relative;"
        >
          <div class="pic qui-fx-f1 qui-fx-ver qui-fx-jsb">
            <div
              class="notice-img qui-fx-ac-jc"
              :style="{'backgroundImage': 'url('+(item.imgUrl || 'http://canpointtest.com/mobile-img/default.png')+')'}"
            >
              <div class="play">
                <a-icon class="u-font-2" type="caret-right" />
                <span class="u-mar-l5">00:30</span>
              </div>
            </div>
            <div class="qui-fx-jsb qui-fx-ac">
              <div>
                视频{{ i + 1 }}
              </div>
              <div class="notice-action qui-fx">
                <a-tooltip placement="topLeft" title="编辑">
                  <a-button
                    size="small"
                    class="edit-action-btn"
                    icon="form"
                    @click.stop="edit(item)"
                  ></a-button>
                </a-tooltip>
                <a-tooltip placement="topLeft" title="删除">
                  <a-button
                    size="small"
                    class="del-action-btn u-mar-l5"
                    icon="delete"
                    @click.stop="delClick(item)"
                  ></a-button>
                </a-tooltip>
                <a-dropdown>
                  <a class="ant-dropdown-link u-mar-l5" @click="e => e.preventDefault()">
                    更多 <a-icon type="down" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a @click.stop="add(1, item)">添加照片</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a @click.stop="fullScreenTo(item)">全屏展示设置</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a @click.stop="useTo(item)">轮播设置</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import NoData from '@c/NoData'
export default {
  name: 'AlbumManage',
  components: {
    NoData
  },
  data() {
    return {
      albumList: [],
      scrollH: 0
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  created() {
    this.scrollH = document.documentElement.offsetHeight - 120
  },
  mounted() {
  },
  methods: {
    ...mapActions('home', []),
    async showList() {
      this.pageList.schoolCode = this.userInfo.schoolCode
      this.pageList.status = this.weleState
      const res = await this.getWelcomeList(this.pageList)
      this.albumList = res.data.list
    },
    useTo(item) {

    },
    fullScreenTo(item) {

    },
    edit(item) {

    },
    add(item) {

    },
    delClick(record) {
      this.$tools.delTip('确认要删除该视频吗?', () => {
        this.delWelcomeById(record.id).then((res) => {
          this.$message.success('删除成功')
          this.$tools.goNext(() => {
            this.showList()
          })
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.notice-card {
  border-radius: 4px;
  background-color: #f5f5f5;
  padding: 10px;
  float: left;
  width: 18.88%;
  margin-left: 1%;
  overflow: hidden;
  margin-bottom: 20px;
  min-height: 200px;
}
.notice-img {
  margin: 0 15px 10px 0;
  width: 100%;
  height: 200px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  .play{
    position: absolute;
    left: 5px;
    bottom: 0px;
  }
}
.u-mar-l5{
  margin-left: 5px;
}
</style>
