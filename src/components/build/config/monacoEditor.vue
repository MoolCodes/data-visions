<!--
 * @file: monacoEditor. 事件处理编辑器
 * @authors: yangj (yangjia@fjxhx.cc).
 * @createDate: 2021/10/11.
 * @version: 1.0.
 * @copyright © 2021 新和兴 All rights reserved.
 -->


<template>
  <div class="editor">
    <div class="operation-box" v-show="!isConfig">
      <div class="item" v-if="contain.coverage[contain.coverageIndex]&&contain.coverage[contain.coverageIndex].isEvent">
        <div class="label">
          <span>点击事件</span>
          <el-popover id="fields-explain" transition="fade-in-linear" placement="top" title="说明" width="200"
                      trigger="click" content="提供自定义点击事件执行逻辑">
            <i slot="reference" class="label-query el-icon-question"></i>
          </el-popover>
        </div>
        <span class="edit" @click="edit('callback')">编辑</span>
      </div>
      <div class="item" v-if="contain.coverage[contain.coverageIndex]&&contain.coverage[contain.coverageIndex].isHint">
        <div class="label">
          <span>提示事件</span>
          <el-popover id="fields-explain" placement="top" title="说明" width="200" trigger="click" content="提供自定义提示文本">
            <i slot="reference" class="label-query el-icon-question"></i>
          </el-popover>
        </div>
        <span class="edit" @click="edit('hint')">编辑</span>
      </div>
      <div class="item"
           v-if="contain.coverage[contain.coverageIndex]&&contain.coverage[contain.coverageIndex].isFormatter">
        <div class="label">
          <span>数值处理</span>
          <el-popover id="fields-explain" placement="top" title="说明" width="200" trigger="click" content="提供自定义数值显示文本">
            <i slot="reference" class="label-query el-icon-question"></i>
          </el-popover>
        </div>
        <span class="edit" @click="edit('formatter')">编辑</span>
      </div>
    </div>
    <div v-show="!isConfig" class="refresh" @click="refresh">刷新</div>
    <transition name="el-zoom-in-center">
      <div id="editorBox" v-if="showEditor">
        <div class="title">{{ title }}</div>
        <code-editor ref="container" id="container" width="800px" height="95%"
                     :value="editotValue" :readOnly="false" :type="editorType" @close="showEditor=false"></code-editor>
        <code-editor ref="reminder" id="reminder" width="500px" height="95%"
                     :value="defaultValue" language="java"></code-editor>
        <div class="btn-box">
          <el-button size="small" @click="showEditor=false">取消</el-button>
          <el-button size="small" type="primary" @click="getValue">确定</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'monacoEditor',
  inject: ['contain'],
  props: {
    isConfig: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: '事件处理编辑器',
      editor: null,//文本编辑器
      reminder: null,
      editotValue: '',
      defaultValue: '//data为返回的数据\n' +
        '/**\n' +
        ' * 说明：只有数据处理、组件事件方法需要返回函数\n' +
        ' * 静态数据或者配置数据直接返回JSON对象即可\n' +
        ' * 不写的话采用默认加载\n' +
        '*/\n' +
        '//数据处理\n' +
        '(data)=>{\n' +
        '  //处理数据逻辑\n' +
        '  return {}' + '//返回图表的标准数据结构体' +
        '\n' +
        '}\n\n' +
        '//自定义组件(如果用到echarts请用this.$echarts)\n' +
        '(data)=>{\n' +
        '  //处理数据逻辑\n' +
        '  return {}' + '//返回图表的option' +
        '\n' +
        '}\n\n' +
        '//事件处理\n' +
        '({name,type,value,data})=>{\n' +
        '  //直接写执行的逻辑即可\n' +
        '  console.log(data,name)\n' +
        '}\n\n'
        +
        '//提示处理(支持html)\n' +
        '(name,data)=>{\n' +
        '  return //返回需要展示的文本\n' +
        '}\n\n'
        +
        '//数值处理(不支持html)\n' +
        '(name,data)=>{\n' +
        '  return //返回需要展示的文本\n' +
        '}\n\n' +
        '//柱状图数据\n' +
        '{\n' +
        '    "categories": [\n' +
        '        "7月",\n' +
        '        "11月"\n' +
        '    ],\n' +
        '    "series": [\n' +
        '        {\n' +
        '            "name": "异常资金总额走势",\n' +
        '            "data": [\n' +
        '                25,\n' +
        '                345\n' +
        '            ]\n' +
        '        }\n' +
        '    ]\n' +
        '}',
      editorType: '',
      showEditor: false,
    }
  },
  methods: {
    /**
     * @description 刷新初始化事件
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/13
     */
    refresh() {
      if (this.contain.coverage[this.contain.coverageIndex].isEvent) {
        this.contain.coverage[this.contain.coverageIndex].callbackModule.callback = null
        this.contain.coverage[this.contain.coverageIndex].callbackModule.callbackEditorValue = ''
      }
      if (this.contain.coverage[this.contain.coverageIndex].isHint) {
        this.contain.coverage[this.contain.coverageIndex].hintModule.hint = null
        this.contain.coverage[this.contain.coverageIndex].hintModule.hintEditorValue = ''
      }
      if (this.contain.coverage[this.contain.coverageIndex].isFormatter) {
        this.contain.coverage[this.contain.coverageIndex].formatterModule.formatter = null
        this.contain.coverage[this.contain.coverageIndex].formatterModule.formatterEditorValue = ''
      }
      this.contain.coverage[this.contain.coverageIndex].apiModule.dataDispose = null
      this.contain.coverage[this.contain.coverageIndex].apiModule.dataEditorValue = ''
    },
    /**
     * @description 编辑
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/13
     */
    edit(key) {
      let itemKey = ''
      switch (key) {
        case 'callback' :
          itemKey = 'callbackModule'
          this.title = '事件自定义(处理点击事件执行逻辑)'
          break
        case 'hint' :
          itemKey = 'hintModule'
          this.title = '提示语自定义文本(返回提示语文本格式可以为html)'
          break
        case 'formatter':
          itemKey = 'formatterModule'
          this.title = '数值自定义文本(返回图表显示数值文本)'
          break
        case 'dispose':
          itemKey = 'apiModule'
          this.title = '接口数据格式处理(返回标准的结构体数据)'
          break
        case 'custom':
          itemKey = 'customModule'
          this.title = '自定义组件处理(返回option)'
          break
      }
      this.showEditor = true
      this.editorType = key
      this.editotValue = this.contain.coverage[this.contain.coverageIndex][itemKey][key + 'EditorValue']
    },
    getValue() {
      this.$refs.container.getValue()
    },
  }
}
</script>

