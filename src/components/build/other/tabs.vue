<!--
 * @file: tabs.
 * @authors: yangj (yangjia@fjxhx.cc).
 * @createDate: 2021/10/22.
 * @version: 1.0.
 * @copyright © 2021 新和兴 All rights reserved.
 -->

<template>
  <div class="tabs" :style="{ width: options.width.value + 'px', height: options.height.value + 'px' }">
    <div
      class="tabs-item"
      v-for="(item, index) in option"
      :key="index"
      :style="{ margin: '0 ' + options.margin.value + 'px', lineHeight: options.height.value + 'px', fontSize: options.fontSize.value + 'px', color: options.fontColor.value }"
      @click="setValue(item.value, index)"
    >
      <div
        v-show="tabsIndex === index"
        :style="{
          backgroundImage: 'url(' + options.highlightConfig.config.bgImg.value + ')',
          backgroundSize: '100% 100%',
          color: options.highlightConfig.config.fontColor.value,
          border: options.highlightConfig.config.borderWidth.value + 'px solid ' + options.highlightConfig.config.borderColor.value,
        }"
      >
        {{ item.label }}
      </div>
      <div
        v-show="tabsIndex !== index"
        class="default"
        :style="{
          backgroundImage: 'url(' + options.borderConfig.config.bgImg.value + ')',
          backgroundSize: '100% 100%',
          backgroundColor: options.borderConfig.config.bgColor.value,
          border: options.borderConfig.config.borderWidth.value + 'px solid ' + options.borderConfig.config.borderColor.value,
        }"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['contain'],
  props: {
    options: {},
    staticData: {
      //静态数据
      type: String,
      default: '',
    },
    dispose: {
      //动态数据处理函数
      type: Function,
      default: null,
    },
    api: {
      //api接口
      type: Object,
      default: () => {},
    },
    isApi: {
      //是否渲染数据为动态数据
      type: Boolean,
      default: false,
    },
    params: {
      //请求接口参数
      type: Object,
      default: () => {},
    },
    interaction: {
      //交互模块
      type: Object,
      default: () => {},
    },
  },
  name: 'tabs',
  data() {
    return {
      tabsValue: '',
      tabsIndex: 0,
      option: [],
    };
  },
  watch: {
    options: {
      handler() {},
      deep: true,
    },
    params: {
      handler() {
        console.log('参数变化了:');
      },
      deep: true,
    },
    staticData: {
      handler() {
        if (!this.isApi) this.option = JSON.parse(this.staticData);
      },
      deep: true,
      immediate: true,
    },
    api() {
      if (this.isApi) this.request();
    },
  },
  methods: {
    /**
     * @description 设置交互请求参数
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/22
     */
    setValue(value, index) {
      this.tabsIndex = index;
      this.contain.coverage.forEach(item => {
        if (this.interaction.coverageId.includes(item.id)) {
          this.$set(item.apiModule.params, this.interaction.key, value);
        }
      });
    },
    /**
     * @description 请求接口
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/15
     */
    request(isVerify = true) {
      if ((!this.api.url || !this.api.type) && isVerify) {
        this.$message.error('请填写完成接口数据');
      }
      let data,
        headers = {};
      if (this.api.config) {
        [data, headers] = [JSON.parse(this.api.config).data, JSON.parse(this.api.config).headers];
        //获取token并携带
        if (JSON.parse(this.api.config).headers?.token) {
          const [stroe, key] = JSON.parse(this.api.config).headers?.token.split('.');
          switch (stroe) {
            case 'localStorage':
              headers[key] = localStorage.getItem(key);
              break;
            case 'Cookies':
              headers[key] = this.getCookie(key);
              break;
            default:
              break;
          }
        }
      }
      this.setCoverage(data);
      const params = this.contain.coverage[this.contain.coverageIndex].apiModule.params;
      const [type, url] = [this.api.type, this.api.url];
      this.$http(type, url, params, headers).then(res => {
        if (typeof this.dispose === 'function') {
          this.option = this.dispose(res.data);
        } else {
          this.option = res.data;
        }
      });
    },
    /**
     * @description 设置携带参数挂载成变量
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/25
     */
    setCoverage(obj) {
      this.$set(this.contain.coverage[this.contain.coverageIndex].apiModule, 'params', {});
      Object.keys(obj).forEach(item => {
        this.$set(this.contain.coverage[this.contain.coverageIndex].apiModule.params, item, obj[item]);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  display: flex;

  &-item {
    flex: 1;
    height: 100%;
    color: #ffffff;
    text-align: center;
    div {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
