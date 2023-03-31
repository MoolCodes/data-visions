<!--
 * @Descripttion:
 * @Author: Li Yuyuan
 * @Date: 2021-09-29 12:21:05
-->
<template>
  <div class="config-container">
    <p class="config-title">{{ title }}</p>
    <ul class="config-nav" v-if="showBackground">
      <li v-for="item in navList.slice(0, 1)" :key="item.id"
          :class="item.id === tabIndex ? 'nav-active ' + item.icon : item.icon" @click="tabClick(item.id)"></li>
    </ul>

    <ul v-else class="config-nav">
      <li v-for="item in navList" :key="item.id" :class="item.id === tabIndex ? 'nav-active ' + item.icon : item.icon"
          @click="tabClick(item.id)"></li>
    </ul>

    <div class="config-main">
      <Container :type="type" v-show="showBackground && tabIndex === 1"/>
      <configuration-form ref="configurationForm" v-show="!showBackground && tabIndex === 1"
                          @updateSize="$emit('updateSize')"></configuration-form>
      <monaco-editor ref="editor" v-show="toConfig || tabIndex === 3" :isConfig="toConfig"></monaco-editor>
      <data-edition
        v-show="contain.coverage[contain.coverageIndex] && contain.coverage[contain.coverageIndex].isData && tabIndex === 2"></data-edition>
      <interaction
        v-show="contain.coverage[contain.coverageIndex] && contain.coverage[contain.coverageIndex].isInteraction && tabIndex === 4"></interaction>
    </div>

    <div class="hide-box">
      <i class="el-icon-arrow-left" v-show="hide" @click="showBox"></i>
      <i class="el-icon-arrow-right" v-show="!hide" @click="hideBox"></i>
    </div>
  </div>
</template>
<script>
import Container from '@/components/build/config/container.vue' //画布容器配置
import configurationForm from '@/components/build/config/configurationForm' //组件配置容器
import monacoEditor from '@/components/build/config/monacoEditor' //事件编辑器
import dataEdition from '@/components/build/config/dataEdition' //数据模块
import interaction from '@/components/build/config/interaction' //交互
export default {
  name: 'datavConfig',
  inject: ['contain', '$this'],
  provide() {
    return {
      openEditor: this.openEditor,
    }
  },
  data() {
    return {
      title: '配置',
      activeName: 'second',
      type: '', //图库类型
      showBackground: true,
      toConfig: false,
      tabIndex: 1,
      hide: false,
      navList: [
        {
          icon: 'el-icon-setting',
          title: '配置',
          id: 1,
        },
      ],
    }
  },
  components: {
    Container,
    configurationForm,
    monacoEditor,
    dataEdition,
    interaction,
  },
  watch: {
    'contain.coverageIndex': {
      handler() {
        this.navList = [
          {
            icon: 'el-icon-setting',
            title: '配置',
            id: 1,
          },
        ]
        if (this.contain.coverage[this.contain.coverageIndex]) {
          if (this.contain.coverage[this.contain.coverageIndex].isInteraction) {
            this.navList.push({
              icon: 'el-icon-thumb',
              title: '交互',
              id: 4,
            })
          }
          if (this.contain.coverage[this.contain.coverageIndex].isData) {
            this.navList.push({
              icon: 'el-icon-tickets',
              title: '操作',
              id: 2,
            })
          }
          if (this.contain.coverage[this.contain.coverageIndex].isHint || this.contain.coverage[this.contain.coverageIndex].isEvent || this.contain.coverage[this.contain.coverageIndex].isFormatter) {
            this.navList.push({
              icon: 'el-icon-mouse',
              title: '事件',
              id: 3,
            })
          }
        }
      },
      deep: true,
      immediate: false,
    },
  },
  methods: {
    tabClick(id) {
      this.tabIndex = id
      if (id === 3) {
        this.toConfig = false
      }
      this.title = this.navList.find(item => item.id === id).title
    },
    /**
     * @description 编辑器
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/15
     * @param type 编辑器类型
     */
    openEditor(type) {
      this.toConfig = true
      this.$refs.editor.edit(type)
    },
    showBox() {
      this.hide = false
      this.$this.$refs.configContainer.style.width = '450px'
    },
    hideBox() {
      this.hide = true
      this.$this.$refs.configContainer.style.width = 0
    },
  },
}
</script>
<style lang="less" scoped>
-webkit-scrollbar {
  height: 0 !important;
}

.config-container {
  height: 100%;
  position: relative;

  .config-title {
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    line-height: 42px;
  }

  .config-nav {
    background-color: #2a2a31;
    display: flex;

    li {
      flex: 1;
      color: #ffffff;
      text-align: center;
      line-height: 36px;
      cursor: pointer;
    }

    .nav-active {
      background-color: #3480cc;
    }
  }

  .config-main {
    height: calc(100% - 80px);
    overflow-y: auto;
  }

  .hide-box {
    position: absolute;
    top: 50%;
    left: -18px;
    transform: translateY(-50%);

    i {
      width: 18px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      background-color: #ffffff;
      color: #2a2a31;
      border-radius: 4px 0 0 4px;
      display: inline-block;
      cursor: pointer;
    }
  }
}
</style>
