<template>
  <div class="nav-wrapper">
    <div class="content">
     <!--  获取外面组件中 Layout包含的内容    -->
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
export default {
  name: "Layout"
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  height: 100vh;
  .content {
    border: 1px solid blue;
    overflow: auto;
    flex-grow: 1;
  }
}
</style>