<template>
  <transition name="move">
    <div class="food food-hook" v-if="showFlag">
      <div class="food-content">
        <div class="image-header">
          <img v-if="food.data" :src="food.data.image" />
          <i class="icon-arrow_lift" @click="showFlag=false"></i>
        </div>
        <div class="content">
          <h1 class="title">{{food.data.name}}</h1>
          <span class="sell-count">月售{{food.data.sellCount}}</span>
          <span class="rating">好评率{{food.data.rating}}</span>
        </div>
        <div class="price">
          <div class="price-inner">
            <span class="now">￥{{food.data.price}}</span>
            <del class="old" v-show="food.data.oldPrice">￥{{food.data.oldPrice}}</del>
          </div>
          <div
            class="addShopCar"
            v-show="!food.data.count || food.data.count === 0"
            @click="addCart()"
          >加入购物车</div>
        </div>
        <Split v-show="food.data.info" />
        <div class="description" v-show="food.data.info">
          <h5 class="caption">商品介绍</h5>
          <p class="info">{{food.data.info}}</p>
        </div>
        <Split />
        <div class="rating">
          <h1 class="caption">商品评价</h1>
          <RatingSelect :select-type="selectType" 
                        :only-content="onlyContent" 
                        :desc="desc" 
                        :ratings="food.data.ratings"
                        @selected="selectType=$event"
                        @switchContent="onlyContent=$event" />
          <div class="rating-wrapper">
             <ul v-show="food.data.ratings && food.data.ratings.length">
                <li class="rating-item" 
                    v-show="needShow(item.rateType, item.text)"
                    v-for="(item, index) in food.data.ratings" 
                    :key="index"
                >
                  <div class="user">
                    <div class="time">
                      {{item.rateTime | dateFormat}}
                    </div>
                    <div class="user-info">
                      <span class="user-name">{{item.username}}</span>
                      <img class="avatar" :src="item.avatar" />
                    </div>
                  </div>
                  <div class="rating-content">
                    <i class="icon" :class="{'icon-thumb_up': item.rateType === 0, 'icon-thumb_down': item.rateType === 1}"></i>
                    <span class="text">{{item.text}}</span>
                  </div>
                </li>
             </ul>
             <div class="no-rating" 
                  v-show="!food.data.ratings || !food.data.ratings.length">
                暂无评价
             </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from "better-scroll";
import Split from "../../components/Split/Split";
import RatingSelect from "../../components/RatingSelect/RatingSelect";

import dateFormat from '../../utils/DateFormat'

const POSITIVE = 0 // 满意
const NEGATIVE = 1 // 不满意
const ALL = 2 // 全部
export default {
  name: "Foods",
  components: {
    Split,
    RatingSelect
  },
  props: {
    food: {
      type: Object,
    },
  },
  data() {
    return {
      showFlag: false,
      // 评论类型
      selectType: ALL,
      // 是否只看有内容的评价
      onlyContent: false,
      // 评论类型展示的文字描述
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  methods: {
    /*
     * @Description 显示该组件 提供外部组件调用
     */
    show() {
      this.showFlag = true;
    },
    /*
     * @Description 添加购物车， 更新Vuex数据 并隐藏该组件
     */
    addCart() {
      this.$store.commit("addCart", [
        this.food.index,
        this.food.cIndex,
        this.food.data,
      ]);
      this.showFlag = false;
    },
    /*
     * @Description 初始化滚动组件
     */
    _initScroll() {
      this.foodScroll = new BScroll(document.querySelector(".food-hook"), {
        click: true,
      });
    },
    /*
    * @Description 依据条件显示评论内容
    * @param {Number} type 评论类型
    * @param {String} text 评论
    */
    needShow (type, text) {
      // 如果只看内容但是该评论没有内容 则隐藏
      if (this.onlyContent && !text) return false
      // 如果当前的选择类型为查看全部 则显示
      if (this.selectType === ALL) {
        return true
      } else {
        // 当前遍历的评论类型是否与自己选择的评论类型相等
        return type === this.selectType
      }
    }
  },
  filters: {
    dateFormat (date) {
      return dateFormat(date, 'yyyy-MM-dd hh:mm')
    }
  },
  watch: {
    food(newVal) {
      this.$nextTick(() => {
        this._initScroll();
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../common/style/mixin.less';
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
}
.move-enter-active {
  transition: all 0.3s linear;
  transform: translate3d(0, 0, 0);
}
.move-leave-active {
  transition: all 0.5s ease;
  transform: translate3d(100%, 0, 0);
}
.move-enter,
.move-leave {
  transform: translate3d(100%, 0, 0);
}
.image-header {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  i {
    display: block;
    position: absolute;
    top: 10px;
    left: 0;
    padding: 10px;
    font-size: 20px;
    color: #fff;
  }
}
.food-content {
  padding-bottom: 18px;
}
.content,
.price {
  font-size: 0;
  padding: 18px;
}
.content {
  .title {
    font-size: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
  }
  .sell-count,
  .rating {
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .sell-count {
    margin-right: 12px;
  }
}
.price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  .price-inner {
    .now,
    .old {
      line-height: 24px;
    }
    .now {
      font-size: 14px;
      color: rgb(240, 20, 20);
      font-weight: 700;
      margin-right: 12px;
    }
    .old {
      font-size: 10px;
      font-weight: 700;
      color: rgb(147, 153, 159);
    }
  }
  .addShopCar {
    width: 74px;
    height: 24px;
    font-size: 10px;
    text-align: center;
    color: #fff;
    background-color: rgb(0, 160, 220);
    border-radius: 12px;
    line-height: 24px;
  }
}
.description {
   padding: 18px;
  .caption {
    font-size: 14px;
    color: #07111b;
    margin-bottom: 6px;
  }
  .info {
    padding: 0 8px;
    line-height: 24px;
    font-weight: 200;
    font-size: 12px;
    color: rgb(77, 85, 93);
  }
}
.rating {
  .caption {
    font-size: 14px;
    color: #07111b;
    margin-bottom: 6px;
    padding-top: 18px;
  }
}
.rating-wrapper {
  padding: 0 18px;
  .rating-item {
    padding: 16px 0;
    .border-bottom-1px(rgba(7, 17, 27, .1));
    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 12px;
      margin-bottom: 6px;
      .time {
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .user-info {
        .user-name {
          margin-right: 6px;
        }
        .avatar {
          width: 12px;
          height: 12px;
          vertical-align: middle;
          border-radius: 50%;
        }
      }
    }
    .rating-content {
      font-size: 0;
      height: 24px;
      line-height: 24px;
      .icon {      
        font-size: 12px; 
        color: rgb(147, 153, 159);
        margin-right: 4px;
        &.icon-thumb_up {
          color: rgb(0, 160, 220);
        }
      }
      .text {
        font-size: 12px;
        color: rgb(7, 17, 27);
      }
    }
  }
  .no-rating {
    padding: 16px 0;
    font-size: 12px;
    color: rgb(147, 153, 159);
  }
}
</style>