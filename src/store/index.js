import Vue from 'vue'
import Vuex from 'vuex'
import { goods } from '../api/goods'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    seller: {},
    selectFoods: [],
    foods: []
  },
  mutations: {
    /*
    * @Description 存储商家数据
    * @param {Object} payload 商家数据对象
    */
    upDataSeller(state, payload) {
      state.seller = { ...payload }
    },
    /*
    * @Description 存储当前商家所有食物分类数据
    * @param {Object} payload 食物分类数据对象
    */
    setFoodList(state, payload) {
      state.foods = [...payload]
    },
    /*
    * @Description 购物车数量增加
    * @param {Object} payload 某个食物数据对象
    */
    addCart (state, payload) {
      const [a, b, data] = payload
      const arrStr = JSON.stringify(state.foods)
      const arr = JSON.parse(arrStr)
      let count = arr[a]['foods'][b].count
      arr[a]['foods'].splice(b, 1, {...data, count: ++count})
      state.foods = [...arr]
    },
    /*
    * @Description 购物车数量减少
    * @param {Object} payload 某个食物数据对象
    */
    decreaseCart (state, payload) {
      const [a, b, data] = payload
      const arrStr = JSON.stringify(state.foods)
      const arr = JSON.parse(arrStr)
      let count = arr[a]['foods'][b].count
      arr[a]['foods'].splice(b, 1, {...data, count: --count})
      state.foods = [...arr]
    },
    /*
    * @Description 购物车数量清零
    */
    empty (state) {
      const arrStr = JSON.stringify(state.foods)
      const arr = JSON.parse(arrStr)
      arr.forEach(item => {
        item.foods.forEach(item => {
          item.count = 0
        })
      })
      state.foods = [...arr]
    }
  },
  getters: {
    total: state => {
      let tempArr = []
      state.foods.forEach(item => {
        item.foods.forEach(cItem => {
          if (cItem.count > 0) tempArr.push(cItem)
        })
      })
      return tempArr
    }
  },
  actions: {
     getFoods(context) {
      return new Promise(async (resolve, reject) => {
        const { status, data: { data: res } } = await goods()
        if (status !== 200) return
        context.commit('setFoodList', res)
        resolve(true)
      })
    }
  }
})

export default store