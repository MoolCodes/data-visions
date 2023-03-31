<!--
 * @Descripttion:画布区域
 * @Author: Li Yuyuan
 * @Date: 2021-09-29 12:20:40
-->
<template>
  <div class="canvas-container">
    <div class="wrapper" id="wrapper">
      <SketchRule
        :lang="lang"
        :thick="thick"
        :scale="scale"
        :width="width"
        :height="height"
        :startX="startX"
        :startY="startY"
        :shadow="shadow"
        :horLineArr="lines.h"
        :verLineArr="lines.v"
        :cornerActive="true"
        :isShowRuler="isShowRuler"
        :isShowReferLine="isShowReferLine"
        :palette="palette"
        @handleLine="handleLine"
        @onCornerClick="handleCornerClick"
      >
      </SketchRule>
      <div ref="screensRef" id="screens" @wheel="handleWheel" @scroll="handleScroll">
        <div ref="containerRef" class="screen-container">
          <div id="canvas" class="canvas" ref="canvasRef" :style="canvasStyle" @click.self="canvasClick('bg')">
            <transition-group name="fade">
              <div
                :class="['com-box', contain.coverageIndex === idx ? 'active' : '']"
                v-for="(element, idx) in contain.coverage"
                :key="idx + element"
                :style="{ zIndex: element.zIndex }"
                @mousedown="chartsActive(idx)"
                @contextmenu.prevent="contextmenu($event)"
              >
                <vue-draggable-resizable v-show="!element.moduleConfigForm.hide.value" :scale="scale" :parent="true" :x="element.left" :y="element.top" :w="element.resizaW" :h="element.resizaH" @dragging="onDrag" @resizing="onResize">
                  <component
                    :ref="element.type + idx"
                    :is="element.type"
                    :id="element.id"
                    :refreshTime="element.apiModule && element.apiModule.refreshTime"
                    :options="element.moduleConfigForm"
                    :interaction="element.Interaction"
                    :api="element.apiModule && element.apiModule.api"
                    :isApi="element.apiModule && element.apiModule.isApi"
                    :custom="element.customModule && element.customModule.custom"
                    :customEditorValue="element.customModule && element.customModule.customEditorValue"
                    :staticData="element.apiModule && element.apiModule.data"
                    :params="element.apiModule && element.apiModule.params"
                    :callback="element.callbackModule && element.callbackModule.callback"
                    :dispose="element.apiModule && element.apiModule.dispose"
                    :formatter="element.formatterModule && element.formatterModule.formatter"
                    :hint="element.hintModule && element.hintModule.hint"
                  ></component>
                </vue-draggable-resizable>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
    <div class="lateral-toolbar">
      <span class="toolbar-item el-icon-aim" @click="alignCenter"></span>
      <span class="toolbar-item el-icon-plus" @click="addScale"></span>
      <span class="toolbar-item el-icon-minus" @click="lessScale"></span>
    </div>
  </div>
