<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  props: ['chartdata'],
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
