<template>
  <!-- 2. 柱状图Dom -->
  <div id="main2" style="width: 50%;height:400px;"></div>
</template>
<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
export default {
  name: 'BarEcharts',
  props: {
    multipleData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    this.initColumnarData(this.multipleData)
  },
  created() {
  },
  watch: {
    // multipleData(val) {
    //   this.initPieData(val[0])
    //   this.initColumnarData()
    // }
  },
  methods: {
    initColumnarData(data) {
      // 对柱状图dom，初始化echarts实例
      var myChart2 = echarts.init(document.getElementById('main2'), 'shine')
      myChart2.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 指示器类型，shadow为阴影指示器
            type: 'shadow'
          }
        },
        color: ['#f26980', '#f9d239', '#fd7d2a', '#399ffb'],
        // legend: {
        //   data: ['重大风险', '一般风险', '较大风险', '低风险']
        // },
        calculable: true,
        xAxis: [
          {
            splitLine: { show: false }, // 去除网格线
            // type: 'category',
            textStyle: {
              color: '#999' // 这里用参数代替了
            },
            type: 'value'
          }

        ],
        yAxis: [
          {
            splitLine: { show: false }, // 去除网格线
            type: 'category',
            splitArea: { show: true },
            textStyle: {
              color: '#999' // 这里用参数代替了
            },
            axisLabel: {
              interval: 0,
              axisLabel: {
                interval: 0,
                // rotate:30,
                formatter: function(val) {
                  var strs = val.split('') // 字符串数组
                  var str = ''
                  for (var i = 0, s; s = strs[i++];) { // 遍历字符串数组
                    str += s
                    if (!(i % 8)) str += '\n' // 按需要求余
                  }
                  return str
                }
              }
            },
            data: data.map(v => v.answer)
          }
        ],
        grid: {
          x2: 40
        },
        series: [
          {
            name: '重大风险',
            type: 'bar',
            stack: '总量',
            barWidth: 50, // 柱图宽度
            data: data.map(v => v.heavyCount),
            itemStyle: {
              normal: {
                color: function(params) {
                  // 自定义颜色
                  var colorList = [
                    '#f26980', '#f26980', '#f26980', '#f26980', '#f26980'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          },
          {
            name: '一般风险',
            type: 'bar',
            stack: '总量',
            data: data.map(v => v.generalCount),
            itemStyle: {
              normal: {
                color: function(params) {
                  // 自定义颜色
                  var colorList = [
                    '#f9d239', '#f9d239', '#f9d239', '#f9d239', '#f9d239'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          },
          {
            name: data.map(v => v.schoolName),
            type: 'bar',
            stack: '总量',
            data: data.map(v => v.count),
            itemStyle: {
              normal: {
                color: function(params) {
                  // 自定义颜色
                  var colorList = [
                    '#fd7d2a', '#fd7d2a', '#fd7d2a', '#fd7d2a', '#fd7d2a'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          },
          {
            name: '低风险',
            type: 'bar',
            stack: '总量',
            data: data.map(v => v.lowCount),
            itemStyle: {
              normal: {
                color: function(params) {
                  // 自定义颜色
                  var colorList = [
                    '#399ffb', '#399ffb', '#399ffb', '#399ffb', '#399ffb'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      })
      // myChart2.on('click', (params) => {
      //   const setPieData = data.filter(v => v.schoolName === params.name)
      //   this.initPieData(setPieData[0])
      // })
    }
  }
}
</script>
<style lang="less"></style>
