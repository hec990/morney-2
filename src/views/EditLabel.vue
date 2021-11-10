<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem
          field-name="标签名"
          placeholder="请输入标签名"
          :value="tag.name"
          @update:value="update"
      />
    </div>
    <div class="button-wrapper">
      <Button class="button" @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import FormItem from "@/components/FormItem.vue";
import Button from "@/components/Button.vue";
import store from '@/store/index2'

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  get tag() {
    return this.$store.state.currentTag;
  }

  created() {
    const id = this.$route.params.id;
    this.$store.commit('setCurrentTag', id);
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  update(name: string) {
    if (this.tag) {
      store.updateTag(this.tag.id, name);
    }
  }

  remove(){
    if (this.tag) {
      if (store.removeTag(this.tag.id)) {
        this.$router.go(-1);
      } else {
        window.alert('删除失败');
      }
    }
  }

  goBack() {
    this.$router.go(-1);
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .title {
  }
  > .leftIcon {
    width: 30px;
    height: 30px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper{
  margin-top: 8px;
  background-color: white;
}
.button-wrapper{
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
  button {
    background-color: red;
  }
}


</style>