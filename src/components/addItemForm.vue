<template>
  <div :key="getAddFormKey">
    <b-button variant="link" class="p-0" @click="showModal = !showModal"><b-icon-plus-circle></b-icon-plus-circle></b-button>

    <b-modal hide-footer hide-header hide-header-close v-model="showModal">

      <b-form @submit.stop.prevent="submit" v-if="!showCategoryInModal">
        <div class="mb-3">
          <label for="inputDatepicker" class="form-label">дата</label>
          <b-form-datepicker id="inputDatepicker" v-model="date" placeholder="выберите дату" locale="ru">
          </b-form-datepicker>
        </div>
        <div class="mb-3">
          <div>
            <label for="inputCategory" class="form-label">категория</label>
            <b-button variant="link" class="p-0 ms-2" @click="showCategoryInModal = !showCategoryInModal"><b-icon-plus-circle></b-icon-plus-circle></b-button>
          </div>
          <select class="form-select" id="inputCategory" v-model="category">
            <option v-for="(item, index) in getPaymentTypes" :key="index">{{ item.name }}</option>
          </select>
        </div>
        <div>
          <label for="inputValue" class="form-label">рубли</label>
          <b-form-input v-model.number="value" id="inputValue" placeholder="введите сумму"></b-form-input>
        </div>
        <b-button variant="primary" type="submit" class="mt-4 d-block w-100">сохранить</b-button>
      </b-form>

      <b-form @submit.stop.prevent="addNewCategory" v-if="showCategoryInModal">
        <div>
          <b-button variant="link" class="mb-2 p-0" @click="showCategoryInModal = !showCategoryInModal">
            <b-icon-arrow-left></b-icon-arrow-left>
          </b-button>
        </div>
        <label for="inputNewCategory" class="form-label">добавление категории</label>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="название" v-model="name" id="inputNewCategory">
          <b-button variant="primary" type="submit">сохранить</b-button>
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
    name: '',
    showModal: false,
    showCategoryInModal: false,
    editIndex: 0,
    editMode: false
  }),
  methods: {
    ...mapMutations(['setNewPayment', 'setNewPaymentTypes', 'setCurrentPageNumber', 'setEditPayment', 'setHomeKey']),
    submit (event) {
      if (!this.editMode) {
        if (this.category && this.value > 0) {
          event.preventDefault()
          const { date, category, value } = this
          this.setNewPayment({ date, category, value })
          this.setCurrentPageNumber(this.getPagesCount)
          this.clearFormData()
        }
      } else if (this.editMode) {
        if (this.category && this.value > 0) {
          event.preventDefault()
          const { date, category, value } = this
          this.setEditPayment([{ date, category, value }, this.editIndex])
          this.clearFormData()
        }
      }
    },
    clearFormData () {
      this.showModal = false
      this.category = ''
      this.value = 0
    },
    addNewCategory () {
      if (this.categoryValidation()) {
        const { name } = this
        this.setNewPaymentTypes({ name })
        this.showCategoryInModal = false
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
    },
    pushEditData () {
      this.showModal = true
      this.editMode = true
      this.editIndex = this.$route.params.payment - 1
      const indexOnPage = this.$route.params.payment - ((this.getCurrentPageNumber - 1) * this.getPaymentsPerPage) - 1
      this.date = this.getPaymentsOnPage[indexOnPage].date
      this.category = this.getPaymentsOnPage[indexOnPage].category
      this.value = this.getPaymentsOnPage[indexOnPage].value
    }
  },
  computed: {
    ...mapGetters(['getPaymentTypes', 'getPagesCount', 'getPaymentsOnPage', 'getCurrentPageNumber', 'getPaymentsPerPage', 'getPaymentsCount', 'getAddFormKey'])
  },
  created () {
    this.getPaymentTypes()
    this.getPagesCount()
    this.getPaymentsCount()
    this.getAddFormKey()
  },
  mounted () {
    this.getTodayDate()
    this.categoryValidation()
    this.pageRoute = this.$route.name
    if (this.$route.name === 'addPayment') {
      this.showModal = true
      const formValue = this.$route.fullPath.split('?', 2)[1].split('=', 2)
      if (formValue[0] === 'value') {
        this.value = formValue[1]
      }
    }
    if (this.$route.name === 'addCategory') {
      this.showModal = true
      this.showCategoryInModal = true
      this.name = this.$route.params.category
    }
    if (this.$route.name === 'editPayment') {
      setTimeout(() => {
        if (this.$route.params.payment > 0 && this.$route.params.payment <= this.getPaymentsCount) {
          this.setCurrentPageNumber(Math.floor(this.$route.params.payment / this.getPaymentsPerPage) + 1)
          this.pushEditData()
        }
      }, 2000)
    }
  },
  updated () {
    if (!this.showModal && this.editMode) {
      this.editMode = false
      this.$router.push({ path: '/' })
    }
    if (this.$route.name === 'editPayment') {
      if (!this.showModal) {
        if (this.$route.params.payment > 0 && this.$route.params.payment <= this.getPaymentsCount) {
          this.pushEditData()
        }
      }
    }
  }
}
</script>

<style>
#addItemModal .modal-content { border: none !important; }
</style>
