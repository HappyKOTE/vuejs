<script>
import { Doughnut, mixins } from 'vue-chartjs'

export default {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      }
    }
  }),
  props: ['chartdata'],
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
