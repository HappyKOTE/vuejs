<template>
<div class="container mt-5 mb-5">
    <h3 class="mb-5">
        учёт финансов<addItemForm class="d-inline-block ms-2" />
    </h3>
    <div class="row">
        <div class="col">
            <itemsList class="rounded bg-white mb-3 p-4 border" />
            <pagination v-if="getPagesCount > 1" />
        </div>
        <div class="col">
            <chart />
        </div>
    </div>
</div>
</template>

<script>
import chart from './components/chart.vue'
import addItemForm from './components/addItemForm.vue'
import itemsList from './components/itemsList.vue'
import pagination from './components/pagination.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    chart, addItemForm, itemsList, pagination
  },
  data: () => ({
  }),
  methods: {
    ...mapActions(['fetchData'])
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
