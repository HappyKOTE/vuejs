<template>
<div>
  <div v-if="getPaymentsOnPage.length === 0" class="text-center">
    <b-progress :value="value" :max="max" height="5px"></b-progress>
    загрузка данных
  </div>
  <transition name="fade">
    <table class="table table-borderless m-0" v-if="getPaymentsOnPage.length > 0">
        <thead>
            <tr class="align-middle">
                <th scope="col" width="10%">#</th>
                <th scope="col" width="30%">дата</th>
                <th scope="col" width="30%">категория</th>
                <th scope="col" width="20%" class="text-end">рубли</th>
                <th scope="col" width="10%"></th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, index) in getPaymentsOnPage" :key="payment" class="align-middle">
            <td>{{ (getCurrentPageNumber-1)*getPaymentsPerPage + index + 1 }}</td>
            <td>{{ payment.date | moment("D MMMM YYYY") }}</td>
            <td>{{ payment.category }}</td>
            <td class="text-end">{{ payment.value }}</td>
            <td class="text-end">
              <b-dropdown variant="link-primary" toggle-class="text-decoration-none" class="p-0" no-caret>
                <template #button-content>
                  <b-icon icon="three-dots"></b-icon>
                </template>
                <b-dropdown-item href="#" @click="editPayment(index)">
                  <b-icon icon="pencil"></b-icon>
                  редактировать
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="deletePayment(index)">
                  <b-icon icon="trash" variant="danger"></b-icon>
                  удалить
                </b-dropdown-item>
              </b-dropdown>
            </td>
          </tr>
        </tbody>
    </table>
  </transition>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'itemsList',
  data: () => ({
    value: 0,
    max: 1500
  }),
  methods: {
    ...mapMutations(['setNewPayment', 'setNewPaymentTypes', 'setCurrentPageNumber', 'setDeletePayment', 'setEditPayment']),
    progress () {
      for (let i = 1; i <= this.max; i++) {
        setTimeout(() => {
          this.value = this.value + 1
        }, 1)
      }
    },
    editPayment (index) {
      this.$router.push({ path: '/edit/payment/' + index })
    },
    deletePayment (index) {
      this.setDeletePayment(index)
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