</template>
<script>
import SketchRule from 'vue-sketch-ruler';
import VueDraggableResizable from '../common/vue-draggable-resizable';
export default {
  name: 'datavCanvas',
  inject: ['contain', '$this'],
  data() {
    return {
      scale: 0.7, //658813476562495, //1 初始化标尺的缩放
      startX: 0, //x轴标尺开始的坐标数值
      startY: 0, //y轴标尺开始的坐标数值
      lines: {
        h: [0, 0],
        v: [0, 0],
      },
      thick: 20, //标尺的厚度
      width: 500, //放置标尺窗口的宽度
      height: 400, //放置标尺窗口的高度
      lang: 'zh-CN', // 中英文
      isShowRuler: true, // 显示标尺
      isShowReferLine: false, // 显示参考线
      palette: { bgColor: 'rgba(225,225,225, 0)', longfgColor: '#BABBBC', shortfgColor: '#C8CDD0', fontColor: '#7D8694', shadowColor: '#E8E8E8', lineColor: '#EB5648', borderColor: '#DADADC', cornerActiveColor: 'rgb(235, 86, 72, 0.6)' },
    };
  },
  components: {
    SketchRule,
    VueDraggableResizable,
  },
  watch: {
    //设置left top值，坐标线跟随（指令拖拽）
    // elementPos: {
    //   handler(val) {
    //     if (val.left !== null) {
    //       this.lines.h = [parseInt(val.left), parseInt(val.left) + val.width];
    //       this.lines.v = [parseInt(val.top), parseInt(val.top) + val.height];
    //       setTimeout(() => {
    //         //延迟等待coverageIndex赋值成功
    //         this.contain.coverage[this.contain.coverageIndex].left = parseInt(val.left);
    //         this.contain.coverage[this.contain.coverageIndex].top = parseInt(val.top);
    //       }, 300);
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    'contain.updateLine': function() {
      console.log('update');
      //组件宽度或者高度改变坐标线跟随
    },
  },
  computed: {
    shadow() {
      return {
        x: 0,
        y: 0,
        width: this.contain.containerForm.width,
        height: this.contain.containerForm.height,
      };
    },
    canvasStyle() {
      return {
        width: this.contain.containerForm.width + 'px',
        height: this.contain.containerForm.height + 'px',
        transform: `scale(${this.scale})`,
        background: `${this.contain.containerForm.bgColor} url(${this.contain.containerForm.bgSrc}) no-repeat center`,
      };
    },
  },
  mounted() {
    // 滚动居中
    this.alignCenter();
  },
  methods: {
    //窗口放大缩小
    onResize(x, y, width, height) {
      this.lines.h = [x, x + width];
      this.lines.v = [y, y + height];
      this.contain.coverage[this.contain.coverageIndex].left = x;
      this.contain.coverage[this.contain.coverageIndex].top = y;
      this.contain.coverage[this.contain.coverageIndex].moduleConfigForm.width.value = width;
      this.contain.coverage[this.contain.coverageIndex].moduleConfigForm.height.value = height;
    },
    //拖拽
    onDrag(x, y) {
      this.contain.coverage[this.contain.coverageIndex].left = x;
      this.contain.coverage[this.contain.coverageIndex].top = y;
      this.lines.h = [x, x + this.contain.coverage[this.contain.coverageIndex].moduleConfigForm.width.value];
      this.lines.v = [y, y + this.contain.coverage[this.contain.coverageIndex].moduleConfigForm.height.value];
    },
    upadteResize() {
      let x, y;
      this.contain.coverage[this.contain.coverageIndex].resizaW = this.contain.coverage[this.contain.coverageIndex].moduleConfigForm.width.value;
      this.contain.coverage[this.contain.coverageIndex].resizaH = this.contain.coverage[this.contain.coverageIndex].moduleConfigForm.height.value;
      [x, y] = [this.contain.coverage[this.contain.coverageIndex].left, this.contain.coverage[this.contain.coverageIndex].top];
      this.onResize(x, y, this.contain.coverage[this.contain.coverageIndex].resizaW, this.contain.coverage[this.contain.coverageIndex].resizaH);
    },
    handleLine(lines) {
      this.lines = lines;
    },
    handleCornerClick() {
      return;
    },
    handleScroll() {
      const screensRect = document.querySelector('#screens').getBoundingClientRect();
      const canvasRect = document.querySelector('#canvas').getBoundingClientRect();
      // 标尺开始的刻度
      const startX = (screensRect.left + this.thick - canvasRect.left) / this.scale;
      const startY = (screensRect.top + this.thick - canvasRect.top) / this.scale;
      this.startX = startX >> 0;
      this.startY = startY >> 0;
    },
    // 控制缩放值
    handleWheel(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const nextScale = parseFloat(Math.max(0.2, this.scale - e.deltaY / 500).toFixed(2));
        this.scale = nextScale;
      }
      this.$nextTick(() => {
        this.handleScroll();
      });
    },
    initSize() {
      const wrapperRect = document.querySelector('#wrapper').getBoundingClientRect();
      const borderWidth = 1;
      this.width = wrapperRect.width - this.thick - borderWidth;
      this.height = wrapperRect.height - this.thick - borderWidth;
    },
    alignCenter() {
      //画布居中
      this.$refs.screensRef.scrollLeft = this.$refs.containerRef.getBoundingClientRect().width / 2 - this.$refs.screensRef.offsetWidth / 2; // 300 = #screens.width / 2
      this.$refs.screensRef.scrollTop = this.$refs.containerRef.getBoundingClientRect().height / 2 - this.$refs.screensRef.offsetHeight / 2; // 300 = #screens.height / 2
      this.$nextTick(() => {
        this.initSize();
      });
    },
    addScale() {
      //放大
      this.scale += 0.05;
      this.handleScroll();
      this.handleWheel();
    },
    lessScale() {
      //缩小
      this.scale -= 0.05;
      this.handleScroll();
      this.handleWheel();
    },
    /**
     * @description
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/22
     * @param type 图库类型
     */
    canvasClick(type) {
      //鼠标点击画布区域
      this.isShowReferLine = false;
      this.$emit('canvas-click', type);
    },
    chartsActive(idx) {
      //鼠标左键在图表组件上按下
      this.contain.coverageIndex = idx;
      this.isShowReferLine = true;
      this.$emit('charts-active');
    },
    contextmenu(e) {
      /**
       * @name: 鼠标右击
       */

      this.$this.$refs.datavCharts.$refs.layerOperation.menuShow = true;
      let iLeft = e.pageX + 10;
      let iTop = e.pageY - 20;
      if (iTop > 730) {
        iTop = 660;
      }
      this.$this.$refs.datavCharts.$refs.layerOperation.mentLeft = iLeft;
      this.$this.$refs.datavCharts.$refs.layerOperation.menuTop = iTop;
    },
  },
};
</script>
<style lang="less" scoped>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  overflow: hidden;
}
body * {
  box-sizing: border-box;
  user-select: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.canvas-container {
  height: 100%;
  background-color: #32333a;
  position: relative;

  .wrapper {
    background-color: #32333a;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid #dadadc;
  }
  #screens {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.3) 5%, rgba(0, 0, 0, 0) 5%), linear-gradient(rgba(255, 255, 255, 0.3) 5%, rgba(0, 0, 0, 0) 5%);
    background-size: 18px 18px;
  }
  .screen-container {
    position: absolute;
    width: 5000px;
    height: 3000px;
  }
  .scale-value {
    position: absolute;
    left: 0;
    bottom: 100%;
  }
  .button {
    position: absolute;
    left: 100px;
    bottom: 100%;
  }
  .button-ch {
    position: absolute;
    left: 200px;
    bottom: 100%;
  }
  .button-en {
    position: absolute;
    left: 230px;
    bottom: 100%;
  }
  #canvas {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background-size: 100% 100% !important;
    ::v-deep .handle {
      width: 15px;
      height: 15px;
      background: #eee;
      border: 1px solid #333;
    }
    .com-box:hover {
      background-color: #409eff55;
    }
    .com-box {
      position: absolute;
      top: 0px;
      left: 0px;
      width: auto !important;
      display: inline-block !important;
      ::v-deep .vdr {
        border: none;
      }
    }
    .active {
      background-color: #409eff55;
    }
  }
  .lateral-toolbar {
    position: absolute;
    right: 16px;
    bottom: 30px;
    display: flex;
    flex-direction: column;

    .toolbar-item {
      width: 30px;
      height: 30px;
      background: #ffffff;
      font-size: 14px;
      font-weight: 600;
      color: #3a3939;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      margin-bottom: 8px;
      cursor: pointer;
    }
  }

  ::v-deep #mb-ruler .ruler {
    background: #212528;
  }

  ::v-deep #mb-ruler .action span {
    font-size: 14px;
    color: #ffffff;
  }
}
</style>
