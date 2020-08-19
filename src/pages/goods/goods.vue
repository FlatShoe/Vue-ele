<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          class="menu-item"
          :class="{'active': currentIndex === index , 'lose': currentIndex - index === 1}"
          v-for="(item, index) in foods"
          :key="index"
          @click="selectMenu(index)"
        >
          <div class="content">
            <span class="text">
              <i v-if="!(item.type<0)" class="icon" :class="classMap[item.type]"></i>
              {{item.name}}
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="(item, index) in foods" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ol>
            <li class="food-item" 
                :key="cIndex"
                v-for="(cItem, cIndex) in item.foods"
                @click="selectFood({data: cItem, index, cIndex})" >
              <div class="icon">
                <img width="58" height="58" :src="cItem.icon" />
              </div>
              <div class="content">
                <h2 class="name">{{cItem.name}}</h2>
                <p class="desc">{{cItem.description}}</p>
                <div class="extra">
                  <span class="count">月售{{cItem.sellCount}}</span>
                  <span>好评率{{cItem.rating}}</span>
                </div>
                <div class="price">
                  <span class="new-price">￥{{cItem.price}}</span>
                  <span class="old-price" v-show="cItem.oldPrice">￥{{cItem.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <Cartcontrol :foodObject="{data: cItem, index, cIndex}"  />
                </div>
              </div>
            </li>
          </ol>
        </li>
      </ul>
    </div>
    <Shopcart />
    <Food ref="foodRef" :food="selectedFood" />
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Shopcart from "../../components/Shopcart/Shopcart";
import Cartcontrol from "../../components/Cartcontrol/Cartcontrol";
import Food from '../../components/Food/Food'

import { goods } from "../../api/goods";
import {mapState} from 'vuex'
export default {
  name: "Goods",
  components: {
    Shopcart,
    Cartcontrol,
    Food
  },
  data() {
    return {
      classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
      // Scroll 计算每个区间的高度
      listHeight: [],
      scrollY: 0,
      // 当前选中的食物对象的相关数据
      selectedFood: {}
    };
  },
  methods: {
    /*
     * @Description 根据索引控制菜单
     * @param {number} index 当前菜单索引
     * @return undefined
     */
    selectMenu(index) {
      const foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
      const el = foodList[index];
      this.foodsScorll.scrollToElement(el, 300);
    },
    /*
     * @Description 获取Vuex的食物数据
     * @return undefined
     */
    async getFoods() {
      const res = await this.$store.dispatch("getFoods")
      if (!res) return
      // const {data: { data: res }} = await goods();
      // this.goods = res;
      // Dom 更新之后再调用Scroll 下的方法
      this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight();
      });
    },
    /*
     * @Description 初始化滑动组件
     * @return undefined
     */
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true,
      });
      this.foodsScorll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        // 允许侦听滚动高度
        probeType: 3,
      });
      // 通过事件获取滚动高度
      this.foodsScorll.on("scroll", (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    /*
     * @Description 获取每个区间的值，进行累加
     * @return undefined
     */
    _calculateHeight() {
      // offsetHeight
      const foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      const tempArr = [];
      tempArr.push(height);
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].offsetHeight;
        tempArr.push(height);
      }
      this.listHeight = tempArr;
    },
    /*
    * @Description 查看食物详情
    * @param {object} info 当前食物数据对象，父级索引，当前子索引
    * @return undefined
    */
    selectFood (info) {
      this.selectedFood = info
      this.$refs.foodRef.show()
    }
  },
  computed: {
    ...mapState(['foods']),
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) return i
      }
    },
  },
  mounted() {
    this.getFoods();
  },
};
</script>

<style lang="less">
@import "../../common/style/mixin.less";

.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    width: 80px;
    flex: 0 0 80px;
    font-size: 12px;
    color: rgb(36, 45, 54);
    background-color: #f3f5f7;
    ul {
      width: 100%;
    }
    .menu-item {
      &.active {
        background-color: #fff;
        & > .content {
          .border-bottom-1px(rgb(255, 255, 255));
        }
      }
      &.lose {
        & > .content::after {
          width: 0;
        }
      }
      .content {
        width: 56px;
        height: 54px;
        line-height: 14px;
        display: table;
        font-size: 0;
        margin: 0 auto;
        .border-bottom-1px(rgba(7, 17, 27, 0.1));
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-repeat: no-repeat;
          background-size: 12px 12px;
          vertical-align: top;
          &.decrease {
            .bg-image("images/decrease_3");
          }
          &.discount {
            .bg-image("images/discount_3");
          }
          &.guarantee {
            .bg-image("images/guarantee_3");
          }
          &.invoice {
            .bg-image("images/invoice_3");
          }
          &.special {
            .bg-image("images/special_3");
          }
        }
        .text {
          display: table-cell;
          width: 56px;
          font-size: 12px;
          vertical-align: middle;
        }
      }
    }
  }
  .foods-wrapper {
    flex: 1;
  }
  .food-list {
    font-size: 12px;
    .title {
      height: 26px;
      line-height: 26px;
      padding-left: 14px;
      background-color: #f3f5f7;
      color: rgba(147, 153, 159);
      border-left: 2px solid #d9dde1;
    }
    .food-item {
      position: relative;
      display: flex;
      background-color: #fff;
      padding: 18px 0 18px 18px;
      .icon {
        margin-right: 10px;
      }
    }
  }
}
.food-item .content {
  .name {
    font-size: 14px;
    color: rgb(7, 17, 27);
    padding-top: 2px;
  }
  .desc {
    padding: 8px 0;
  }
  .extra {
    padding-bottom: 8px;
    .count {
      margin-right: 12px;
    }
  }
  .desc,
  .extra span {
    color: rgb(147, 153, 159);
    font-size: 10px;
  }
  .price {
    font-weight: 700;
    font-size: 0;
    .new-price {
      margin-right: 8px;
      color: rgba(240, 20, 20);
      font-size: 14px;
    }
    .old-price {
      color: rgb(147, 153, 159);
      font-size: 10px;
      text-decoration: line-through;
    }
  }
}
.cartcontrol-wrapper {
  position: absolute;
  top: 75%;
  right: 12px;
  transform: translateY(-50%);
}
</style>