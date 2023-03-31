/**
 * @file: stack. 撤回恢复模块
 * @authors: yangj (yangjia@fjxhx.cc).
 * @createDate: 2021/9/28.
 * @version: 1.0.
 * @copyright © 2021 新和兴 All rights reserved.
 */
import types from '@/store/types'

const state = {
  isOperate: false,//是否是除了撤回和恢复之外的操作
  operation: [],//操作日志数组，目前记录最近五次操作
  withdraw: [] //撤回日志数组
}
const getters = {}
const mutations = {
  [types.SET_OPERATION](state, operation) {
    state.operation = operation.length > 4 ? operation.slice(-5) : operation
  },
  [types.SET_WITHDRAW](state, withdraw) {
    state.withdraw = withdraw
  },
  [types.SET_ISOPERATE](state, isOperate) {
    state.isOperate = isOperate
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
