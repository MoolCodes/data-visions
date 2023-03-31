<!--
 * @file: datavCharts.
 * @authors: yangj (yangjia@fjxhx.cc).
 * @createDate: 2021/9/28.
 * @version: 1.0.
 * @copyright © 2021 新和兴 All rights reserved.
 -->

<template>
  <div class="coverage">
    <div class="head">图层</div>
    <div class="coverage-box">
      <draggable v-model="contain.coverage" chosenClass="chosen" forceFallback="true" group="people" animation="300"
                 @sort="complete" @choose="choose">
        <transition-group>
          <div :class="['coverage-item', contain.coverageIndex === index ? 'active' : '']"
               v-for="(item, index) in contain.coverage" :key="index + item"
               @contextmenu.prevent="contextmenu($event, index)">
            <div class="icon">
              <i class="el-icon-edit"></i>
            </div>
            <span class="text">{{ item.moduleConfigForm.name.value }}</span>
          </div>
        </transition-group>
      </draggable>
    </div>

    <layer-operation ref="layerOperation"></layer-operation>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import stack from '@/mixins/stack'

export default {
  name: 'datavCharts',
  components: {
    draggable,
  },
  inject: ['contain'],
  mixins: [stack],
  data() {
    return {}
  },
  mounted() {
    console.log('this:', this.contain.coverage)
  },
  watch: {
    /**
     * @description 层级处理
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/9/28
     */
    'contain.coverage': {
      handler: function () {
        this.contain.coverage.forEach((item, index) => {
          this.$set(item, 'zIndex', this.contain.coverage.length - index)
        })
        if (this.isOperate) {
          this.setIsoperate(false)
        } else {
          this.addOperation('coverage', this.$util.deepClone(this.contain.coverage))
        }
      },
    },
  },
  methods: {
    /**
     * @description 鼠标右击改写
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/9/28
     */
    contextmenu(e, index) {
      this.contain.coverageIndex = index
      this.sethighlight(index)
      this.$refs.layerOperation.menuShow = true
      this.$refs.layerOperation.menuTop = e.layerY
      this.$refs.layerOperation.mentLeft = e.layerX
    },
    /**
     * @description
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/9/28
     */
    sethighlight(index) {
      this.contain.coverage.forEach(item => (item.ishighlight = false))
      this.contain.coverage[index].ishighlight = true
      this.$emit('updateSize')
    },
    /**
     * @description 重新排序后高亮保持
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/9/28
     */
    complete(e) {
      this.contain.coverageIndex = e.newDraggableIndex
      this.sethighlight(e.newDraggableIndex)
    },
    /**
     * @description 选中菜单高亮
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/9/28
     */
    choose(e) {
      this.$emit('charts-active')
      this.contain.coverageIndex = e.oldDraggableIndex
      this.sethighlight(e.oldDraggableIndex)
    },
  },
}
</script>

<style lang="less" scoped>
.coverage {
  height: 100%;
  background-color: #1b1f25;
  position: relative;

  &-box {
    height: calc(100% - 40px);
    overflow: auto;
  }

  .head {
    width: 100%;
    text-align: center;
    color: #ffffff;
    font-size: 15px;
    background-color: #2d343c99;
    height: 40px;
    line-height: 40px;
  }

  .active {
    background-color: #409eff !important;
  }

  .menu {
    position: absolute;
    width: 150px;
    background-color: #27343e;
    color: #bcc8d4;
    border-radius: 5px;
    font-size: 13px;

    &-item {
      padding: 5px 10px;
      cursor: pointer;

      i {
        font-size: 16px;
        margin-right: 5px;
      }
    }

    &-item:hover {
      background-color: #23434f;
    }
  }

  &-item:hover {
    background-color: #29333c;
  }

  &-item {
    padding: 10px 10px;
    width: 100%;
    box-sizing: border-box;
    color: #bcc8d4;
    font-size: 13px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .icon {
      color: #409eff;
      margin-right: 10px;
      width: 50px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      display: block;
      border: 1px solid #3a4659;
      background: #282a30;
    }
  }
}
</style>
