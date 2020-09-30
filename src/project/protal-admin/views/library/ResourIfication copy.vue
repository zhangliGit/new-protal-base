<template>
  <div class="ResourIfication page-layout bg-fff u-padd-30">
    <a-button type="primary" @click="addClass(0)">
      <a-icon type="plus" />添加分类
    </a-button>
    <div class="select-user-content">
      <div class="dc-left">
        <a-input-search v-model="searchStr" style="margin-bottom: 8px" placeholder="Search" @change="onSearch" />
        <a-tree
          :expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          :tree-data="treeData"
          v-model="selectKey"
          :selectedKeys="selectKey"
          @expand="onExpand"
          :defaultExpandAll="true"
          @check="jiantingcheck"
        >
          <template slot="title" slot-scope="{ title }">
            <div class="box">
              <div class="left">
                <span class="u-type-primary-ligth-bg u-bd" v-if="title.indexOf(searchValue) > -1">
                  {{ title.substr(0, title.indexOf(searchValue)) }}
                  <span style="color: #f50">{{ searchValue }}</span>
                  {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
                </span>
                <span v-else>{{ title }}</span>
              </div>
              <div class="right">
                <span class="u-mar-r40 u-type-primary" >添加子类</span>
                <span class="u-mar-r40 u-type-primary">编辑</span>
                <span class="red" style="color:'#fa3534'">删除</span>
              </div>
            </div>

          </template>
        </a-tree>
      </div>
    </div>
    <a-table :columns="columns" :data-source="treeData" :row-selection="rowSelection" />
  </div>
</template>
<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'title',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address'
  }
]
export default {
  name: 'ResourIfication',
  data() {
    return {
      data: [],
      columns,
      backupsExpandedKeys: [],
      autoExpandParent: false,
      selectedKeys: [],
      searchValue: '',
      searchStr: '',
      expandedKeys: [], // 展开指定的树节点
      treeData: [
        {
          'title': '社会安全',
          'children': [
            {
              'title': '性侵',
              'children': null,
              'id': 2,
              'parentId': 1
            },
            {
              'title': '校园暴力',
              'children': null,
              'id': 3,
              'parentId': 1
            },
            {
              'title': '诬陷',
              'children': null,
              'id': 4,
              'parentId': 1
            },
            {
              'title': '推销',
              'children': null,
              'id': 5,
              'parentId': 1
            },
            {
              'title': '偷窃',
              'children': null,
              'id': 6,
              'parentId': 1
            },
            {
              'title': '敲诈恐吓',
              'children': null,
              'id': 7,
              'parentId': 1
            },
            {
              'title': '抢劫',
              'children': null,
              'id': 8,
              'parentId': 1
            },
            {
              'title': '恐怖袭击',
              'children': null,
              'id': 9,
              'parentId': 1
            },
            {
              'title': '交通安全',
              'children': null,
              'id': 10,
              'parentId': 1
            },
            {
              'title': '集体活动',
              'children': null,
              'id': 11,
              'parentId': 1
            },
            {
              'title': '国家安全',
              'children': null,
              'id': 12,
              'parentId': 1
            },
            {
              'title': '跟踪',
              'children': null,
              'id': 13,
              'parentId': 1
            },
            {
              'title': '诚信考试',
              'children': null,
              'id': 14,
              'parentId': 1
            },
            {
              'title': '冲突纠纷',
              'children': null,
              'id': 15,
              'parentId': 1
            },
            {
              'title': '邪教',
              'children': null,
              'id': 16,
              'parentId': 1
            },
            {
              'title': '隐私',
              'children': null,
              'id': 17,
              'parentId': 1
            },
            {
              'title': '绑架拐骗',
              'children': null,
              'id': 18,
              'parentId': 1
            },
            {
              'title': '财务安全',
              'children': null,
              'id': 19,
              'parentId': 1
            }
          ],
          'id': 1,
          'parentId': null
        },
        {
          'title': '自然灾害',
          'children': [
            {
              'title': '地震',
              'children': null,
              'id': 21,
              'parentId': 20
            },
            {
              'title': '高温',
              'children': null,
              'id': 22,
              'parentId': 20
            },
            {
              'title': '雷雨雷电',
              'children': null,
              'id': 23,
              'parentId': 20
            },
            {
              'title': '台风',
              'children': null,
              'id': 24,
              'parentId': 20
            },
            {
              'title': '暴雨',
              'children': null,
              'id': 25,
              'parentId': 20
            },
            {
              'title': '冰雹',
              'children': null,
              'id': 26,
              'parentId': 20
            },
            {
              'title': '赤潮',
              'children': null,
              'id': 27,
              'parentId': 20
            },
            {
              'title': '大气污染',
              'children': null,
              'id': 28,
              'parentId': 20
            },
            {
              'title': '厄尔尼诺',
              'children': null,
              'id': 29,
              'parentId': 20
            },
            {
              'title': '海啸',
              'children': null,
              'id': 30,
              'parentId': 20
            },
            {
              'title': '洪水',
              'children': null,
              'id': 31,
              'parentId': 20
            },
            {
              'title': '滑坡',
              'children': null,
              'id': 32,
              'parentId': 20
            },
            {
              'title': '火山',
              'children': null,
              'id': 33,
              'parentId': 20
            },
            {
              'title': '风害',
              'children': null,
              'id': 34,
              'parentId': 20
            },
            {
              'title': '泥石流',
              'children': null,
              'id': 35,
              'parentId': 20
            },
            {
              'title': '森林火灾',
              'children': null,
              'id': 36,
              'parentId': 20
            },
            {
              'title': '沙尘暴',
              'children': null,
              'id': 37,
              'parentId': 20
            },
            {
              'title': '雪灾',
              'children': null,
              'id': 38,
              'parentId': 20
            },
            {
              'title': '预警信号',
              'children': null,
              'id': 39,
              'parentId': 20
            }
          ],
          'id': 20,
          'parentId': null
        },
        {
          'title': '公共卫生',
          'children': [
            {
              'title': '抽烟酗酒',
              'children': null,
              'id': 41,
              'parentId': 40
            },
            {
              'title': '毒品危害',
              'children': null,
              'id': 42,
              'parentId': 40
            },
            {
              'title': '传染疾病',
              'children': null,
              'id': 43,
              'parentId': 40
            },
            {
              'title': '食品安全',
              'children': null,
              'id': 44,
              'parentId': 40
            },
            {
              'title': '艾滋病',
              'children': null,
              'id': 45,
              'parentId': 40
            },
            {
              'title': '不良习惯',
              'children': null,
              'id': 46,
              'parentId': 40
            },
            {
              'title': '肝炎',
              'children': null,
              'id': 47,
              'parentId': 40
            },
            {
              'title': '护眼常识',
              'children': null,
              'id': 48,
              'parentId': 40
            },
            {
              'title': '科学饮食',
              'children': null,
              'id': 49,
              'parentId': 40
            },
            {
              'title': '空气质量',
              'children': null,
              'id': 50,
              'parentId': 40
            },
            {
              'title': '感冒',
              'children': null,
              'id': 51,
              'parentId': 40
            },
            {
              'title': '禽流感',
              'children': null,
              'id': 52,
              'parentId': 40
            },
            {
              'title': '青春期',
              'children': null,
              'id': 53,
              'parentId': 40
            }
          ],
          'id': 40,
          'parentId': null
        },
        {
          'title': '意外伤害',
          'children': [
            {
              'title': '踩踏事故',
              'children': null,
              'id': 55,
              'parentId': 54
            },
            {
              'title': '电梯伤害',
              'children': null,
              'id': 56,
              'parentId': 54
            },
            {
              'title': '溺水',
              'children': null,
              'id': 57,
              'parentId': 54
            },
            {
              'title': '运动游戏',
              'children': null,
              'id': 58,
              'parentId': 54
            },
            {
              'title': '烫伤',
              'children': null,
              'id': 59,
              'parentId': 54
            },
            {
              'title': '动植物伤害',
              'children': null,
              'id': 60,
              'parentId': 54
            },
            {
              'title': '文具工具',
              'children': null,
              'id': 61,
              'parentId': 54
            },
            {
              'title': '煤气中毒',
              'children': null,
              'id': 62,
              'parentId': 54
            },
            {
              'title': '实验课安全',
              'children': null,
              'id': 63,
              'parentId': 54
            },
            {
              'title': '消防安全',
              'children': null,
              'id': 64,
              'parentId': 54
            },
            {
              'title': '烟花爆竹',
              'children': null,
              'id': 65,
              'parentId': 54
            },
            {
              'title': '用电安全',
              'children': null,
              'id': 66,
              'parentId': 54
            },
            {
              'title': '火灾安全',
              'children': null,
              'id': 67,
              'parentId': 54
            },
            {
              'title': '爆炸',
              'children': null,
              'id': 68,
              'parentId': 54
            }
          ],
          'id': 54,
          'parentId': null
        },
        {
          'title': '心理健康',
          'children': [
            {
              'title': '性格养成',
              'children': null,
              'id': 70,
              'parentId': 69
            },
            {
              'title': '情绪控制',
              'children': null,
              'id': 71,
              'parentId': 69
            },
            {
              'title': '生活态度',
              'children': null,
              'id': 72,
              'parentId': 69
            },
            {
              'title': '人际关系',
              'children': null,
              'id': 73,
              'parentId': 69
            },
            {
              'title': '暗恋',
              'children': null,
              'id': 74,
              'parentId': 69
            },
            {
              'title': '电视瘾',
              'children': null,
              'id': 75,
              'parentId': 69
            },
            {
              'title': '师生关系',
              'children': null,
              'id': 76,
              'parentId': 69
            },
            {
              'title': '心理调节',
              'children': null,
              'id': 77,
              'parentId': 69
            },
            {
              'title': '虚伪',
              'children': null,
              'id': 78,
              'parentId': 69
            },
            {
              'title': '学习态度',
              'children': null,
              'id': 79,
              'parentId': 69
            },
            {
              'title': '谣言',
              'children': null,
              'id': 80,
              'parentId': 69
            },
            {
              'title': '抑郁症',
              'children': null,
              'id': 81,
              'parentId': 69
            },
            {
              'title': '早恋',
              'children': null,
              'id': 82,
              'parentId': 69
            },
            {
              'title': '追星',
              'children': null,
              'id': 83,
              'parentId': 69
            },
            {
              'title': '自私',
              'children': null,
              'id': 84,
              'parentId': 69
            }
          ],
          'id': 69,
          'parentId': null
        },
        {
          'title': '网络安全',
          'children': [
            {
              'title': '网络安全',
              'children': null,
              'id': 86,
              'parentId': 85
            },
            {
              'title': '网络交友',
              'children': null,
              'id': 87,
              'parentId': 85
            },
            {
              'title': '网上购物',
              'children': null,
              'id': 88,
              'parentId': 85
            },
            {
              'title': '网络道德',
              'children': null,
              'id': 89,
              'parentId': 85
            },
            {
              'title': '网络利弊',
              'children': null,
              'id': 90,
              'parentId': 85
            },
            {
              'title': '网络犯罪',
              'children': null,
              'id': 91,
              'parentId': 85
            },
            {
              'title': '网络资源',
              'children': null,
              'id': 92,
              'parentId': 85
            },
            {
              'title': '网络沉迷',
              'children': null,
              'id': 93,
              'parentId': 85
            }
          ],
          'id': 85,
          'parentId': null
        },
        {
          'title': '疫情防控',
          'children': [
            {
              'title': '疫情防控',
              'children': null,
              'id': 95,
              'parentId': 94
            }
          ],
          'id': 94,
          'parentId': null
        },
        {
          'title': '测试1',
          'children': [
            {
              'title': '测试二级分类02',
              'children': null,
              'id': 99,
              'parentId': 96
            },
            {
              'title': '测试二级分类03',
              'children': null,
              'id': 100,
              'parentId': 96
            },
            {
              'title': '测试二级分类04',
              'children': null,
              'id': 101,
              'parentId': 96
            },
            {
              'title': '测试二级分类05',
              'children': null,
              'id': 102,
              'parentId': 96
            }
          ],
          'id': 96,
          'parentId': null
        }
      ],
      selectKey: [], // 选中的节点的key
      selectObj: [] // 选中的节点
    }
  },
  mounted() {
    this.initData(this.treeData)
  },
  created() {
  },
  watch: {
  },
  methods: {
    initData(arr, parentId, parentName) {
      arr.forEach(i => {
        i.scopedSlots = {
          title: 'title'
        }
        i.key = i.id + Math.random()
        if (i.children && i.children.length > 0) {
          this.initData(i.children, i.key, i.title)
        }
      })
      return arr
    },
    // 找到选中的对象
    jiantingcheck(checkdkeys, e) {
      const arr = []
      e.checkedNodes.forEach(i => {
        arr.push(i.data.props.dataRef)
      })
      this.selectObj = arr.filter(v => v.leve == '2') // 只要选择的子
    },
    onSearch() {
      // console.log(this.treeData)
      var vm = this
      // 添加这行代码是为了只点击搜索才触发
      vm.searchValue = vm.searchStr
      // 如果搜索值为空，则不展开任何项，expandedKeys置为空
      // 如果搜索值不位空，则expandedKeys的值要为搜索值的父亲及其所有祖先
      if (vm.searchValue === '') {
        vm.expandedKeys = []
      } else {
        // 首先将展开项与展开项副本置为空
        vm.expandedKeys = []
        vm.backupsExpandedKeys = []
        // 获取所有存在searchValue的节点
        const candidateKeysList = vm.getkeyList(vm.searchValue, vm.treeData, [])
        // 遍历满足条件的所有节点
        candidateKeysList.map(item => {
          // 获取每个节点的母亲节点
          var key = vm.getParentKey(item, vm.treeData)
          // 当item是最高一级，父key为undefined，将不放入到数组中
          // 如果母亲已存在于数组中，也不放入到数组中
          if (key && !vm.backupsExpandedKeys.some(item => item === key)) vm.backupsExpandedKeys.push(key)
        })
        const length = this.backupsExpandedKeys.length
        for (let i = 0; i < length; i++) {
          vm.getAllParentKey(vm.backupsExpandedKeys[i], vm.treeData)
        }
        vm.expandedKeys = vm.backupsExpandedKeys.slice()
      }
    },
    // 获取节点中含有value的所有key集合
    getkeyList(value, tree, keyList) {
      // 遍历所有同一级的树
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        // 如果该节点存在value值则push
        if (node.title.indexOf(value) > -1) {
          keyList.push(node.key)
        }
        // 如果拥有孩子继续遍历
        if (node.children) {
          this.getkeyList(value, node.children, keyList)
        }
      }
      // 因为是引用类型，所有每次递归操作的都是同一个数组
      return keyList
    },
    // 该递归主要用于获取key的父亲节点的key值
    getParentKey(key, tree) {
      let parentKey, temp
      // 遍历同级节点
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
          // 如果该节点的孩子中存在该key值，则该节点就是我们要找的父亲节点
          // 如果不存在，继续遍历其子节点
          if (node.children.some(item => item.key === key)) {
            parentKey = node.key
          } else if ((temp = this.getParentKey(key, node.children))) {
            // parentKey = this.getParentKey(key,node.children)
            // 改进，避免二次遍历
            parentKey = temp
          }
        }
      }
      return parentKey
    },
    // 获取该节点的所有祖先节点
    getAllParentKey(key, tree) {
      var parentKey
      if (key) {
        // 获得父亲节点
        parentKey = this.getParentKey(key, tree)
        if (parentKey) {
          // 如果父亲节点存在，判断是否已经存在于展开列表里，不存在就进行push
          if (!this.backupsExpandedKeys.some(item => item === parentKey)) {
            this.backupsExpandedKeys.push(parentKey)
          }
          // 继续向上查找祖先节点
          this.getAllParentKey(parentKey, tree)
        }
      }
    },
    onExpand(expandedKeys) {
      // 用户点击展开时，取消自动展开效果
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    // 右边删除
    deleteLi(key) {
      this.selectObj = this.selectObj.filter(v => v.key !== key)
      this.selectKey = this.selectObj.map(v => v.key)
    },
    submitOk() {
      this.$refs.modal.visible = false
      this.$emit('submit', this.selectObj)
    }
  }
}
</script>
<style lang="less">
.ant-tree{
  li .ant-tree-node-content-wrapper{
    width: 900px;
    background: #ecf5ff;
    .box{
      display: flex;
      justify-content: space-between;

    }
  }
  ul {
    background-color: #fff;
    .ant-tree-node-content-wrapper{
       background-color: #fff;
    }
  }
}
</style>
