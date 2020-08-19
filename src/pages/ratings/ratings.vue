<template>
  <div class="ratings ratings-hook">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <span class="score">{{seller.score}}</span>
          <span class="text">综合评分</span>
          <span class="percent">高于周边商家{{seller.rankRate}}%</span>
        </div>
        <div class="overview-right">
          <div class="desc1">
            <span class="caption">服务评分</span>
            <Star :size="size" :score="seller.serviceScore" />
            <i class="score">{{seller.serviceScore}}</i>
          </div>
          <div class="desc2">
            <span class="caption">食物评分</span>
            <Star :size="size" :score="seller.foodScore" />
            <i class="score">{{seller.foodScore}}</i>
          </div>
          <div class="desc3">
            <span class="caption">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <Split />
      <RatingSelect :ratings="ratingList" :selectType="selectType" :onlyContent="onlyContent"
      @selected="selectType=$event"
      @switchContent="onlyContent=$event" />
      <div class="ratings-list">
        <ul>
          <li class="ratings-item" 
          v-show="needShow(item.rateType, item.text)"
          :key="index" v-for="(item, index) in ratingList">
            <div class="user">
              <div class="user-info">
                <img class="avatar" :src="item.avatar" />
                <div class="user-score">
                  <span class="username">{{item.username}}</span>
                  <Star :size="24" :score="item.score" />
                </div>
              </div>
              <div class="time">{{item.rateTime | dateFormat}}</div>
            </div>
            <p class="text">{{item.text}}</p>
            <div class="recomment" v-show="item.recommend.length">
              <i class="icon icon-thumb_up"></i>
              <ol class="recomment-wrapper">
                <li class="recomment-item" 
                :key="cIndex"
                v-for="(cItem, cIndex) in item.recommend">{{cItem}}</li>
              </ol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Shopcart />
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Star from "../../components/Star/Star";
import Split from "../../components/Split/Split";
import RatingSelect from "../../components/RatingSelect/RatingSelect"
import Shopcart from '../../components/Shopcart/Shopcart'

import dateFormat from '../../utils/DateFormat'

import { mapState } from "vuex";
import { ratings } from "../../api/ratings"


const POSITIVE = 0; // 满意
const NEGATIVE = 1; // 不满意
const ALL = 2; // 全部
export default {
  name: "Ratings",
  components: {
    Star,
    Split,
    Shopcart,
    RatingSelect,
  },
  data() {
    return {
      size: 36,
      ratingList: [],
      selectType: ALL,
      onlyContent: false,
    };
  },
  methods: {
    /*
     * @Description 获取评论列表
     * @return undefined
     */
    async getRatings() {
      const {status, data: { data: res }} = await ratings();
      if (status !== 200) return;
      this.ratingList = res;
    },
    /*
     * @Description 初始化滚动插件
     */
    _initScroll() {
      this.ratingsScroll = new BScroll(document.querySelector(".ratings-hook"),
        {
          click: true,
        }
      );
    },
    /*
    * @Description 按条件显示相应评论
    * @param {Number} type 评论对应的类型
    * @param {String} text 评论内容
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
  computed: {
    ...mapState(["seller"]),
  },
  watch: {
    ratingList(newVal) {
      if (newVal.length) this._initScroll();
    },
  },
  filters: {
    dateFormat (date) {
      return dateFormat(date, 'yyyy-MM-dd hh:mm')
    }
  },
  mounted() {
    this.getRatings();
  },
};
</script>

<style lang="less" scoped>
@import '../../common/style/mixin.less';
.ratings {
  position: absolute;
  top: 174px;
  bottom: 46px;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    display: flex;
    padding: 18px 0;
    .overview-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 0 0 137px;
      width: 137px;
      border-right: 1px solid #eaebec;
      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }
      .score {
        font-size: 24px;
        color: rgb(255, 153, 0);
        margin-bottom: 6px;
      }
      .text {
        font-size: 12px;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
      }
      .percent {
        font-size: 10px;
        color: #9ca2a7;
      }
    }
    .overview-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 24px;
      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }
      .desc1,
      .desc2,
      .desc3 {
        display: flex;
        align-items: center;
        .caption {
          font-size: 12px;
          color: rgb(7, 17, 27);
          margin-right: 12px;
        }
        .score {
          color: rgb(255, 153, 0);
          margin-left: 12px;
        }
      }
      .desc2 {
        margin: 8px 0;
      }
      .desc3 {
        font-size: 0;
        .time {
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
  .ratings-list {
    .ratings-item {
      padding: 18px 0;
      margin: 0 18px;
      .border-bottom-1px(rgba(7, 17, 27, .1));
      .user {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
        .user-info {
          display: flex;
          .avatar {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 12px;
          }
          .user-score {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .username {
              font-size: 10px;
              color: rgb(7, 17, 27);
            }
          }
        }
        .time {
          color: rgb(147, 153, 159);
          font-size: 10px;
          font-weight: 200;
        }
      }
      .text {
        margin-bottom: 8px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 18px;
      }
      .recomment {
        display: flex;
        .icon {
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
        .recomment-wrapper {
          display: flex;
          flex-wrap: wrap;
          .recomment-item {
            width: 80px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            font-size: 9px;
            color: rgb(147, 153, 159);
            padding: 0 6px;
            margin: 0 8px 4px 8px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            border: 1px solid rgba(7, 17, 27, .1);
            border-radius: 1px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>