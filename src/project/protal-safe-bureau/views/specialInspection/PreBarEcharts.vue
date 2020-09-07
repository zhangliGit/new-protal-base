<template>
  <div class="u-fx">
    <!-- 2. 柱状图Dom -->
    <div id="main2" style="width: 600px;height:300px;"></div>
    <div id="main1" style="width: 800px;height:300px;"></div>
  </div>
</template>
<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/toolbox')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
// 指定饼状图图表的配置项和数据
var option1 = {
  // 图表标题
  title: {
    text: '某站点用户访问来源', // 标题内容
    subtext: '纯属虚构',
    x: 'center' // 居中显示
  },
  // 鼠标触发提示
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)' // 展示格式
  },
  // 图例
  legend: {
    orient: 'horizontal', // 垂直显示
    top: 'auto',
    // x: 'bottom', // 显示位置--左上
    data: ['低风险', '一般风险', '较大风险', '最大风险']
  },
  calculable: true,
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '65%',
      center: ['50%', '50%'],
      data: [
        { value: 335, name: '低风险' },
        { value: 310, name: '一般风险' },
        { value: 234, name: '较大风险' },
        { value: 135, name: '最大风险' }
      ]
    }
  ]
}

// 指定柱状图图表的配置项和数据
var option2 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 指示器类型，shadow为阴影指示器
      type: 'shadow'
    }
  },
  // legend: {
  //   data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  // },
  // 工具栏组件
  // toolbox: {
  //   show: true,
  //   orient: 'vertical',
  //   top: 'center',
  //   feature: {
  //     mark: { show: true },
  //     // 启用的动态类型，包括'line'（切换为折线图）, 'bar'（切换为柱状图）, 'stack'（切换为堆叠模式）, 'tiled'（切换为平铺模式）
  //     magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
  //     restore: { show: true }, // 是否支持配置项还原
  //     saveAsImage: { show: true } // 保存图片
  //   }
  // },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: ['学校A', '学校B', '学校C', '学校D', '学校E']
    }
  ],
  yAxis: [
    {
      type: 'value',
      splitArea: { show: true }
    }
  ],
  grid: {
    x2: 40
  },
  series: [
    {
      name: '最大风险',
      type: 'bar',
      stack: '总量',
      barWidth: 50, // 柱图宽度
      data: [320, 332, 301, 334, 390]
    },
    {
      name: '一般风险',
      type: 'bar',
      stack: '总量',
      data: [220, 182, 191, 234, 290]
    },
    {
      name: '较大风险',
      type: 'bar',
      stack: '总量',
      data: [150, 232, 201, 154, 190]
    },
    {
      name: '低风险',
      type: 'bar',
      stack: '总量',
      data: [120, 132, 101, 134, 90]
    }
  ]
}
export default {
  name: 'PreBar',
  props: {
    // 标题
    title: {
      type: String,
      default: '标题'
    },
    // 宽度
    width: {
      type: Number,
      default: 640
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    // 对饼状图dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('main1'), 'shine')
    myChart1.setOption(option1) // 按option1展示myChart1图表

    // 对柱状图dom，初始化echarts实例
    var myChart2 = echarts.init(document.getElementById('main2'), 'shine')
    myChart2.setOption(option2)
    // 将myChart1和myChart2关联起来
    echarts.connect([myChart1, myChart2])

    // 配置自动适应Windows窗口大小
    setTimeout(function () {
      window.onresize = function () {
        myChart1.resize()
        myChart2.resize()
      }
    }, 200)
  },
  created() {
  },
  methods: {
    show() {
      this.visible = true
    }
  }
}
</script>
<style lang="less"></style>
