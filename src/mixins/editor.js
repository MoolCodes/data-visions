/**
 * @file: editor. 编辑器共用代码
 * @authors: yangj (yangjia@fjxhx.cc).
 * @createDate: 2021/10/13.
 * @version: 1.0.
 * @copyright © 2021 新和兴 All rights reserved.
 */
export default {
  inject: ['contain'],
  props: {
    callback: { //点击事件
      type: Function,
      default: null
    },
    formatter: { //格式化数据
      type: Function,
      default: null
    },
    hint: { //提示数据
      type: Function,
      default: null
    },
    staticData: { //静态数据
      type: String,
      default: ''
    },
    dispose: { //动态数据处理函数
      type: Function,
      default: null
    },
    custom: { //自定义组件
      type: Function,
      default: null
    },
    customEditorValue: { //自定义组件
      type: String,
      default: ''
    },
    api: { //api接口
      type: Object,
      default: {}
    },
    isApi: { //是否渲染数据为动态数据
      type: Boolean,
      default: false
    },
    params: { //请求接口参数
      type: Object,
      default: () => {
      }
    },
    refreshTime: { //刷新时间
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      chartsData: null //接口数据
    }
  },
  watch: {
    formatter() {
      this.makeChart()
    },
    callback() {
      this.makeChart()
    },
    hint() {
      this.makeChart()
    },
    staticData() {
      if (!this.isApi) this.makeChart()
    },
    dispose() {
      this.request()
    },
    api() {
      if (this.isApi) this.request()
    },
    isApi() {
      this.makeChart()
    },
    refreshTime() {
      this.refresh()
    },
    customEditorValue() {
      this.makeChart()
    },
    params: {
      handler() {
        this.request()
      },
      deep: true,
      immediate:false
    },
  },
  mounted() {
    this.clearTimer()
    this.refresh()
  },
  methods: {
    /**
     * @description 自定义数值
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/12
     */
    customFormatter({name, data}) {
      if (typeof this.formatter === 'function') {
        return this.formatter({name, data})
      } else {
        return data
      }
    },
    /**
     * @description 自定义提示
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/13
     */
    hintFormatter({name, data}) {
      if (typeof this.hint === 'function') {
        return this.hint({name, data})
      } else {
        return data
      }
    },
    /**
     * @description 点击事件
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/11
     */
    click() {
      const that = this
      if (typeof this.callback === 'function') {
        this.charts.on('click', function (params) {
          const {name, type, value, data} = params
          that.callback({name, type, value, data})
        })
      }
    },
    /**
     * @description 读取cookie
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/18
     */
    getCookie(key) {
      const name = key + '='
      const ca = document.cookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim()
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
      }
      return ''
    },
    /**
     * @description 请求接口
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/15
     */
    request(isVerify = true) {
      if ((!this.api.url || !this.api.type) && isVerify) {
        this.$message.error('请填写完成接口数据')
      }
      let  headers = {}
      if (this.api.config) {
         headers =  JSON.parse(this.api.config).headers
        //获取token并携带
        if (JSON.parse(this.api.config).headers?.token) {
          console.log('this.api.config.headers.token:', JSON.parse(this.api.config).headers)
          const [stroe, key] = JSON.parse(this.api.config).headers?.token.split('.')
          switch (stroe) {
            case 'localStorage' :
              headers[key] = localStorage.getItem(key)
              break
            case 'Cookies' :
              headers[key] = this.getCookie(key)
              break
            default :
              break
          }
        }
      }
      const params = this.params
      const [type, url] = [this.api.type, this.api.url]
      this.$http(type, url, params, headers).then(res => {
        if (typeof this.dispose === 'function') {
          this.chartsData = this.dispose(res.data)
        } else {
          this.chartsData = res.data
        }
        this.charts.clear()
        this.makeChart()
      })
    },
    /**
     * @description 设置携带参数挂载成变量
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/25
     */
    setCoverage(obj) {
      this.$set(this.contain.coverage[this.contain.coverageIndex].apiModule, 'params', {})
      Object.keys(obj).forEach(item => {
        this.$set(this.contain.coverage[this.contain.coverageIndex].apiModule.params, item, obj[item])
      })
    },
    /**
     * @description 刷新组件
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/14
     */
    refresh() {
      console.log('this.refreshTime:', this.refreshTime)
      clearInterval(this.timer)
      this.timer = null
      this.timer = setInterval(() => {
        if (this.isApi) {
          this.request(false)
        } else {
          this.charts.clear()
          this.makeChart()
        }
      }, this.refreshTime)
    },
    /**
     * @description 清空定时器
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/18
     */
    clearTimer() {
      clearInterval(this.timer)
    }
  }
}
