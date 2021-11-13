<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component,Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  output = this.value.toString();

  // 每个方法都有event，event中有点击当前事件的相关信息
  inputContent(event:MouseEvent){
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent!;
    // 1. 输入框不能超过16个数字
    if (this.output.length === 16) { return; }
    // 2. 如果当前第一个数字等于0
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        // 新值覆盖旧值
        this.output = input;
      } else {
        // 新值增加
        this.output += input;
      }
      return;
    }
    // 3. 输入框不能超过两个小数点以及第一个数字不能为小数点
    if (this.output.indexOf('.') >= 0 && input === '.') {return;}
    this.output += input;
  }

  remove(){
    if(this.output.length === 1){
      this.output = '0';
    }else{
      this.output = this.output.slice(0, -1);
    }
  }

  clear(){
    this.output = '0'
  }

  ok(){
    const number = parseFloat(this.output);
    this.$emit('update:value', number);
    this.$emit('submit',number)
    this.output = '0'
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
  }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.ok {
        height: 64*2px;
        float: right;
      }
      &.zero {
        width: 25*2%;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4*2%);
      }
      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 4*3%);
      }
      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 4*4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4*5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4*6%);
      }
    }
  }
}
</style>