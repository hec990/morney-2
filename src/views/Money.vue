<template>
<div>
  <Layout class-prefix="layout">
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <Notes @update:value="onUpdateNotes"/>
    <Types :value.sync="record.type"/>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
  </Layout>
</div>
</template>

<script lang="ts">
import Tags from "@/components/money-child/Tags.vue";
import Notes from "@/components/money-child/Notes.vue";
import Types from "@/components/money-child/Types.vue";
import NumberPad from "@/components/money-child/NumberPad.vue";
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";

// 声明类型
type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number
}

@Component({
  components: {NumberPad, Types, Notes, Tags},
})
export default class Money extends Vue{
  tags = ['衣','食','住','行','玩']

  // 保存到local Storage 中的数组名称
  recordList: Record[] = [];

  // 初始值
  record: Record = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord(){
    // 深拷贝
    // record2 是新的对象
    const record2 = JSON.parse(JSON.stringify(this.record));
    this.recordList.push(record2);
  }

  // 当这个数组发生变化就将数据保存到local storage
  @Watch('recordList')
  onRecordListChange() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }
}
</script>


<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>