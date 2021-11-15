<template>
<div>
  <Layout class-prefix="layout">
    <Tags />
    <div class="notes">
      <FormItem @update:value="onUpdateNotes"
                field-name="备注"
                placeholder="在这里输入备注"/>
    </div>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
  </Layout>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Tags from "@/components/money-child/Tags.vue";
import FormItem from "@/components/FormItem.vue";
import NumberPad from "@/components/money-child/NumberPad.vue";
import Tabs from "@/components/Tabs.vue";
import {Component} from "vue-property-decorator";
import recordTypeList from '@/constants/recordTypeList';

type RecordItem = {
  tags: string[]
  notes: string
  type: string
  amount: number
  createdAt?: Date
}

@Component({
  components: {Tabs, NumberPad, FormItem, Tags},
})
export default class Money extends Vue{
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;

  // 初始值
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };
  created(){
    this.$store.commit('fetchRecords')
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord(){
    this.$store.commit('createRecord', this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>