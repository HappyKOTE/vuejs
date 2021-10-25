<template>
  <div>
    <div class="mb-3">
      <a href="/" name="backToMain" class="link-primary"><b-icon-arrow-left></b-icon-arrow-left></a>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="row">
          <div class="col-6">
            <input type="number" class="form-control border" placeholder="операнд 1" v-model.number="operand1" name="operand1">
          </div>
          <div class="col-6">
            <input type="number" class="form-control border" placeholder="операнд 2" v-model.number="operand2" name="operand2">
          </div>
        </div>
        <div class="mt-3">
          <h1 class="m-0 p-0"><small class="text-muted">результат</small> <span name="result">{{ result }}</span></h1>
        </div>
      </div>
      <div class="col-6">
        <button class="me-1 mb-1 border btn btn-outline-dark" v-for="(option, index) in operations" :key="index" :name="'func' + index" @click="calculate(option)">
          {{ option }}
        </button>
      </div>
    </div>
    <hr class="mt-3 mb-3">
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitch" v-model="showVirtKey" name="showVirtKey">
      <label class="form-check-label" for="flexSwitch">отобразить экранную клавиатуру</label>
    </div>
    <transition name="fade">
      <div v-if="showVirtKey" class="bg-white rounded mt-3 p-4 d-inline-block shadow-sm" name="virtKeyDiv">
        <div class="text-center">
          <button class="me-1 mb-1 border btn btn-outline-dark" v-for="virtKey in virtKeysCollection" :key="virtKey" :name="'virtKey' + virtKey" @click="virtKeyClick(virtKey)">
            <span v-if="virtKey != 'backspace'">{{ virtKey }}</span>
            <b-icon-backspace v-if="virtKey === 'backspace'"></b-icon-backspace>
          </button>
        </div>
        <div class="mt-3 text-center">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="operand1" v-model="virtKeyOperand" checked>
            <label class="form-check-label" for="inlineRadio1">операнд 1</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="operand2" v-model="virtKeyOperand">
            <label class="form-check-label" for="inlineRadio2">операнд 2</label>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'calc',
  data () {
    return {
      operand1: 0,
      operand2: 0,
      result: null,
      operations: ['сложить', 'вычесть', 'умножить', 'разделить', 'возведение в степень', 'целочисленное деление'],
      showVirtKey: false,
      virtKeysCollection: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'backspace', 'C'],
      virtKeyOperand: 'operand1'
    }
  },
  methods: {
    calculate (option) {
      switch (option) {
        case this.operations[0]:
          this.result = this.operand1 + this.operand2
          break
        case this.operations[1]:
          this.result = this.operand1 - this.operand2
          break
        case this.operations[2]:
          this.result = this.operand1 * this.operand2
          break
        case this.operations[3]:
          this.result = this.operand1 / this.operand2
          break
        case this.operations[4]:
          this.result = this.operand1 ** this.operand2
          break
        case this.operations[5]:
          this.result = (this.operand1 / this.operand2) >> 0
          break
      }
      this.errorCheck(option)
    },
    virtKeyClick (value) {
      if (value >= 0) {
        this[this.virtKeyOperand] = +(String(this[this.virtKeyOperand]) + String(value))
      }
      if (value === 'backspace') {
        this[this.virtKeyOperand] = +(String(this[this.virtKeyOperand]).slice(0, -1))
      }
      if (value === 'C') {
        this[this.virtKeyOperand] = 0
      }
    },
    errorCheck (option) {
      if (option === 'разделить' || option === 'целочисленное деление') {
        if (this.operand2 === 0) {
          this.result = 'деление на ноль'
        }
      }
      if (typeof this.operand1 === 'undefined' || this.operand1 === '' || typeof this.operand2 === 'undefined' || this.operand2 === '') {
        this.result = 'не все значения заданы'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter, .fade-leave-to { opacity: 0; }
</style>
