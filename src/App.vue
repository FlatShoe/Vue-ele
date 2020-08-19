<template>
  <div id="app">
    <Header-container :seller="sellers" />
    <div class="tap border-bottom-1px">
      <router-link class="tap-item" tag="span" to="/goods">商品</router-link>
      <router-link class="tap-item" tag="span" to="/ratings">评论</router-link>
      <router-link class="tap-item" tag="span" to="/sellers">商家</router-link>
    </div>
    <div class="content">
      <keep-alive include="Goods,Ratings,Sellers">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import {sellers} from './api/sellers'
import HeaderContainer from "./components/Header/header";

export default {
  name: "App",
  components: {
    HeaderContainer,
  },
  data () {
    return {
      sellers: {}
    }
  },
  methods: {
    /*
    * @Description 获取商家信息
    * @return undefined
    */
    async getSellers () {
      const {status, data: {data: res}} = await sellers()
      if (status !== 200) return
      this.sellers = res 
      this.$store.commit('upDataSeller', res)
    }
  },
  mounted () {
    this.getSellers()
  }
};
</script>

<style lang="less">
@import "./common/style/mixin.less";
.tap {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  .border-bottom-1px(rgba(7, 17, 27, .1));
  .tap-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: rgb(77, 85, 93);
    &.active {
      color: rgb(240, 20, 20);
    }
  }
}
</style>
