<template>
  <div class="star" :class="stypeType">
    <span class="star-item" :class="itemClass" :key="index" v-for="(itemClass, index) in itemClasses">
    </span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on', CLS_HALF = 'half', CLS_OFF = 'off'

export default {
  name: "Star",
  props: {
    size: {
      type: Number,
    },
    score: {
      type: Number,
      default: 5
    },
  },
  data() {
    return {

    }
  },
  computed: {
    stypeType() {
      return `star-${this.size}`;
    },
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)

      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) result.push(CLS_HALF)
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  },
};
</script>

<style lang="less" scoped>
@import '../../common/style/mixin.less';

.star {
  display: flex;
  .start-item {
    background-repeat: no-repeat;
    &:last-child {
      margin-right: 0;
    }
  }
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
      &.on {
        .bg-image('images/star48_on');
      }
      &.half {
        .bg-image('images/star48_half');
      }
      &.off {
        .bg-image('images/star48_off');
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      &.on {
        .bg-image('images/star36_on');
      }
      &.half {
        .bg-image('images/star36_half');
      }
      &.off {
        .bg-image('images/star36_off');
      }
    }
  }
  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &.on {
        .bg-image('images/star24_on');
      }
      &.half {
        .bg-image('images/star24_half');
      }
      &.off {
        .bg-image('images/star24_off');
      }
    }
  }
}
</style>