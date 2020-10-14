<template>
  <div class="line-one pos-box" :id="id"></div>
</template>

<script>
import $tools from '@u/tools'
import Highcharts from 'highcharts/highstock'
export default {
  name: 'MoneyShow',
  props: {
    id: {
      type: String,
      default: 'line-show'
    },
    categories: {
      type: Array,
      default: () => {
        return $tools.getLastDay(15)
      }
    },
    series: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    getBi() {
      return {
        credits: {
          enabled: false // 禁用版权信息
        },
        title: {
          text: '',
          style: {
            color: '#666'
          }
        },
        yAxis: {
          gridLineColor: '#eee',
          gridLineDashStyle: 'longdash',
          splitLine: {
            show: true
          },
          labels: {
            style: {
              color: '#666'
            }
          },
          title: {
            text: '金额',
            style: {
              color: '#666'
            }
          }
        },
        chart: {
          backgroundColor: null,
          type: 'areaspline'
        },
        plotOptions: {
          areaspline: {
            dataLabels: {
              enabled: true,
              color: '#666',
              allowOverlap: false
            }
          }
        },
        xAxis: {
          labels: {
            style: {
              color: '#666'
            }
          },
          splitLine: {
            show: true
          },
          categories: this.categories,
          crosshair: true
        },
        series: this.series,
        legend: {
          enabled: false
        }
      }
    }
  },
  mounted() {
    setTimeout(() => {
      Highcharts.chart(this.id, this.getBi())
    }, 50)
  }
}
</script>
<style lang="less" scoped></style>
