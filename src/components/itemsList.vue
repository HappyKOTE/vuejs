<template>
  <div>
    <table class="table table-borderless m-0">
      <thead>
        <tr class="align-middle">
          <th scope="col" width="10%">#</th>
          <th scope="col" width="30%">дата</th>
          <th scope="col" width="30%">категория</th>
          <th scope="col" width="18%" class="text-end">рубли</th>
          <th scope="col" width="12%"></th>
        </tr>
      </thead>
      <transition name="fade">
        <tbody v-if="getPaymentsOnPage.length > 0">
          <tr v-for="(payment, index) in getPaymentsOnPage" :key="index" class="align-middle">
            <td>{{ (getCurrentPageNumber-1)*getPaymentsPerPage + index + 1 }}</td>
            <td>{{ payment.date | moment("D MMMM YYYY") }}</td>
            <td>{{ payment.category }}</td>
            <td class="text-end">{{ payment.value }}</td>
            <td class="text-end">
              <b-dropdown variant="link-primary" toggle-class="text-decoration-none" class="p-0" no-caret>
                <template #button-content>
                  <b-icon icon="three-dots"></b-icon>
                </template>
                <b-dropdown-item href="#" @click="editPayment((getCurrentPageNumber-1)*getPaymentsPerPage + index)">
                  <b-icon icon="pencil"></b-icon>
                  редактировать
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="deletePayment((getCurrentPageNumber-1)*getPaymentsPerPage + index)">
                  <b-icon icon="trash" variant="danger"></b-icon>
                  удалить
                </b-dropdown-item>
              </b-dropdown>
            </td>
          </tr>
        </tbody>
      </transition>
    </table>
    <div v-if="getPaymentsOnPage.length === 0" class="text-center mt-5 mb-5">
      <strong>
        загрузка данных
        <b-icon icon="gear" animation="spin"></b-icon>
      </strong>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapMutations(['setNewPayment', 'setNewPaymentTypes', 'setCurrentPageNumber', 'setDeletePayment', 'setEditPayment', 'setAddFormKey', 'setMetricsKey']),
    editPayment (index) {
      this.$router.push({ path: '/edit/payment/' + (index + 1) })
      this.setAddFormKey()
    },
    deletePayment (index) {
      this.setDeletePayment(index)
      if (this.getPaymentsOnPage.length === 0) {
        this.setCurrentPageNumber(this.getCurrentPageNumber - 1)
      }
      this.setMetricsKey()
    }
  },
  computed: {
    ...mapGetters(['getPaymentsOnPage', 'getCurrentPageNumber', 'getPaymentsPerPage'])
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active { transition: opacity 1s; }
.fade-enter, .fade-leave-to { opacity: 0; }
</style>
