<template>
<div>
  <Layout class-prefix="layout">
    <Tags/>
    <Notes/>
    <Types/>
    <NumberPad/>
  </Layout>
</div>
</template>

<script lang="ts">
import Tags from "@/components/money-child/Tags.vue";
import Notes from "@/components/money-child/Notes.vue";
import Types from "@/components/money-child/Types.vue";
import NumberPad from "@/components/money-child/NumberPad.vue";
export default {
  name: "Money",
  components: {NumberPad, Types, Notes, Tags}
};
</script>


<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>