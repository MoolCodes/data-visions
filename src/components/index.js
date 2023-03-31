/*
 * @Descripttion: 全局注册组件
 * @Author: Li Yuyuan
 * @Date: 2021-09-29 12:07:06
 */

import Vue from 'vue';
const context = require.context('@/components/common', true, /\.vue$/)
context.keys().forEach(v => {
    let component = context(v).default
    Vue.component(component.name, component)
})


const charts = require.context('@/components/build/charts', true, /\.vue$/)
charts.keys().forEach(v => {
    let component = charts(v).default
    Vue.component(component.name, component)
})

const table = require.context('@/components/build/table', true, /\.vue$/)
table.keys().forEach(v => {
    let component = table(v).default
    Vue.component(component.name, component)
})

const border = require.context('@/components/build/border', true, /\.vue$/)
border.keys().forEach(v => {
    let component = border(v).default
    Vue.component(component.name, component)
})

const ele = require.context('@/components/build/other', true, /\.vue$/)
ele.keys().forEach(v => {
    let component = ele(v).default
    Vue.component(component.name, component)
})