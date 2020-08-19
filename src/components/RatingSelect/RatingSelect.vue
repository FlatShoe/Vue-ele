<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="positive" 
            :class="{'active': selectType === 2}"
            @click="select(2)" >
        {{desc.all}}<i class="count">{{ratings.length}}</i>
      </span>
      <span class="positive" 
            :class="{'active': selectType === 0}"
            @click="select(0)" >
        {{desc.positive}}<i class="count">{{positive.length}}</i>
      </span>
      <span class="negative" 
            :class="{'active': selectType === 1}"
            @click="select(1)" >
        {{desc.negative}}<i class="count">{{negative.length}}</i>
      </span>
    </div>
    <div class="rating-switch" @click="toggleContent">
      <i class="icon-check_circle" :class="{'on': onlyContent}"></i>
      <span>只看有内容的评价</span>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
const POSITIVE = 0 // 满意
const NEGATIVE = 1 // 不满意
const ALL = 2 // 全部
export default {
  name: 'RatingSelect',
  props: {
    ratings: {  // 评论内容
      type: Array,
      default () {
        return []
      }
    },
    selectType: {  // 评论类型
      type: Number,
      default: ALL
    },
    onlyContent: {  // 是否只看有内容的评价
      type: Boolean,
      default: true
    },
    desc: {
      type: Object, // 评论类型展示的文字描述
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  methods: {
    /*
    * @Description 选择查看对应类型的评论
    * @param {number} type 2 全部 0 满意 1 不满意
    */
    select (type) {
      this.$emit('selected', type)
    },
    /*
    * @Description 是否只查看内容评论
    */
    toggleContent () {
      this.$emit('switchContent', !this.onlyContent)
    }
  },
  computed: {
    positive () {
      return this.ratings.filter(item => item.rateType === POSITIVE)
    },
    negative () {
      return this.ratings.filter(item => item.rateType === NEGATIVE)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/style/mixin.less';
  .ratingselect {
    width: 100%;
    .rating-type {
      display: flex;
      padding: 18px 0;
      margin: 0 18px;
      .border-bottom-1px(rgba(7, 17, 27, .1));
      span {
        padding: 8px 12px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        margin-right: 8px;
        border-radius: 1px;
        &.positive {
          background-color: rgba(0, 160, 220, .2);
        }
        &.negative {
          background-color: rgba(77, 85, 93, .2);
          margin-right: 0;
        }
        .count {
          margin-left: 2px;
          font-size: 8px;
        }
        &.active {
          background-color: rgb(0, 160, 220);
          color: #fff;
        }
      }
    }
    .rating-switch {
      display: flex;
      align-items: center;
      padding: 12px 18px;
      color: rgb(147, 153, 159);
      i {
        font-size: 24px;
        margin-right: 4px;
        &.on {
          color: #00c850;
        }
      }
    }
    .line {
      height: 1px;
      background-color: rgba(7, 17, 27, .1);
    }
  }
</style>