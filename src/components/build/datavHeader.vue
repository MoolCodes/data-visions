<!--
 * @file: datavHeader.
 * @authors: yangj (yangjia@fjxhx.cc).
 * @createDate: 2021/9/28.
 * @version: 1.0.
 * @copyright © 2021 新和兴 All rights reserved.
 -->

<template>
  <div class="header">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#212528" text-color="#898a92" active-text-color="#409eff" @select="handleSelect">
      <el-submenu :index="String(index)" v-for="(item, index) in menuConfig" :key="index">
        <template slot="title"><i :class="item.icon"></i></template>
        <el-menu-item :index="index + '-' + idx" v-for="(cell, idx) in item.menuItem" :key="idx">
          <div class="item-box">
            <img :src="cell.img" alt="" />
            <div class="text">{{ cell.name }}</div>
          </div>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="operate">
      <el-tooltip class="operate-item" effect="dark" content="预览" placement="bottom">
        <i class="el-icon-view" @click="preview"></i>
      </el-tooltip>
      <el-tooltip class="operate-item" effect="dark" content="撤回" placement="bottom">
        <i class="el-icon-refresh-left" @click="lastStep"></i>
      </el-tooltip>
      <el-tooltip class="operate-item" effect="dark" content="恢复" placement="bottom">
        <i class="el-icon-refresh-right" @click="nextStep"></i>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import stack from '@/mixins/stack';
import * as config from '@/config/index';
import * as mock from '@/mock/index';

