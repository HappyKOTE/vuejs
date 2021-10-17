<template>
  <div :key="getMetricsKey">
    <Chart :chartdata="chartData" />
  </div>
</template>

<script>
import Chart from './chart.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    Chart
  },
  data: () => ({
    chartData: {
      labels: [],
      datasets: [
        {
          backgroundColor: ['#0d6efd', '#6610f2', '#6f42c1', '#d63384', '#dc3545', '#fd7e14', '#ffc107', '#198754', '#20c997', '#0dcaf0'],
          data: []
        }
      ]
    }
  }),
  methods: {
    ...mapMutations(['setMetricsKey']),
    pushData () {
      this.chartData.labels = this.getPaymentTypesArray
      this.chartData.datasets[0].data = this.getCategorySumm
      for (let i = 0; i < this.getPaymentTypesArray.length; i++) {
        if (!this.chartData.datasets[0].backgroundColor[i]) {
          this.chartData.datasets[0].backgroundColor.push(this.randomColor())
        }
      }
    },
    randomColor () {
      return '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
    }
  },
  computed: {
    ...mapGetters(['getPaymentTypesArray', 'getCategorySumm', 'getMetricsKey'])
  },
  created () {
    this.setMetricsKey()
    this.pushData()
  },
  updated () {
    this.pushData()
  }
}
</script>

<style lang="scss">
</style>
