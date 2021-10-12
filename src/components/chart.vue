<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'bottom',
        labels: {
          padding: 40,
          usePointStyle: true
        }
      }
    }
  }),
  props: ['chartdata'],
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
