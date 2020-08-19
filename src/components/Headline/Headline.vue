<template>
  <div class="headline">
    <div class="headline-line"></div>
    <div class="headline-text">{{title}}</div>
    <div class="headline-line"></div>
  </div>
</template>

<script>
export default {
  name: 'HeadLine',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
  .headline {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    .headline-line {
      flex: 1;
      height: 1px;
      background-color: rgba(255, 255, 255, .2);
    }
    .headline-text {
      font-weight: 700;
      font-size: 14px;
      margin: 0 12px;
      color: #fff;
    }
  }
</style>