<template>
  <div :key="getMetricsKey">
    <Chart :chartdata="chartData" />
  </div>
</template>

<script>
import Chart from './chart.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'metrics',
  components: {
    Chart
  },
  data: () => ({
    chartData: {
      labels: null,
      datasets: [
        {
          backgroundColor: [],
          data: null
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
    this.getPaymentTypesArray()
    this.getCategorySumm()
    this.getMetricsKey()
  },
  mounted () {
    this.pushData()
    this.setMetricsKey()
  },
  updated () {
    this.pushData()
  }
}
</script>

<style lang="scss">
</style>
