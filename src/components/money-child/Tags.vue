<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource"
          :key="tag"
          :class="{selected: selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)"
      >{{tag}}</li>
    </ul>
  </div>

</template>

<script lang="ts">
import Vue from "vue";
import {Component,Prop} from "vue-property-decorator";

@Component
export default class Tags extends Vue{
 // string[] 是字符串数组，表示这个数组里只能存字符串
 // readonly 是只读的意思，因为dataSource是外部传来的，避免我们自己在子组件修改父组件的数据，如果子组件有修改数据的动作会提示这个数据是只读的，不能修改。
 @Prop() readonly dataSource: string[] | undefined;
  // 选中的tag
  selectedTags: string[] = [];

  toggle(tag: string) {
    // 获取到选中的tag
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      // 二次点击取消tag，如果当前tag被选中就删除
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    // $emit发送数据
    // update:value 是自定义事件（外面拿数据需要监听这个事件）
    // this.selectedTags 最新的数据
    this.$emit('update:value', this.selectedTags)
  }

  create() {
    const name = window.prompt("请输入标签名");
    if (name === "") {
      window.alert("标签名不能为空");
    } else if (this.dataSource) {
      // 将最新的数据发送给外面
      this.$emit("update:dataSource",[...this.dataSource, name]);
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg: #d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>
41  src/components/Money/Types.vue