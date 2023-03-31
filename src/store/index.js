/**
 * @file: index.js.
 * @authors: yangj (yangjia@fjxhx.cc).
 * @createDate: 2021/9/28.
 * @version: 1.0.
 * @copyright © 2021 新和兴 All rights reserved.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import stack from "./modules/stack"
export default new Vuex.Store({
  modules:{
    stack
  }
})
