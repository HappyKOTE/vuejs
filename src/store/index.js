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
    paymentTypes: [
      { name: 'еда' },
      { name: 'товары для дома' },
      { name: 'транспорт' },
      { name: 'обучение' },
      { name: 'развлечения' }
    ],
    showModalAddPayment: false
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
    setNewPaymentTypes (state, payload) {
      state.paymentTypes.push(payload)
    },
    setDeletePayment (state, payload) {
      state.paymentsList.splice(payload, 1)
    },
    setEditPayment (state, payload) {
      state.showModalAddPayment = true
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
