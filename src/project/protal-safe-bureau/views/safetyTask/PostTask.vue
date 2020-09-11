<template>
  <div class="add-special-item page-layout bg-fff qui-fx-ver">
    <a-form :form="form">
      <a-form-item v-bind="formItemLayout" label="任务名称" required>
        <a-input
          placeholder="请输入任务名称"
          :disabled="true"
          v-decorator="[
            'name',
            { initialValue: appForm.address, rules: [{max: 20,required: true, message: '临时任务' } ]}
          ]"
        />
      </a-form-item>
      <a-form-item label="接受学校：" v-bind="formItemLayout" required>
        <a-input
          @click="showSpecific()"
          placeholder="请选择接受学校"
          v-decorator="[
            'specificIndicators',
            { initialValue: appForm.specificIndicators, rules: [ {required: true, message: '请选择专项指标' } ]}
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="限定职务：" required>
        <a-select
          v-decorator="[
            'leaderName',
            { initialValue: appForm.leaderName, rules: [{ required: true, message: '请选择负责人' }] },
          ]"
          placeholder="请选择您要限定的职务，可多选"
        >
          <a-select-option v-for="list in userList" :key="`${list.name}+${list.code}`">
            {{ list.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" :style="{ textAlign: 'center' }">
        <a-button @click="cancel">取消</a-button>
        <a-button class="mar-l10" type="primary" @click="submitOk" :disabled="isLoad">确定</a-button>
      </a-form-item>
    </a-form>
    <!-- 选择接受学校 -->
    <choose-check
      :userData="SchoolAll"
      :selectLeft="selectItem"
      ref="SchoolAll"
      v-if="true"
      @submit="setItem"
      title="选择学校"
      ranname="name"
    >
    </choose-check>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import xiaozuData from './dubanxiaozu.json'
export default {
  name: 'AddSpecialItem',
  components: {
    ChooseCheck: () => import('../../component/ChooseCheck')
  },
  data() {
    this.beginTime = ''
    this.endTime = ''
    this.groupList = []
    return {
      form: this.$form.createForm(this),
      SchoolAll: [
        {
          id: '1',
          index: 0,
          name: 'eerhu'
        },
        {
          id: '2',
          index: 0,
          name: 'eerhu'
        },
        {
          id: '3',
          index: 0,
          name: 'eerhu'
        }
      ], // 学校集合
      userList: [],
      selectItem: [],
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
      },
      // xiaozuData,
      isLoad: false,
      appForm: {
        supervisionTeam: '',
        specificIndicators: ''
      },
      count: 0
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  async mounted() {
  },
  methods: {
    ...mapActions('home', ['getItemAll', 'addSpecialTask', 'getGroup', 'getSchoolFlights', 'getTreeGroup']),
    // 获取专项指标基础数据
    async _getItemAll() {
      const res = await this.getItemAll(this.userInfo.schoolCode)
      // this.SchoolAll = JSON.parse(JSON.stringify(res.data).replace(/name/g, 'name'))
      this.SchoolAll = res.data
    },
    onChange(value, dateString) {
      this.beginTime = dateString[0]
      this.endTime = dateString[1]
    },
    async showSpecific(type) {
      this.$refs.SchoolAll.$refs.modal.visible = true
    },
    setItem(data) {
      this.selectItem = data.map(v => v.id)
      console.log(data.map(item => item.name) + '')
      this.appForm.specificIndicators = data.map(item => item.name) + ''
    },
    async showSupervision() {
      this.$refs.supervisio.$refs.modal.visible = true
    },
    setSupervisio(data) {
      // 展示数据
      console.log(data)
      console.log(data.map(v => v.title) + '')
      this.appForm.supervisionTeam = data.map(v => v.title) + ''
      this.groupList = data.map(res => {
        const { teamLeaderCode, teamLeaderName, schoolDTOList, streetCode, streetName } = res
        return {
          teamLeaderCode: teamLeaderCode,
          teamLeaderName: teamLeaderName,
          schoolDTOList: schoolDTOList,
          streetCode: streetCode,
          streetName: streetName
        }
      })
      console.log(this.groupList)
    },
    // 提交
    submitOk(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        this.isLoad = false
        if (!error) {
          const req = {
           	beginTime: this.beginTime,
            endTime: this.endTime,
            groupList: this.groupList, // 督查小组未知
            itemIdList: this.selectItem,
            name: values.name,
            schoolCode: this.userInfo.schoolCode
          }
          this.isLoad = true
          this.addSpecialTask(req)
            .then(res => {
              // console.log(res)
              this.$message.success('操作成功')
              this.$tools.goNext(() => {
                this.$router.go(-1)
              })
            })
            .catch(res => {
              this.isLoad = false
            })
        }
      })
    },
    onOk(value) {
      // console.log('onOk: ', value)
    },
    cancel() {
      this.$router.go(-1)
    }

  }
}
</script>
<style lang="less" scoped>
.add-special-item {
  padding: 20px;
}
</style>
