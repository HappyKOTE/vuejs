<template>
  <div>
    <h3 class="mb-5">
      учёт финансов
      <addItemForm class="d-inline-block ms-2" />
      <b-dropdown right text="роуты" class="float-end">
        <b-dropdown-item href="/add/category/разное">добавить новую категорию "разное"</b-dropdown-item>
        <b-dropdown-item href="/add/payment/еда?value=200">добавить платёж категорию "еда" и суммой 200 руб.</b-dropdown-item>
        <b-dropdown-item href="/add/payment/транспорт?value=50">добавить платёж категорию "транспорт" и суммой 50 руб.</b-dropdown-item>
        <b-dropdown-item href="/add/payment/развлечения?value=2000">добавить платёж категорию "развлечения" и суммой 2000 руб.</b-dropdown-item>
        <b-dropdown-item href="/add/payment/развлечения">добавить платёж категорию "развлечения", но без суммы</b-dropdown-item>
        <b-dropdown-item href="/a">проверить 404 страницу</b-dropdown-item>
      </b-dropdown>
    </h3>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <itemsList class="rounded bg-white mb-3 p-4" />
        <pagination v-if="getPagesCount > 1" />
      </div>
      <div class="col-sm-12 col-md-6">
        <chart class="d-none d-md-block" />
      </div>
    </div>
  </div>
</template>

<script>
import chart from '../components/chart.vue'
import addItemForm from '../components/addItemForm.vue'
import itemsList from '../components/itemsList.vue'
import pagination from '../components/pagination.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    chart, addItemForm, itemsList, pagination
  },
  data: () => ({
    editPayment: false
  }),
  methods: {
    ...mapActions(['fetchData']),
    editPayment (index) {
      this.editPayment = true
      console.log(index)
    }
  },
  computed: {
    ...mapGetters(['getPagesCount'])
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss">
</style>
