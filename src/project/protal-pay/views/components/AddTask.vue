<template>
  <div class="addTask page-layout qui-fx-ver">
    <a-form :form="form">
      <a-form-item label="任务名称：" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'taskName',
            { initialValue: appForm.taskName, rules: [{ required: true, message: '请填写任务名称', whitespace: true }] }
          ]"
          placeholder="请输入任务名称"
        />
      </a-form-item>
      <a-form-item label="收费截止日期" v-bind="formItemLayout">
        <a-date-picker
          format="YYYY-MM-DD"
          v-decorator="[
            'endTime',
            {
              initialValue: appForm.endTime,
              rules: [{ required: true, message: '请选择截止日期' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="收费项" v-bind="formItemLayout" required>
        <a-button icon="plus" class="add-btn" @click="add">添加</a-button>
        <table-list isZoom :columns="columns" :table-list="recordList">
          <template v-slot:actions="action">
            <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm.stop="deleteList(action.record)">
              <template slot="title">您确定删除吗?</template>
              <a-tooltip placement="topLeft" title="删除">
                <a-button size="small" class="del-action-btn" icon="delete"></a-button>
              </a-tooltip>
            </a-popconfirm>
          </template>
        </table-list>
        <a-row>
          <a-col :span="2" :offset="17"> 共计：</a-col>
          <a-col :span="5">{{ this.totalMoney == '' ? '0' : this.totalMoney }}元 </a-col>
        </a-row>
        <a-row>
          <a-col :span="2" :offset="17"> 优惠 :</a-col>
          <a-col :span="5"> <a-input placeholder="输入优惠金额" v-model="amount" /> </a-col>
        </a-row>
        <a-row>
          <a-col :span="2" :offset="17"> 应收：</a-col>
          <a-col :span="5">{{ this.receivable == '' ? '0' : this.receivable }}元 </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="收费对象" v-bind="formItemLayout" required>
        <div class="choose-input" @click="teacherSelect">
          <div class="p" v-if="chooseTeachersDeatil.length === 0">请点击选择收费对象</div>
          <template v-for="tag in chooseTeachersDeatil">
            <a-tag
              color="purple"
              @click.stop.prevent
              :key="tag.userCode"
              :closable="true"
              @close.stop="() => userClose(tag)"
              >{{ tag.userName }}</a-tag
            >
          </template>
        </div>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 15, offset: 3 }">
        <a-button style="margin-right:50px;" @click="cancle">取消</a-button>
        <a-button type="primary" :loading="loading" @click="handleSubmit">保存</a-button>
      </a-form-item>
    </a-form>
    <choose-student
      ref="chooseUser"
      is-check
      v-if="userTag"
      v-model="userTag"
      @submit="chooseUser"
      title="选择学生"
    ></choose-student>
    <add-charge ref="addCharge" :title="title" @getList="getCharge"></add-charge>
  </div>
</template>
<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
import ChooseStudent from '@c/ChooseStudent'
import TableList from '@c/TableList'
import AddCharge from './AddCharge'
const columns = [
  {
    title: '序号',
    width: '15%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '收费项',
    dataIndex: 'itemName',
    width: '20%'
  },
  {
    title: '收费标准',
    dataIndex: 'itemPrice',
    width: '15%'
  },
  {
    title: '数量',
    dataIndex: 'itemNum',
    width: '15%'
  },
  {
    title: '总金额',
    dataIndex: 'totalMoneySum',
    width: '15%'
  },
  {
    title: '操作',
    width: '20%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'AddTask',
  components: {
    ChooseStudent,
    TableList,
    AddCharge
  },
  data() {
    return {
      moment,
      form: this.$form.createForm(this),
      appForm: {
        taskName: '',
        endTime: ''
      },
      loading: false,
      userTag: false,
      chooseTeachersDeatil: [],
      recordList: [],
      columns,
      title: '新增',
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 }
      },
      totalMoney: '',
      amount: '',
      receivable: '',
      chargeObject: {
        chargeGrades: []
      },
      getYearList: []
    }
  },
  created() {},
  watch: {
    amount(val) {
      this.receivable = Number(this.totalMoney) - Number(val)
    }
  },
  computed: {
    ...mapState('home', ['userInfo'])
  },
  mounted() {
    this.getSchoolYearId()
  },
  methods: {
    ...mapActions('home', ['addChargetask', 'getSchoolYear']),
    getCharge(item) {
      this.recordList = item
      const array = []
      this.recordList.forEach(ele => {
        array.push(ele.totalMoneySum)
      })
      this.totalMoney = this.sum(array)
    },
    sum(array) {
      var s = 0
      for (var i = array.length - 1; i >= 0; i--) {
        s += array[i]
      }
      return s
    },
    deleteList(removedTag) {
      this.recordList = this.recordList.filter(tag => tag !== removedTag)
    },
    teacherSelect() {
      this.userTag = true
    },
    userClose(removedTag) {
      this.chooseTeachersDeatil = this.chooseTeachersDeatil.filter(tag => tag !== removedTag)
    },
    chooseUser(values) {
      this.$refs.chooseUser.reset()
      this.chooseTeachersDeatil = values
      this.chargeObject.schoolYearId = values[0].schoolYearId
      this.chargeObject.schoolYearName = this.getYearList[0].schoolYear
      values.forEach(item => {
        this.chargeObject.chargeGrades.push({
          gradeCode: item.gradeCode,
          gradeName: item.gradeName,
          chargeClasses: []
        })
        this.chargeObject.chargeGrades.forEach(ele => {
          ele.chargeClasses.push({
            classCode: item.classCode,
            className: item.className,
            userCodes: []
          })
          ele.chargeClasses.forEach(list => {
            list.userCodes.push(item.userCode)
          })
        })
      })
      console.log(this.chargeObject)
    },
    add() {
      this.title = '新增'
      this.$refs.addCharge.addVisible = true
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.endTime = moment(values.endTime).format('YYYY-MM-DD HH:mm:ss')
          const req = {
            schoolCode: this.userInfo.schoolCode,
            taskName: values.taskName,
            itemVOList: this.recordList,
            cutOffTime: values.endTime,
            createUserCode: this.userInfo.userCode,
            preMoney: this.amount,
            taskMoney: this.receivable,
            chargeObject: this.chargeObject
          }
          this.addChargetask(req).then(res => {
            this.$message.success('添加成功')
            this.$tools.goNext(() => {
              this.$router.push({
                path: '/chargingTask'
              })
            })
          })
        }
      })
    },
    cancle() {
      this.$router.push({
        path: '/chargingTask'
      })
    },
    async getSchoolYearId() {
      const req = {
        schoolCode: this.userInfo.schoolCode
      }
      const res = await this.getSchoolYear(req)
      this.getYearList = res.data.list
    }
  }
}
</script>
<style lang="less" scoped>
.choose-input {
  border: 1px solid @bor-color;
  border-radius: @radius;
  width: 100%;
  min-height: 32px;
  line-height: 32px;
  padding: 0 10px;
  .p {
    height: 30px;
    line-height: 30px;
    color: @dark-color;
  }
}
.addTask {
  background: #fff;
  padding-top: 20px;
  overflow: auto;
}
</style>
