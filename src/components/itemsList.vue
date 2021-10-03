<template>
<div>
  <div v-if="getPaymentsOnPage.length === 0" class="text-center">
    <b-progress :value="value" :max="max" height="5px"></b-progress>
    загрузка данных
  </div>
  <transition name="fade">
    <table class="table table-borderless m-0" v-if="getPaymentsOnPage.length > 0">
        <thead>
            <tr>
                <th scope="col" width="10%">#</th>
                <th scope="col" width="30%">дата</th>
                <th scope="col" width="30%">категория</th>
                <th scope="col" width="30%" class="text-end">рубли</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(payment, index) in getPaymentsOnPage" :key="payment">
                <td>{{ (getCurrentPageNumber-1)*getPaymentsPerPage + index + 1 }}</td>
                <td>{{ payment.date | moment("D MMMM YYYY") }}</td>
                <td>{{ payment.category }}</td>
                <td class="text-end">{{ payment.value }}</td>
            </tr>
        </tbody>
    </table>
  </transition>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'itemsList',
  data: () => ({
    value: 0,
    max: 1500
  }),
  methods: {
    progress () {
      for (let i = 1; i <= this.max; i++) {
        setTimeout(() => {
          this.value = this.value + 1
        }, 1)
      }
    }
  },
  computed: {
    ...mapGetters(['getPaymentsOnPage', 'getCurrentPageNumber', 'getPaymentsPerPage'])
  },
  created () {
    this.getPaymentsOnPage()
  },
  mounted () {
    this.progress()
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter, .fade-leave-to { opacity: 0; }
</style>
