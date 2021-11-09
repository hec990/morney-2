<template>
  <div>
    <label class="formItem">
      <span class="name">{{this.fieldName}}</span>
      <input
          type="text"
          :placeholder="this.placeholder"
          v-model="value"
      >
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop, Watch} from "vue-property-decorator";

@Component
export default class FormItem extends Vue{
  value='';

  @Prop({required: true}) fieldName!: string;
  @Prop() placeholder?: string;

  // 当value发生变化，就把最新的数据发送出去
  @Watch('value')
  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}

</script>



<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>