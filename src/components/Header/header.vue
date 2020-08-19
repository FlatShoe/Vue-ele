<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <h5 class="swllerName">{{seller.name}}</h5>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="detailVisibale=true">
        <span>{{seller.supports.length}}个</span>
        <i class="icon icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="detailVisibale=true">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="bulletin-icon icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" />
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailVisibale">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="caption">{{seller.name}}</h1>
            <div class="star-wrapper">
              <Star :size="36" :score="seller.score" />
            </div>
            <div class="title">
              <Headline :title="'优惠信息'" />
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support support-item" :key="index" v-for="(item, index) in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <Headline :title="'商家公告'" />
            </div>
            <div class="bulletin">
              <div class="content">{{seller.bulletin}}</div>
            </div>
          </div>
        </div>
        <div class="detail-colse">
          <i class="icon-colse" @click="detailVisibale=false"></i>
        </div>
      </div>
    </transition>
    
  </div>
</template>

<script>
import Star from "../Star/Star"
import Headline from '../Headline/Headline'
export default {
  name: "Header",
  props: {
    seller: {
      type: Object,
      default: () => ({})
    },
  },
  components: {
    Star,
    Headline
  },
  data() {
    return {
      classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
      detailVisibale: false
    };
  }
};
</script>

<style lang="less" scoped>
@import "../../common/style/mixin.less";

.header {
  position: relative;
  color: #fff;
  background: rgba(7, 17, 27, 0.5);
  overflow: hidden;
}
.content-wrapper {
  position: relative;
  display: flex;
  padding: 24px 12px 18px 24px;
  .avatar {
    margin-right: 16px;
    border-radius: 2px;
    img {
      width: 64px;
      height: 64px;
      vertical-align: middle;
    }
  }
  .content {
    padding: 2px 0;
  }
}
.content .title {
  display: flex;
  margin-bottom: 8px;
  font-size: 16px;
  .brand {
    width: 30px;
    height: 18px;
    margin-right: 6px;
    .bg-image("images/brand");
    background-repeat: no-repeat;
    background-size: 30px 18px;
  }
}
.content .description {
  font-size: 12px;
  margin-bottom: 10px;
}
.content .support {
  display: flex;
  align-items: center;
  font-size: 0;
  .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    &.decrease {
      .bg-image("images/decrease_1");
    }
    &.discount {
      .bg-image("images/discount_1");
    }
    &.guarantee {
      .bg-image("images/guarantee_1");
    }
    &.invoice {
      .bg-image("images/invoice_1");
    }
    &.special {
      .bg-image("images/special_1");
    }
  }
  .text {
    font-size: 10px;
    vertical-align: middle;
  }
}
.content-wrapper .support-count {
  position: absolute;
  bottom: 18px;
  right: 12px;
  height: 24px;
  line-height: 24px;
  padding: 0 8px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 14px;
  span {
    vertical-align: top;
    margin-right: 2px;
  }
  .icon {
    line-height: 24px;
  }
}
.bulletin-wrapper {
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  background-color: rgba(7, 17, 27, 0.2);
  font-size: 0;
  .bulletin-title {
    width: 22px;
    height: 12px;
    .bg-image("images/bulletin");
    background-size: 22px 12px;
    vertical-align: middle;
  }
  .bulletin-text {
    width: 301px;
    font-size: 10px;
    margin: 0 8px;
    vertical-align: middle;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .bulletin-icon {
    font-size: 10px;
    vertical-align: middle;
  }
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(10px);
  img {
    width: 100%;
    height: 100%;
  }
}
.detail {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(7, 17, 27, .9);
  .detail-wrapper {
    min-height: 100%;
    .detail-main {
      margin-top: 64px;
      padding-bottom: 64px;
    }
  }
  .detail-colse {
    position: relative;
    width: 32px;
    height: 32px;
    clear: both;
    margin: -64px auto 0 auto;
    font-size: 32px;
  }
}
.detail-main {
  .caption {
    text-align: center;
    font-size: 16px;
  }
}
.detail-main .star-wrapper {
  display: flex;
  justify-content: center;
  padding: 16px 0 28px 0;
}
.detail-main .title {
  margin-bottom: 24px;
}
.detail-main .supports {
  width: 80%;
  box-sizing: border-box;
  margin: 0 auto 28px;
  padding: 0 12px;
  .support-item {
    display: flex;
    align-items: center;
    height: 16px;
    line-height: 16px;
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
    .icon {
      width: 16px;
      height: 16px;
      margin-right: 6px;
      background-size: 16px 16px;
      background-repeat: no-repeat;
      vertical-align: top;
      &.decrease {
        .bg-image("images/decrease_2");
      }
      &.discount {
        .bg-image("images/discount_2");
      }
      &.guarantee {
        .bg-image("images/guarantee_2");
      }
      &.invoice {
        .bg-image("images/invoice_2");
      }
      &.special {
        .bg-image("images/special_2");
      }
    }
    .text {
      font-size: 12px;
    }
  }
}
.detail-main .bulletin {
  width: 80%;
  margin: 0 auto;
  box-sizing: border-box;
  .content {
    line-height: 24px;
    padding: 0 12px;
    font-size: 12px;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>