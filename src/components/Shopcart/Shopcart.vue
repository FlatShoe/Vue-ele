<template>
  <div>
    <div class="shopcar">
      <div class="left" @click="showShopcarList">
        <div class="logo-wrapper">
          <div class="logo" :class="{'hightlight': totalCount > 0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <p class="num" v-show="totalCount > 0">{{totalCount}}</p>
        </div>
        <div class="price" :class="{'higthlight': totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
      </div>
      <div
        class="right"
        :class="{'no-enough': seller.minPrice > totalPrice, 'enough': totalPrice >= seller.minPrice}"
      >{{payDesc}}</div>
      <div class="shopcar-list" v-show="shopcarListVisable">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content list-content-hook" v-if="total.length">
          <ul>
            <li :key="index" v-for="(item, index) in foods">
              <ol>
                <li class="content-item" :key="cIndex" v-for="(cItem, cIndex) in item.foods">
                  <div class="detail" v-if="cItem.count > 0">
                    <div class="detail-left">{{cItem.name}}</div>
                    <div class="detail-right">
                      <span class="detail-price">￥{{cItem.price}}</span>
                      <Cartcontrol :foodObject="{data: cItem, index, cIndex}" />
                    </div>
                  </div>
                </li>
              </ol>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mask" v-show="shopcarListVisable" @click="shopcarListVisable=false"></div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Cartcontrol from "../Cartcontrol/Cartcontrol";
import { mapMutations, mapState, mapGetters } from "vuex";

export default {
  name: "Shotcar",
  components: {
    Cartcontrol,
  },
  data() {
    return {
      // 购物车列表是否显示
      shopcarListVisable: false,
    };
  },
  methods: {
    /*
     * @Description 购物车列表是否显示
     * @return undefined
     */
    showShopcarList() {
      if (this.total.length) this.shopcarListVisable = !this.shopcarListVisable;
    },
    /*
     * @Description 清空购物车数据 映射Vuex commit('empty')
     * @return undefined
     */
    ...mapMutations(["empty"]),
    /*
     * @Description 初始化滑动组件
     */
    _initScroll() {
      this.ShopcarDetail = new BScroll(
        document.querySelector(".list-content-hook"), {
          click: true
        }
      );
    },
  },
  computed: {
    ...mapState(["seller", "foods"]),
    ...mapGetters(["total"]),
    totalPrice() {
      return this.total.reduce(
        (total, item) => (total += item.price * item.count),
        0
      );
    },
    totalCount() {
      return this.total.reduce((total, item) => (total += item.count), 0);
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `${this.seller.minPrice}元起送`;
      } else if (this.totalPrice < this.seller.minPrice) {
        let diff = this.seller.minPrice - this.totalPrice;
        return `还差￥${diff}元`;
      } else return "去结算";
    },
  },
  watch: {
    total(newVal) {
      if (newVal.length == 0) this.shopcarListVisable = false;
    },
    shopcarListVisable(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this._initScroll();
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../common/style/mixin.less";

.shopcar {
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48px;
  line-height: 48px;
  z-index: 65;
  .left {
    flex: 1;
    background-color: #141d27;
    .logo-wrapper {
      display: inline-block;
      position: relative;
      top: -10px;
      margin: 0 12px;
      padding: 6px;
      width: 56px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      border-radius: 50%;
      background-color: #141d27;
      vertical-align: top;
      z-index: 60;
      .logo {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #2b343c;
        &.hightlight {
          background-color: rgb(0, 160, 220);
          .icon-shopping_cart {
            color: #fff;
          }
        }
        .icon-shopping_cart {
          font-size: 24px;
          color: rgba(255, 255, 255, 0.4);
        }
      }
      .num {
        position: absolute;
        left: 32px;
        top: 0;
        transform: translateY(-10%);
        height: 16px;
        line-height: 16px;
        padding: 0 6px;
        color: #fff;
        background-color: rgba(240, 20, 20);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        border-radius: 7px;
        z-index: 60;
      }
    }
    .price {
      display: inline-block;
      font-size: 16px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.4);
      vertical-align: top;
      padding-right: 12px;
      margin-right: 12px;
      &.higthlight {
        color: #fff;
      }
    }
    .desc {
      display: inline-block;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.4);
    }
  }
  .right {
    flex: 0, 0, 28%;
    width: 105px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    &.no-enough {
      background-color: #2b343c;
      color: rgba(255, 255, 255, 0.4);
    }
    &.enough {
      background-color: #00b43c;
      color: #fff;
    }
  }
}
.shopcar-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 48px;
  background-color: #fff;
  z-index: 55;
  .list-header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    background-color: #f3f5f7;
    padding: 0 18px;
    .border-bottom-1px(rgba(7, 17, 27, 0.1));
    .title {
      font-size: 14px;
      font-weight: 200;
      color: rgb(7, 17, 27);
    }
    .empty {
      font-size: 12px;
      color: rgb(0, 120, 220);
    }
  }
  .list-content {
    max-height: 241px;
    padding: 0 18px;
    overflow: hidden;
    .content-item {
      .detail {
        display: flex;
        align-items: center;
        height: 48px;
        justify-content: space-between;
        .border-bottom-1px(rgba(7, 17, 27, 0.1));
        .detail-left {
          font-size: 14px;
          color: rgba(7, 17, 27);
        }
        .detail-right {
          display: flex;
          align-items: center;
          .detail-price {
            width: 54px;
            text-align: center;
            color: rgb(240, 20, 20);
            font-size: 10px;
            font-weight: 700;
          }
        }
      }
      &:last-child {
        .detail {
          .border-bottom-1px(#fff);
        }
      }
    }
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(7, 17, 27, 0.6);
  backdrop-filter: blur(10px);
  z-index: 50;
}
</style>