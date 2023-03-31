import Vue from 'vue'
import App from './App.vue'
import './styles/index.less'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import store from './store/index'
import '@/util/request'
import mixins from './mixins/index'
import './components/index'
import * as util from '@/util/util'
import * as echarts from 'echarts/core'
import dataV from '@jiaminghi/data-view'
import animated from 'animate.css'

import {
    LineChart,
    LinesChart,
    BarChart,
    PieChart,
    GaugeChart,
    PictorialBarChart,
    RadarChart,
    MapChart,
    ScatterChart
} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    ToolboxComponent,
    AriaComponent,
    PolarComponent,
    GeoComponent,
    VisualMapComponent
} from 'echarts/components'
import {
    CanvasRenderer
} from 'echarts/renderers'

echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    ToolboxComponent,
    AriaComponent,
    PolarComponent,
    GeoComponent,
    VisualMapComponent,
    LineChart,
    LinesChart,
    BarChart,
    PieChart,
    GaugeChart,
    PictorialBarChart,
    RadarChart,
    MapChart,
    ScatterChart,
    CanvasRenderer
])
Vue.prototype.$echarts = echarts
Vue.prototype.$util = util
Vue.mixin(mixins)
Vue.use(ElementUI);
Vue.use(dataV)
Vue.use(animated)
Vue.config.productionTip = false

/**
 * @description 拖拽指令
 * @author: yangj (yangjia@fjxhx.cc)
 * @createDate: 2021/9/28
 */
Vue.directive('drag', {
    //1.指令绑定到元素上回立刻执行bind函数，只执行一次
    //2.每个函数中第一个参数永远是el，表示绑定指令的元素，el参数是原生js对象
    bind: function (el, elementObj) {
        let dragBox = el //获取当前元素
        let width = ''
        let height = ''
        dragBox.style.position = 'absolute' // 拖拽元素使用定位，脱离文档流
        dragBox.onmousedown = e => {
            //鼠标相对元素的位置
            let disX = e.clientX - dragBox.offsetLeft
            let disY = e.clientY - dragBox.offsetTop
            document.onmousemove = e => {
                //鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = dragBox.className !== 'btn' ? (e.clientX - disX > 0 ? e.clientX - disX : 0) : e.clientX - disX
                let top = dragBox.className !== 'btn' ? (e.clientY - disY > 0 ? e.clientY - disY : 0) : e.clientY - disY
                if (left + dragBox.offsetWidth > 1700 && dragBox.className !== 'btn') {
                    left = 1700 - dragBox.offsetWidth
                }
                if (top + dragBox.offsetHeight > 850 && dragBox.className !== 'btn') {
                    top = 850 - dragBox.offsetHeight
                }
                //移动当前元素
                dragBox.style.left = left + 'px'
                dragBox.style.top = top + 'px'
                width = e.target.width
                height = e.target.height
            }
            document.onmouseup = () => {
                //鼠标弹起来的时候不再移动
                document.onmousemove = null
                //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
                document.onmouseup = null
                // 对外暴露元素相对于父级位置
                elementObj.value.left = dragBox.style.left
                elementObj.value.top = dragBox.style.top
                elementObj.value.width = width
                elementObj.value.height = height
            }
        }
    }
})
new Vue({
    store,
    render: h => h(App),
}).$mount('#app')