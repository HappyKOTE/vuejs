import { createLocalVue, mount } from '@vue/test-utils'
import { BootstrapVueIcons } from 'bootstrap-vue'

import Calc from '../../src/pages/calc'

const localVue = createLocalVue()
localVue.use(BootstrapVueIcons)
mount(Calc, { localVue })

describe('Описание теста', () => {

  test('проверка ввода данных операнда 1', () => {
    const wrapper = mount(Calc)
    const operand1Input = wrapper.find('input[name=operand1]')
    operand1Input.setValue('10')
    expect(wrapper.vm.operand1).toBe(10)
  })

  test('проверка ввода данных операнда 2', () => {
    const wrapper = mount(Calc)
    const operand2Input = wrapper.find('input[name=operand2]')
    operand2Input.setValue('10')
    expect(wrapper.vm.operand2).toBe(10)
  })

  test('проверка сложения', () => {
    const wrapper = mount(Calc)
    const operand1Input = wrapper.find('input[name=operand1]')
    operand1Input.setValue('10')
    const operand2Input = wrapper.find('input[name=operand2]')
    operand2Input.setValue('20')
    const btn = wrapper.find('button[name="func0"]')
    btn.trigger('click')
    expect(wrapper.vm.result).toBe(30)
  })

  test('проверка вычитания', () => {
    const wrapper = mount(Calc)
    const operand1Input = wrapper.find('input[name=operand1]')
    operand1Input.setValue('20')
    const operand2Input = wrapper.find('input[name=operand2]')
    operand2Input.setValue('10')
    const btn = wrapper.find('button[name="func1"]')
    btn.trigger('click')
    expect(wrapper.vm.result).toBe(10)
  })

  test('проверка умножения', () => {
    const wrapper = mount(Calc)
    const operand1Input = wrapper.find('input[name=operand1]')
    operand1Input.setValue('10')
    const operand2Input = wrapper.find('input[name=operand2]')
    operand2Input.setValue('5')
    const btn = wrapper.find('button[name="func2"]')
    btn.trigger('click')
    expect(wrapper.vm.result).toBe(50)
  })

  test('проверка деления', () => {
    const wrapper = mount(Calc)
    const operand1Input = wrapper.find('input[name=operand1]')
    operand1Input.setValue('10')
    const operand2Input = wrapper.find('input[name=operand2]')
    operand2Input.setValue('5')
    const btn = wrapper.find('button[name="func3"]')
    btn.trigger('click')
    expect(wrapper.vm.result).toBe(2)
  })

  test('проверка возведения в степень', () => {
    const wrapper = mount(Calc)
    const operand1Input = wrapper.find('input[name=operand1]')
    operand1Input.setValue('10')
    const operand2Input = wrapper.find('input[name=operand2]')
    operand2Input.setValue('2')
    const btn = wrapper.find('button[name="func4"]')
    btn.trigger('click')
    expect(wrapper.vm.result).toBe(100)
  })

  test('проверка целочисленного деления', () => {
    const wrapper = mount(Calc)
    const operand1Input = wrapper.find('input[name=operand1]')
    operand1Input.setValue('10')
    const operand2Input = wrapper.find('input[name=operand2]')
    operand2Input.setValue('3')
    const btn = wrapper.find('button[name="func5"]')
    btn.trigger('click')
    expect(wrapper.vm.result).toBe(3)
  })

  test('проверка показа виртуальной клавиатуры', () => {
    const wrapper = mount(Calc)
    const checkbox = wrapper.find('input[name=showVirtKey]')
    checkbox.setChecked()
    expect(wrapper.find('div[name="virtKeyDiv"]')).toBeTruthy()
  })

  test('проверка ввода операнда 1 из виртуальной клавиатуры', () => {
    const wrapper = mount(Calc)
    const checkbox = wrapper.find('input[name=showVirtKey]')
    checkbox.setChecked()
    const operandKey = wrapper.find('button[name=virtKey5]')
    operandKey.trigger('click')
    expect(wrapper.vm.operand1).toBe(5)
  })

  test('проверка ввода операнда 2 из виртуальной клавиатуры', () => {
    const wrapper = mount(Calc)
    const checkbox = wrapper.find('input[name=showVirtKey]')
    checkbox.setChecked()
    const radio = wrapper.find('input[id=inlineRadio2]')
    radio.setChecked()
    const operandKey = wrapper.find('button[name=virtKey5]')
    operandKey.trigger('click')
    expect(wrapper.vm.operand2).toBe(5)
  })

  test('проверка удаление крайнего символа в виртуальной клавиатуре', () => {
    const wrapper = mount(Calc)
    const checkbox = wrapper.find('input[name=showVirtKey]')
    checkbox.setChecked()
    wrapper.setData({ operand1: 555})
    const operandKey = wrapper.find('button[name=virtKeybackspace]')
    operandKey.trigger('click')
    expect(wrapper.vm.operand1).toBe(55)
  })

  test('проверка обнуления операнда в виртуальной клавиатуре', () => {
    const wrapper = mount(Calc)
    const checkbox = wrapper.find('input[name=showVirtKey]')
    checkbox.setChecked()
    wrapper.setData({ operand1: 555})
    const operandKey = wrapper.find('button[name=virtKeyC]')
    operandKey.trigger('click')
    expect(wrapper.vm.operand1).toBe(0)
  })

})