<style lang="less" scoped>
#editorBox {
  position: fixed;
  width: 1300px;
  height: 600px;
  left: 50%;
  top: 10%;
  transform: translate(-50%, 0);
  z-index: 9999;
  border-radius: 10px;
  padding: 60px 50px 20px;
  display: flex;
  background: #1b1e25;

  .title {
    position: absolute;
    top: 10px;
    font-size: 16px;
    color: #ffffff;
  }
}

.label-query {
  margin-left: 10px;
  color: #eb5648;
  cursor: pointer;
  font-size: 16px;
}

.refresh {
  width: 80%;
  border: 1px solid #409eff;
  padding: 5px 10px;
  color: #409eff;
  cursor: pointer;
  margin: auto;
  text-align: center;
  border-radius: 5px;
}

.el-zoom-in-center-enter-active,
.el-zoom-in-center-leave-active {
  transition: all .5s cubic-bezier(.55, 0, .1, 1);
}

#container {
  width: 800px;
  height: 95%;
}

#reminder {
  width: 500px;
  height: 95%;
}

.btn-box {
  position: absolute;
  width: 1300px;
  height: 10%;
  bottom: 5%;
  background: #1e1e1e;
  text-align: right;
  padding-top: 10px;
  padding-right: 30px;
  box-sizing: border-box;
}

.operation-box {
  padding: 20px 30px;

  .item {
    color: #ffffff;
    font-size: 14px;
    margin-bottom: 30px;

    .label {
      display: inline-block;
      line-height: 16px;
    }

    .edit {
      border: 1px solid #409eff;
      padding: 5px 10px;
      color: #409eff;
      cursor: pointer;
      margin-left: 40px;
    }
  }
}

</style>
