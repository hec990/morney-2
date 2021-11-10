<template>
<div>
  <Layout class-prefix="layout">
    <Tags />
    <div class="notes">
      <FormItem @update:value="onUpdateNotes"
                field-name="备注"
                placeholder="在这里输入备注"/>
    </div>
    <Types :value.sync="record.type"/>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
  </Layout>
</div>
</template>

<script lang="ts">
import Tags from "@/components/money-child/Tags.vue";
import FormItem from "@/components/FormItem.vue";
import Types from "@/components/money-child/Types.vue";
import NumberPad from "@/components/money-child/NumberPad.vue";
import Vue from "vue";
import {Component} from "vue-property-decorator";
import RecordItem from "@/custom";
import store from '@/store/index2.ts';

@Component({
  components: {NumberPad, Types, FormItem, Tags},
})
export default class Money extends Vue{
  // 保存到local Storage 中的数组名称
  recordList = store.recordList;

  // 初始值
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord(){
    store.createRecord(this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
.notes{
  padding: 12px 0;
}
</style>