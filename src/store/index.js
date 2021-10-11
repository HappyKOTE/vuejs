import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: [],
    paymentsOnPage: [],
    paymentsPerPage: 8,
    pagesCount: 0,
    currentPageNumber: 1,
    addFormKey: 0,
    homeKey: 0,
    paymentTypes: [
      { name: 'еда' },
      { name: 'товары для дома' },
      { name: 'транспорт' },
      { name: 'обучение' },
      { name: 'развлечения' }
    ],
    paymentTypesSumm: []
  },
  mutations: {
    setPaymentsList (state, payload) {
      state.paymentsList = payload
    },
    setCurrentPageNumber (state, payload) {
      state.currentPageNumber = payload
    },
    setNewPayment (state, payload) {
      state.paymentsList.push(payload)
    },
    setEditPayment (state, payload) {
      state.paymentsList.splice(payload[1], 1, payload[0])
    },
    setNewPaymentTypes (state, payload) {
      state.paymentTypes.push(payload)
    },
    setDeletePayment (state, payload) {
      state.paymentsList.splice(payload, 1)
    },
    setAddFormKey (state, payload) {
      state.addFormKey += 1
    },
    setHomeKey (state, payload) {
      state.homeKey += 1
    }
  },
  getters: {
    getAllPayments: state => state.paymentsList,
    getPaymentsOnPage: state => {
      return state.paymentsList.slice((state.currentPageNumber - 1) * state.paymentsPerPage, (state.currentPageNumber - 1) * state.paymentsPerPage + state.paymentsPerPage)
    },
    getPagesCount: state => {
      return Math.ceil(state.paymentsList.length / state.paymentsPerPage)
    },
    getCurrentPageNumber: state => {
      return state.currentPageNumber
    },
    getPaymentTypes: state => {
      return state.paymentTypes
    },
    getPaymentsPerPage: state => {
      return state.paymentsPerPage
    },
    getShowModalAddPayment: state => {
      return state.showModalAddPayment
    },
    getPaymentsCount: state => {
      return state.paymentsList.length
    },
    getAddFormKey: state => {
      return state.addFormKey
    },
    getHomeKey: state => {
      return state.homeKey
    },
    getCategorySumm: state => {
      state.paymentTypesSumm = []
      for (let i = 0; i < state.paymentTypes.length; i++) {
        state.paymentTypesSumm.push(0)
      }
      for (let i = 0; i < state.paymentTypes.length; i++) {
        for (let m = 0; m < state.paymentsList.length; m++) {
          if (state.paymentTypes[i].name === state.paymentsList[m].category) {
            state.paymentTypesSumm[i] = state.paymentTypesSumm[i] + state.paymentsList[m].value
          }
        }
      }
      return state.paymentTypesSumm
    },
    getPaymentTypesArray: state => {
      const array = []
      for (let i = 0; i < state.paymentTypes.length; i++) {
        array.push(state.paymentTypes[i].name)
      }
      return array
    }
  },
  actions: {
    fetchData ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            { date: '2021-05-07', category: 'еда', value: 210 },
            { date: '2021-05-08', category: 'товары для дома', value: 56 },
            { date: '2021-05-09', category: 'транспорт', value: 105 },
            { date: '2021-05-10', category: 'обучение', value: 1560 },
            { date: '2021-05-11', category: 'развлечения', value: 320 },
            { date: '2021-05-07', category: 'еда', value: 210 },
            { date: '2021-05-08', category: 'товары для дома', value: 56 },
            { date: '2021-05-09', category: 'транспорт', value: 105 },
            { date: '2021-05-10', category: 'обучение', value: 1560 },
            { date: '2021-05-11', category: 'развлечения', value: 320 },
            { date: '2021-05-07', category: 'еда', value: 210 },
            { date: '2021-05-08', category: 'товары для дома', value: 56 },
            { date: '2021-05-09', category: 'транспорт', value: 105 },
            { date: '2021-05-10', category: 'обучение', value: 1560 },
            { date: '2021-05-11', category: 'развлечения', value: 320 },
            { date: '2021-05-07', category: 'еда', value: 210 },
            { date: '2021-05-08', category: 'товары для дома', value: 56 },
            { date: '2021-05-09', category: 'транспорт', value: 105 },
            { date: '2021-05-10', category: 'обучение', value: 1560 },
            { date: '2021-05-11', category: 'развлечения', value: 320 },
            { date: '2021-05-07', category: 'еда', value: 210 },
            { date: '2021-05-08', category: 'товары для дома', value: 56 },
            { date: '2021-05-09', category: 'транспорт', value: 105 },
            { date: '2021-05-10', category: 'обучение', value: 1560 },
            { date: '2021-05-11', category: 'развлечения', value: 320 },
            { date: '2021-05-07', category: 'еда', value: 210 },
            { date: '2021-05-08', category: 'товары для дома', value: 56 },
            { date: '2021-05-09', category: 'транспорт', value: 105 },
            { date: '2021-05-10', category: 'обучение', value: 1560 },
            { date: '2021-05-11', category: 'развлечения', value: 320 },
            { date: '2021-05-07', category: 'еда', value: 210 },
            { date: '2021-05-08', category: 'товары для дома', value: 56 },
            { date: '2021-05-09', category: 'транспорт', value: 105 },
            { date: '2021-05-10', category: 'обучение', value: 1560 },
            { date: '2021-05-11', category: 'развлечения', value: 320 }
          ])
        }, 1500)
      })
        .then(res => {
          commit('setPaymentsList', res)
        })
    }
  }
})
