<template>
<div>
  <ul class="pagination justify-content-center">
    <li class="page-item" :class="{'disabled':getCurrentPageNumber===1}">
      <button type="button" class="page-link border-0" @click="previous"><b-icon-chevron-left></b-icon-chevron-left></button>
    </li>
    <li class="page-item" v-for="n in getPagesCount" :key="n" :class="{'active':getCurrentPageNumber===n}">
      <button type="button" class="page-link border-0" @click="changePage(n)">{{ n }}</button>
    </li>
    <li class="page-item" :class="{'disabled':getCurrentPageNumber===getPagesCount}">
      <button type="button" class="page-link border-0" @click="next"><b-icon-chevron-right></b-icon-chevron-right></button>
    </li>
  </ul>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'pagination',
  methods: {
    ...mapMutations(['setCurrentPageNumber']),
    changePage (n) {
      if (n !== this.getCurrentPageNumber) {
        this.setCurrentPageNumber(n)
      }
    },
    previous () {
      if (this.getCurrentPageNumber > 1) {
        this.setCurrentPageNumber(this.getCurrentPageNumber - 1)
      }
    },
    next () {
      if (this.getCurrentPageNumber < this.getPagesCount) {
        this.setCurrentPageNumber(this.getCurrentPageNumber + 1)
      }
    }
  },
  computed: {
    ...mapGetters(['getPagesCount', 'getCurrentPageNumber'])
  },
  created () {
    this.getPagesCount()
    this.getCurrentPageNumber()
  }
}
</script>

<style scoped lang="scss">
</style>
