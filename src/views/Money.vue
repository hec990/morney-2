<template>
<div>
  <Layout class-prefix="layout">
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
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
import {Component, Watch} from "vue-property-decorator";
import RecordItem from "@/custom";
import recordListModel from '@/models/recordListModel'
import tagListModel from "@/models/tagListModel";

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: {NumberPad, Types, FormItem, Tags},
})
export default class Money extends Vue{
  tags = tagList;

  // 保存到local Storage 中的数组名称
  recordList: RecordItem[] = recordList;

  // 初始值
  record: RecordItem = {
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
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  // 当这个数组发生变化就将数据保存到local storage
  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList);
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