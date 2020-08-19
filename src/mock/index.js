import Mock from 'mockjs'
const {seller, goods, ratings} = require('./data.json')

// 获取商家列表
Mock.mock('api/seller', 'get', {
  state: 200,
  data: seller
})

// 获取商品列表
Mock.mock('api/goods', 'get', {
  state: 200,
  data: goods
})

// 获取评论列表
Mock.mock('api/ratings', 'get', {
  state: 200,
  data: ratings
})

