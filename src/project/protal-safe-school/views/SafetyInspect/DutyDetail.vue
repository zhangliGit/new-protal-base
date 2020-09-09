<template>
  <div class="accident-add page-layout bg-fff qui-fx-ver">
    <div class="content pos-box">
      <a-form :form="form">
        <a-form-item v-bind="formItemLayout" label="巡查点数量">
          <a-radio-group
            v-decorator="['patrolStatus', {initialValue: detailInfo.patrolStatus }]"
            disabled
          >
            <a-radio :value="list.id" v-for="(list, ind) in list" :key="ind">{{ list.val }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          :label="list.label"
          v-for="(list, index) in formData"
          :key="index"
          required
        >
          <a-input v-decorator="['value', { initialValue: list.value }]" readonly />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="巡查点数量">
          <a-tag color="cyan" @click="look">{{ detailInfo.patrolPointNum }}</a-tag>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="值班轨迹">
          <div @click="check(detailInfo.track)" id="track" style="width:150px;height:150px;"></div>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="事故图片">
          <img :src="url" alt v-for="(url, index) in detailInfo.pictureList" :key="index" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="问题描述">
          <a-textarea
            v-decorator="['details', { initialValue: detailInfo.reportContent }]"
            readonly
          />
        </a-form-item>
      </a-form>
    </div>
    <a-modal
      title="值班轨迹"
      :visible="mapVisible"
      :footer="null"
      centered
      @cancel="mapVisible = false"
      width="680px"
      :destroyOnClose="true"
    >
      <div>
        <div id="container" style="width:630px;height:500px;"></div>
      </div>
    </a-modal>
    <a-modal
      :visible="visible"
      :footer="null"
      centered
      @cancel="visible = false"
      :bodyStyle="bodyStyle"
      width="660px"
      :destroyOnClose="true"
      title="巡查点详情"
    >
      <table-list :columns="columns" :table-list="inspectList"></table-list>
    </a-modal>
  </div>
</template>

<script>
import maps from 'qqmap'
import TableList from '@c/TableList'
import { mapState, mapActions } from 'vuex'
const columns = [
  {
    title: '巡查地点名称',
    dataIndex: 'name',
    width: '30'
  },
  {
    title: '巡查结果',
    dataIndex: 'name1',
    width: '30'
  },
  {
    title: '巡查时间',
    dataIndex: 'createTime',
    width: '40%',
    customRender: (text) => {
      return $tools.getDate(text)
    }
  }
]
export default {
  name: 'AddAccident',
  components: {
    TableList
  },
  data() {
    return {
      columns,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
      },
      formData: [],
      detailId: '',
      detailInfo: {},
      visible: false,
      bodyStyle: {
        padding: 0
      },
      inspectList: [],
      mapVisible: false,
      //腾讯地图
      map: null,
      getAddress: null,
      getAddCode: null,
      addressKeyword: '',
      list: [
        {
          id: '1',
          val: '正常'
        },
        {
          id: '0',
          val: '异常'
        }
      ]
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.detailId = this.$route.query.id
    this.showDetail(this.detailId)
  },
  methods: {
    ...mapActions('home', ['getDutyPoint', 'getDutyDetail']),
    check(data) {
      this.mapVisible = true
      this.init(data, 'container')
    },
    async look() {
      const res = await this.getDutyPoint(this.detailId)
      this.inspectList = res.data.records
      this.visible = true
    },
    init(data, id) {
      this.map = new qq.maps.Map(document.getElementById(id), {
        center: new qq.maps.LatLng(),
        zoom: 16
      })
      const arr = data.map((item) => {
        return new qq.maps.LatLng(item.latitude, item.longitude)
      })
      var polyline = new qq.maps.Polyline({
        path: arr,
        strokeColor: '#3385ff',
        strokeWeight: 4,
        map: this.map
      })
    },
    async showDetail() {
      const res = await this.getDutyDetail(this.detailId)
      const data = res.data
      this.detailInfo = data
      if (data.track.length > 0) {
        this.init(data.track, 'track')
      }
      this.formData = [
        {
          value: res.data.watch,
          label: '值班员'
        },
        {
          value: res.data.watchPhone,
          label: '值班电话'
        },
        {
          value: res.data.leader,
          label: '带班领导'
        },
        {
          value: res.data.leaderPhone,
          label: '带班领导电话'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.accident-add {
  padding: 20px;
  .content {
    height: calc(100% - 10px);
    overflow-y: scroll;
    img {
      width: 100px;
      height: 100px;
      margin-right: 20px;
    }
    .title {
      height: 40px;
      background-color: #f2f2f2;
    }
  }
}
</style>
