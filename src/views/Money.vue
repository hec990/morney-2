<template>
<div>
  <Layout class-prefix="layout">
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <Notes @update:value="onUpdateNotes"/>
    <Types :value.sync="record.type"/>
    <NumberPad :value.sync="record.amount"/>
  </Layout>
</div>
</template>

<script lang="ts">
import Tags from "@/components/money-child/Tags.vue";
import Notes from "@/components/money-child/Notes.vue";
import Types from "@/components/money-child/Types.vue";
import NumberPad from "@/components/money-child/NumberPad.vue";
import Vue from "vue";
import {Component} from "vue-property-decorator";

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

}
</script>


<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>