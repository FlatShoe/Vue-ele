<template>
  <div class="Cartcontrol">
    <div class="catr-decrease icon-remove_circle_outline" 
          v-show="count > 0" 
          @click.stop="decreaseCart([foodObject.index, foodObject.cIndex, foodObject.data])">
    </div>
    <div class="cart-count" v-show="count > 0">{{count}}</div>
    <div class="cart-add icon-add_circle" 
         @click.stop="addCart([foodObject.index, foodObject.cIndex, foodObject.data])">
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: "Cartcontrol",
  props: {
    foodObject: {
      type: Object
    }
  },
  methods: {
    /*
    * @Description 购物车物品数量增加 映射Vuex commit('addCart')
    */
    ...mapMutations(['addCart']),
    /*
    * @Description 购物车物品数量减少 映射Vuex commit('decreaseCart')
    */
    ...mapMutations(['decreaseCart'])

  },
  computed: {
    count () {
      return this.foodObject.data.count
    }
  },
  created() {
    
  },
};
</script>

<style lang="less" scoped>
.Cartcontrol {
  display: flex;
  align-items: center;
  .catr-decrease, .cart-add {
    font-size: 24px;
    color: rgb(0, 160, 220);
    padding: 6px;
  }
  
  .catr-decrease {
    
  }
  .cart-count {
    width: 24px;
    text-align: center;
  }
  .cart-add {

  }
}
</style>