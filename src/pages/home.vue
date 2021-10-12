<template>
  <div :key="getHomeKey">
    <h3 class="mb-5">
      учёт финансов
      <AddItemForm class="d-inline-block ms-2" />
      <b-dropdown right text="роуты" class="float-end">
        <b-dropdown-item href="#" @click="pushRouter('/add/category/разное')">добавить новую категорию "разное"</b-dropdown-item>
        <b-dropdown-item href="#" @click="pushRouter('/add/payment/еда?value=200')">добавить платёж категорию "еда" и суммой 200 руб.</b-dropdown-item>
        <b-dropdown-item href="#" @click="pushRouter('/add/payment/транспорт?value=50')">добавить платёж категорию "транспорт" и суммой 50 руб.</b-dropdown-item>
        <b-dropdown-item href="#" @click="pushRouter('/add/payment/развлечения?value=2000')">добавить платёж категорию "развлечения" и суммой 2000 руб.</b-dropdown-item>
        <b-dropdown-item href="#" @click="pushRouter('/add/payment/развлечения')">добавить платёж категорию "развлечения", но без суммы</b-dropdown-item>
        <b-dropdown-item href="#" @click="pushRouter('/edit/payment/1')">редактировать 1 платёж</b-dropdown-item>
        <b-dropdown-item href="#" @click="pushRouter('/edit/payment/20')">редактировать 20 платёж</b-dropdown-item>
        <b-dropdown-item href="#" @click="pushRouter('/a')">проверить 404 страницу</b-dropdown-item>
      </b-dropdown>
    </h3>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <ItemsList class="rounded bg-white mb-3 p-4" />
        <Pagination v-if="getPagesCount > 1" />
      </div>
      <div class="col-sm-12 col-md-6">
        <Metrics class="d-none d-md-block" v-if="getPagesCount > 1" />
      </div>
    </div>
  </div>
</template>

<script>
import Metrics from '../components/metrics.vue'
import AddItemForm from '../components/addItemForm.vue'
import ItemsList from '../components/itemsList.vue'
import Pagination from '../components/pagination.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'home',
  components: {
    Metrics, AddItemForm, ItemsList, Pagination
  },
  methods: {
    ...mapActions(['fetchData']),
    ...mapMutations(['setHomeKey', 'setAddFormKey']),
    pushRouter (routePath) {
      this.$router.push({ path: routePath })
      this.setAddFormKey()
    }
  },
  computed: {
    ...mapGetters(['getPagesCount', 'getPaymentTypesArray', 'getCategorySumm', 'getHomeKey'])
  },
  created () {
    this.getHomeKey()
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss">
</style>
