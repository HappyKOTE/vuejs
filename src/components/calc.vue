<template>
  <div>
    <input type="number" v-model.number="operand1">
    <input type="number" v-model.number="operand2">
    <div>
      <button v-for="option in operations" :key="option" @click="calculate(option)">{{ option }}</button>
    </div>
    <h1>результат: {{ result }}</h1>
    <label><input type="checkbox" v-model="showVirtKey">Отобразить экранную клавиатуру</label>
    <div v-if="showVirtKey">
      <button type="button" v-for="virtKey in virtKeysCollection" :key="virtKey" @click="virtKeyClick(virtKey)">{{ virtKey }}</button>
      <div>
        <label><input type="radio" name="inlineRadioOptions" value="operand1" v-model="virtKeyOperand" checked>операнд 1</label>
        <label><input type="radio" name="inlineRadioOptions" value="operand2" v-model="virtKeyOperand">операнд 2</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "calc",
  data() {
    return {
      operand1: 0,
      operand2: 0,
      result: "",
      operations: ["сложить", "вычесть", "умножить", "разделить", "возведение в степень", "целочисленное деление",],
      showVirtKey: false,
      virtKeysCollection: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "←", "clear"],
      virtKeyOperand: "operand1",
    };
  },
  methods: {
    calculate(option) {
      switch (option) {
        case "сложить":
          this.result = this.operand1 + this.operand2;
          break;
        case "вычесть":
          this.result = this.operand1 - this.operand2;
          break;
        case "умножить":
          this.result = this.operand1 * this.operand2;
          break;
        case "разделить":
          this.result = this.operand1 / this.operand2;
          break;
        case "возведение в степень":
          this.result = this.operand1 ** this.operand2;
          break;
        case "целочисленное деление":
          this.result = (this.operand1 / this.operand2) >> 0;
          break;
      }
      this.errorCheck(option);
    },
    virtKeyClick(value) {
      if (value >= 0) {
        this[this.virtKeyOperand] = +(String(this[this.virtKeyOperand]) + String(value));
      }
      if (value === "←") {
        this[this.virtKeyOperand] = +String(this[this.virtKeyOperand]).slice(0,-1);
      }
      if (value === "clear") {
        this[this.virtKeyOperand] = 0;
      }
    },
    errorCheck(option) {
      if (option === "разделить" || option === "целочисленное деление") {
        if (this.operand2 === 0) {
          this.result = "деление на ноль";
        }
      }
      if (typeof this.operand1 === "undefined" || this.operand1 === "" || typeof this.operand2 === "undefined" || this.operand2 === "") {
        this.result = "не все значения заданы";
      }
    },
  },
};
</script>

<style scoped>
</style>