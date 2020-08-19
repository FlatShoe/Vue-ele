<template>
  <div class="sellers sellers-hook">
    <div class="overview">
      <div class="seller-detail">
        <h1 class="title">{{seller.name}}</h1>
        <div class="score">
          <Star class="star" :size="36" :score="seller.score" />
          <span class="ratingCount">({{seller.ratingCount}})</span>
          <span class="sellCount">月售{{seller.sellCount}}单</span>
        </div>
        <div class="collect">
          <span class="icon icon-favorite" :class="{'active': isCollect}" @click="toggleCollect"></span>
          <span class="text" v-show="!isCollect">收藏</span>
          <span class="text" v-show="isCollect">已收藏</span>
        </div>
        <div class="serve">
          <div class="serve-item">
            <span class="title">起送价</span>
            <span class="text">
              <i>{{seller.minPrice}}</i>元
            </span>
          </div>
          <div class="serve-item">
            <span class="title">商家配送</span>
            <span class="text">
              <i>{{seller.deliveryPrice}}</i>元
            </span>
          </div>
          <div class="serve-item">
            <span class="title">平均配送时间</span>
            <span class="text">
              <i>{{seller.deliveryTime}}</i>分钟
            </span>
          </div>
        </div>
      </div>
      <Split />
      <div class="seller-bulletin">
        <h1 class="title">公告与活动</h1>
        <p class="text">{{seller.bulletin}}</p>
        <ul class="supports" v-if="seller.supports">
          <li class="support support-item" :key="index" v-for="(item, index) in seller.supports">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <Split />
      <div class="seller-pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper pic-wrapper-hook">
          <ul class="pic-list" :style="{width: width + 'px'}">
            <li
              class="pic-item"
              v-show="seller.pics.length"
              :key="index"
              v-for="(item, index) in seller.pics"
            >
              <img :src="item" />
            </li>
          </ul>
        </div>
      </div>
      <Split />
      <div class="seller-info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item"
              :key="item"
              v-for="item in seller.infos">{{item}}</li>
        </ul>
      </div>
    </div>
    <Shopcart />
  </div>
</template>

<script>
import { sellers } from "../../api/sellers";

import Shopcart from "../../components/Shopcart/Shopcart";
import Star from "../../components/Star/Star";
import Split from "../../components/Split/Split";
import BScroll from "better-scroll";

export default {
  name: "Sellers",
  components: {
    Star,
    Split,
    Shopcart,
  },
  data() {
    return {
      seller: {},
      isCollect: false,
      classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
      width: 100,
    };
  },
  methods: {
    /*
     * @Description 获取商家信息
     * @return undefined
     */
    async getSellers() {
      const {
        status,
        data: { data: res },
      } = await sellers();
      if (status !== 200) return;
      this.seller = res;
      this.isCollect = JSON.parse(localStorage.getItem('collect')).isCollect
      this.$nextTick(() => {
        this._initScroll();
      });
    },
    /*
    * @Description 点击收藏
    * @return undefined
    */
    toggleCollect () {
      const json = JSON.parse(localStorage.getItem('collect'))
      if (!json) {
        const obj = {sid: this.seller.sid, isCollect: this.isCollect}
        localStorage.setItem('collect', JSON.stringify(obj))
      } else {
        this.isCollect = !json.isCollect
        const obj = {sid: this.seller.sid, isCollect: !json.isCollect}
        localStorage.setItem('collect', JSON.stringify(obj))
      }
      
    },
    /*
     * @Description 初始化滚动条
     * @return undefined
     */
    _initScroll() {
      this.sellersScroll = new BScroll(
        document.querySelector(".sellers-hook"),
        {
          click: true,
        }
      );
      if (this.seller.pics) {
        const picWidth = 120,
          margin = 6;
        const width = (picWidth + margin) * this.seller.pics.length;
        this.width = width;
        this.picWrapperScroll = new BScroll(
          document.querySelector(".pic-wrapper-hook"),
          {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical",
          }
        );
      }
    },
  },
  mounted() {
    this.getSellers();
  },
};
</script>

<style lang="less">
@import "../../common/style/mixin.less";
.sellers {
  position: fixed;
  top: 174px;
  left: 0;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .seller-detail {
    position: relative;
    padding: 18px;
    .title {
      font-size: 14px;
      color: rgb(7, 17, 27);
      margin-bottom: 8px;
      font-weight: 200;
    }
    .score {
      display: flex;
      align-items: center;
      font-size: 10px;
      padding-bottom: 18px;
      .border-bottom-1px(rgba(7, 17, 27, 0.1));
      .star {
        margin-right: 8px;
      }
      .ratingCount {
        height: 18px;
        line-height: 18px;
        margin-right: 12px;
      }
    }
    .collect {
      width: 36px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 20px;
      right: 18px;
      .icon {
        font-size: 24px;
        color: rgb(77, 85, 93);
        margin-bottom: 4px;
        &.active {
          color: rgb(240, 20, 20);
        }
      }
      .text {
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
    .serve {
      display: flex;
      padding-top: 18px;
      .serve-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        font-size: 10px;
        color: rgb(147, 153, 159);
        &:nth-child(2) {
          border-left: 1px solid rgba(7, 17, 27, 0.1);
          border-right: 1px solid rgba(7, 17, 27, 0.1);
        }
        .text {
          color: rgb(7, 17, 27);
          font-weight: 200;
          i {
            font-size: 24px;
          }
        }
      }
    }
  }
  .seller-bulletin {
    padding: 18px 18px 0 18px;
    .title {
      font-size: 14px;
      color: rgb(7, 17, 27);
      font-weight: 200;
      margin-bottom: 8px;
    }
    .text {
      padding: 0 12px;
      font-weight: 200;
      line-height: 24px;
      color: rgb(240, 20, 20);
      margin-bottom: 12px;
    }
    .supports {
      .support-item {
        display: flex;
        align-items: center;
        padding: 16px;
        font-size: 0;
        .border-top-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          .border-bottom-1px(rgba(7, 17, 27, 0.1));
        }
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 6px;
          background-size: 16px 16px;
          &.decrease {
            .bg-image("images/decrease_4");
          }
          &.discount {
            .bg-image("images/discount_4");
          }
          &.guarantee {
            .bg-image("images/guarantee_4");
          }
          &.invoice {
            .bg-image("images/invoice_4");
          }
          &.special {
            .bg-image("images/special_4");
          }
        }
        .text {
          font-size: 12px;
          font-weight: 200;
          color: rgb(7, 17, 27);
        }
      }
    }
  }
  .seller-pics {
    padding: 18px;
    .title {
      font-size: 14px;
      color: rgb(7, 17, 27);
      font-weight: 200;
      margin-bottom: 12px;
    }
    .pic-wrapper {
      overflow: hidden;
      .pic-list {
        display: flex;
        .pic-item {
          margin-right: 6px;
          flex-shrink: 0;
          img {
            width: 120px;
            height: 90px;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .seller-info {
    padding: 18px 18px 0 18px;
    .title {
      font-size: 14px;
      color: rgb(7, 17, 27);
      font-weight: 200;
      margin-bottom: 12px;
    }
    .info-item {
      line-height: 16px;
      font-size: 12px;
      font-weight: 200;
      color: rgb(7, 17, 27);
      padding: 16px 12px;
      .border-top-1px(rgba(7, 17, 27, .1));
    }
  }
}
</style>