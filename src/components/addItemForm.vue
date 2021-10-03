<template>
  <div>

    <b-button variant="link" class="p-0" @click="modalShow = !modalShow"><b-icon-plus-circle></b-icon-plus-circle></b-button>

    <b-modal id="modal" title="новый элемент учёта" hide-footer hide-header-close v-model="modalShow">

      <b-form @submit.stop.prevent="submit" v-if="!addCategory">
        <div class="mb-3">
          <label for="inputDatepicker" class="form-label">дата</label>
          <b-form-datepicker id="inputDatepicker" v-model="date" placeholder="выберите дату" locale="ru">
          </b-form-datepicker>
        </div>
        <div class="mb-3">
          <div>
            <label for="inputCategory" class="form-label">категория</label>
            <b-button variant="link" class="p-0 ms-2" @click="addCategory = true"><b-icon-plus-circle></b-icon-plus-circle></b-button>
          </div>
          <select class="form-select" id="inputCategory" v-model="category">
            <option v-for="(item, index) in getPaymentTypes" :key="index">{{ item.name }}</option>
          </select>
        </div>
        <div>
          <label for="inputValue" class="form-label">рубли</label>
          <b-form-input v-model.number="value" id="inputValue" placeholder="введите сумму"></b-form-input>
        </div>
        <b-button variant="primary" type="submit" class="mt-4 d-block w-100">добавить запись</b-button>
      </b-form>

      <b-form @submit.stop.prevent="addNewCategory" v-if="addCategory">
        <div>
          <b-button variant="link" class="mb-2 p-0" @click="addCategory = false">
            <b-icon-arrow-left></b-icon-arrow-left>
          </b-button>
        </div>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="название" v-model="name">
          <b-button variant="primary" type="submit">добавить категорию</b-button>
        </div>
      </b-form>

    </b-modal>

  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'addItemForm',
  data: () => ({
    date: '',
    category: '',
    value: 0,
    addCategory: false,
    name: '',
    modalShow: false
  }),
  methods: {
    ...mapMutations(['setNewPayment', 'setNewPaymentTypes', 'setCurrentPageNumber']),
    submit (event) {
      if (this.category && this.value > 0) {
        event.preventDefault()
        const { date, category, value } = this
        this.setNewPayment({ date, category, value })
        this.modalShow = false
        this.category = ''
        this.value = 0
        this.setCurrentPageNumber(this.getPagesCount)
      }
    },
    addNewCategory () {
      if (this.categoryValidation()) {
        const { name } = this
        this.setNewPaymentTypes({ name })
        this.addCategory = false
        this.name = ''
      }
    },
    getTodayDate () {
      const today = new Date()
      const yyyy = today.getFullYear()
      let mm = today.getMonth() + 1
      if (mm <= 9) { mm = '0' + String(mm) }
      let dd = today.getDate()
      if (dd <= 9) { dd = '0' + String(dd) }
      this.date = yyyy + '-' + mm + '-' + dd
    },
    categoryValidation () {
      return this.name.length > 2 && this.name.length < 17
    }
  },
  computed: {
    ...mapGetters(['getPaymentTypes', 'getPagesCount'])
  },
  created () {
    this.getPaymentTypes()
    this.getPagesCount()
  },
  mounted () {
    this.getTodayDate()
    this.categoryValidation()
  }
}
</script>

<style scoped lang="scss">
</style>
