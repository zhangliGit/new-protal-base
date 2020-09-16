<template>
  <!-- 2. 柱状图Dom -->
  <div id="main1" style="width: 60%;height:300px;"></div>
</template>
<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/toolbox')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
export default {
  name: 'PreBarEcharts',
  props: {
    dataList: {}
  },
  data() {
    return {
    }
  },
  mounted() {
    this.initPieData(this.dataList)
    console.log(this.dataList)
  },
  created() {

  },
  watch: {
    // dataList(val) {
    //   this.initPieData(val[0])
    //   // this.initColumnarData()
    // }
  },
  methods: {
    initPieData(data) {
      // 对饼状图dom，初始化echarts实例
      var myChart1 = echarts.init(document.getElementById('main1'), 'shine')
      const preData1 = [
        { value: data.yes, name: '选"是"' },
        { value: data.no, name: '选"否"' }
      ]
      myChart1.setOption({
        // 图表标题
        title: {
          text: '某站点用户访问来源', // 标题内容
          subtext: '纯属虚构',
          x: 'center' // 居中显示
        },
        // 鼠标触发提示
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}人 ({d}%)' // 展示格式
        },
        // 图例
        legend: {
          x: '80%',
          y: '45%',
          orient: 'horizontal', // 垂直显示
          right: 'auto',
          // x: 'bottom', // 显示位置--左上
          data: [`选"是"`, `选"否"`]
        },
        calculable: true,
        series: [
          {
            name: '风险等级',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            data: preData1,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0
                // shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal: {
                color: function(params) {
                  // 自定义颜色
                  var colorList = [
                    '#399ffb', '#f9d239', '#fd7d2a', '#f26980'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }) // 按option1展示myChart1图表
      // echarts.connect([myChart2, myChart1])
      // 配置自动适应Windows窗口大小
      // setTimeout(function () {
      //   window.onresize = function () {
      //     myChart1.resize()
      //     myChart2.resize()
      //   }
      // }, 200)
    }
  }
}
</script>
<style lang="less"></style>