export default {
  name: 'datavHeader',
  mixins: [stack],
  inject: ['contain', '$this'],
  data() {
    return {
      activeIndex: '1',
      menuConfig: [
        {
          icon: 'el-icon-s-data',
          menuItem: [
            {
              type: 'custom',
              mockType: 'bar',
              name: '自定义图表',
              img: require('@/static/header/tonyon.png'),
              left: 0,
              top: 0,
              zIndex: 0,
              isEvent: true,
              isData: true,
              isRefresh: true,
              isCustom: true,
            },
            {
              type: 'barOne',
              mockType: 'bar',
              name: '柱形图',
              img: require('@/static/header/bar.png'),
              left: 0,
              top: 0,
              zIndex: 0,
              isEvent: true,
              isHint: true,
              isFormatter: true,
              isData: true,
              isRefresh: true,
            },
          ],
        },
        {
          icon: 'el-icon-pie-chart',
          menuItem: [
            {
              type: 'pieOne',
              name: '饼图',
              img: require('@/static/header/pie-simple.png'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
            {
              type: 'pieTwo',
              name: '动态饼图',
              img: require('@/static/header/pie-simple.png'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
          ],
        },
        {
          icon: 'el-icon-data-line',
          menuItem: [
            {
              type: 'lineOne',
              name: '折线图',
              img: require('@/static/header/line-simple.png'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
          ],
        },
        {
          icon: 'el-icon-date',
          menuItem: [
            {
              type: 'tableOne',
              name: '表格',
              img: require('@/static/header/table-simple.png'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
          ],
        },
        {
          icon: 'el-icon-menu',
          menuItem: [
            {
              type: 'tabs',
              mockType: 'tabs',
              name: '选项卡',
              img: require('@/static/header/tabs.png'),
              left: 0,
              top: 0,
              zIndex: 0,
              isData: true,
              isInteraction: true,
            },
            {
              type: 'textbox',
              name: '文本框',
              img: require('@/static/header/textbox.png'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
          ],
        },
        {
          icon: 'el-icon-files',
          menuItem: [
            {
              type: 'border1',
              name: '边框1',
              img: require('@/static/header/border1.jpg'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
            {
              type: 'border2',
              name: '边框2',
              img: require('@/static/header/border2.jpg'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
            {
              type: 'border3',
              name: '边框3',
              img: require('@/static/header/border3.jpg'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
            {
              type: 'border4',
              name: '边框4',
              img: require('@/static/header/border4.jpg'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
            {
              type: 'border5',
              name: '边框5',
              img: require('@/static/header/border5.jpg'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
            {
              type: 'border6',
              name: '边框6',
              img: require('@/static/header/border6.jpg'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
            {
              type: 'border7',
              name: '边框7',
              img: require('@/static/header/border7.jpg'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
            {
              type: 'border8',
              name: '边框8',
              img: require('@/static/header/border8.jpg'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
            {
              type: 'border9',
              name: '边框9',
              img: require('@/static/header/border9.jpg'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
            {
              type: 'border10',
              name: '边框10',
              img: require('@/static/header/border10.jpg'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
            {
              type: 'border11',
              name: '边框11',
              img: require('@/static/header/border11.jpg'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
            {
              type: 'border12',
              name: '边框12',
              img: require('@/static/header/border12.jpg'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
            {
              type: 'border13',
              name: '边框13',
              img: require('@/static/header/border13.jpg'),
              left: 0,
              top: 0,
              zIndex: 0,
            },
          ],
        },
      ],
    };
  },
  methods: {
    /**
     * @description 添加组件
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/9/29
     */
    handleSelect(e) {
      const [index, itemIndex] = [...e.split('-')];
      const obj = this.$util.deepClone(this.menuConfig[index].menuItem[itemIndex]);
      //添加响应属性
      this.$set(obj, 'id', obj.name + Date.parse(new Date()));
      this.$set(obj, 'ishighlight', false);
      this.$set(obj, 'resizaW', this.$util.deepClone(config.default[obj.type]).width.value); //挂载收缩框宽度默认高度在对象最外层,便于提取
      this.$set(obj, 'resizaH', this.$util.deepClone(config.default[obj.type]).height.value);
      if (obj.isEvent) {
        //事件
        this.$set(
          obj,
          'callbackModule',
          this.$util.deepClone({
            callback: null,
            callbackEditorValue: '',
          }),
        );
      }
      if (obj.isFormatter) {
        //数值处理
        this.$set(
          obj,
          'formatterModule',
          this.$util.deepClone({
            formatter: null,
            formatterEditorValue: '',
            formatterText: '默认',
          }),
        );
      }
      if (obj.isHint) {
        //提示语处理
        this.$set(
          obj,
          'hintModule',
          this.$util.deepClone({
            hint: null,
            hintEditorValue: '',
            hintText: '默认',
          }),
        );
      }
      if (obj.isData) {
        //是否需要数据模块
        this.$set(
          obj,
          'apiModule',
          this.$util.deepClone({
            isApi: false,
            dispose: null,
            disposeEditorValue: '',
            data: JSON.stringify(mock[obj.mockType]),
            api: { url: '/mock', type: 'get', config: '' },
            params: {},
          }),
        );
        if (obj.isRefresh) {
          //是否需要定时刷新组件
          this.$set(obj.apiModule, 'refreshTime', 15000);
        }
      }
      if (obj.isInteraction) {
        //绑定的图层（交互）
        this.$set(
          obj,
          'Interaction',
          this.$util.deepClone({
            coverageId: [],
            key: '',
          }),
        );
      }
      if (obj.isCustom) {
        this.$set(
          obj,
          'customModule',
          this.$util.deepClone({
            custom: this.$util.deepClone(config.default.customFn), //接口处理处理函数
            customEditorValue: this.$util.deepClone(config.default.customOption),
          }),
        );
      }
      this.$set(obj, 'moduleConfigForm', this.$util.deepClone(config.default[obj.type]));
      this.contain.coverage.push(obj);
    },
    preview() {
      //预览
      this.$this.view = true;
      console.log(this.contain);
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;

  ::v-deep .el-submenu__title {
    height: 40px !important;
    line-height: 40px !important;
  }

  .operate {
    display: flex;
    justify-content: space-around;

    .operate-item {
      padding: 0 10px;
    }

    i {
      font-size: 25px;
      cursor: pointer;
      color: #898a92;
      line-height: 40px;
    }
  }
}
</style>
