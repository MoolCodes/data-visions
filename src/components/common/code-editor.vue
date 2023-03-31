<!--
 * @Descripttion: 代码编辑器
 * @Author: Li Yuyuan
 * @Date: 2021-10-21 17:27:28
-->
<template>
  <div ref="editorContainer" :id="id" :style="{ width: width, height: height }"></div>
</template>
<script>
import * as monaco from 'monaco-editor';

export default {
  name: 'codeEditor',
  inject: ['contain'],
  props: {
    // 编辑器中呈现的内容
    id: {
      type: String,
      default: () => 'monaco-editor',
    },
    width: {
      type: String,
      default: () => '100%',
    },
    height: {
      type: String,
      default: () => '100%',
    },
    value: {
      type: String,
      default: () => '',
    },
    readOnly: {
      type: Boolean,
      default: () => true,
    },
    language: {
      type: String,
      default: () => 'javascript',
    },
    type: {
      type: String,
    },
    // 主要配置
    editorOptions: {
      type: Object,
      default: function() {
        return {
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: this.readOnly, // 只读
          cursorStyle: 'line', // 光标样式
          automaticLayout: false, // 自动布局
          glyphMargin: true, // 字形边缘
          useTabStops: false,
          fontSize: 28, // 字体大小
          autoIndent: true, // 自动布局
        };
      },
    },
  },
  watch: {
    value() {
      this.monacoEditor.setValue(this.value);
    },
  },
  data() {
    return {
      monacoEditor: null, //代码编辑器
    };
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    /**
     * @description 初始化编辑器
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/13
     */
    initEditor() {
      this.monacoEditor = monaco.editor.create(this.$refs.editorContainer, {
        value: this.value, // 编辑器中的文本，见props
        language: this.language,
        theme: 'vs-dark', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
        editorOptions: this.editorOptions, // 见props
      });

      this.monacoEditor.onKeyUp(() => {
        // 当键盘抬起，自动格式化代码
        this.monacoEditor.trigger('anyString', 'editor.action.formatDocument'); //自动格式化代码
      });
    },
    /**
     * @description 处理并获取编辑器的值
     * @author: yangj (yangjia@fjxhx.cc)
     * @createDate: 2021/10/22
     */
    getValue() {
      const that = this;
      this.monacoEditor.setValue(this.monacoEditor.getValue()); //再次设置
      if (this.type === 'array') {
        let codeValue = this.monacoEditor.getValue();
        return eval(codeValue);
      } else if (this.type === 'custom') {
        this.monacoEditor
          .getValue()
          .replaceAll(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '')
          .replaceAll(/[\r\n]/g, '')
          .replace(/\(data\)[\s]=>[\s]\{(.*)\}/g, function(val, ...arr) {
            that.contain.coverage[that.contain.coverageIndex].customModule.custom = null;
            const js = arr[0].split('return')[0]; //eslint-disable-line
            const returnJS = arr[0].split('return')[1]; //eslint-disable-line
            that.contain.coverage[that.contain.coverageIndex].customModule.customEditorValue = that.monacoEditor.getValue();
            that.contain.coverage[that.contain.coverageIndex].customModule.custom = data => {
              //eslint-disable-line
              const obj = new Function('data', arr[0].replaceAll('return', ';return')).call(that, data);
              return obj;
              // eval(js)
              // return eval("("+returnJS+")")
            };
            that.$emit('close');
          });
      } else if (this.type === 'dispose') {
        this.monacoEditor
          .getValue()
          .replaceAll(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '')
          .replaceAll(/[\r\n]/g, '')
          .replace(/\(data\)[\s]=>[\s]\{(.*)\}/g, function(val, ...arr) {
            that.contain.coverage[that.contain.coverageIndex].apiModule.dispose = null;
            that.contain.coverage[that.contain.coverageIndex].apiModule.disposeEditorValue = that.monacoEditor.getValue();
            that.contain.coverage[that.contain.coverageIndex].apiModule.dispose = data => {
              //eslint-disable-line
              const obj = new Function('data', arr[0].replaceAll('return', ';return'))(data);
              return obj;
            };
            that.$emit('close');
          });
      } else if (this.type === 'formatter') {
        this.monacoEditor
          .getValue()
          .replaceAll(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '')
          .replaceAll(/[\r\n]/g, '')
          .replace(/\(name,[\s]data\)[\s]=>[\s]\{(.*?)\}/g, function(val, ...arr) {
            const js = arr[0].replaceAll(/\/\/[\u4e00-\u9fa5]+/g, '').replaceAll('return', '');
            that.contain.coverage[that.contain.coverageIndex].formatterModule.formatter = null;
            var name = ''; //eslint-disable-line
            var data = ''; //eslint-disable-line
            try {
              eval(js); //防止eval报错后，echarts提示处理事件报错（暂时这么处理）
              that.contain.coverage[that.contain.coverageIndex].formatterModule.formatterText = js;
              that.contain.coverage[that.contain.coverageIndex].formatterModule.formatter = ({ name, data }) => {
                //eslint-disable-line
                console.log(name, data);
                return eval(js);
              };
              that.$emit('close');
              that.contain.coverage[that.contain.coverageIndex].formatterModule.formatterEditorValue = that.monacoEditor.getValue();
            } catch (err) {
              that.$message.error('代码错误');
            }
          });
      } else if (this.type === 'hint') {
        this.monacoEditor
          .getValue()
          .replaceAll(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '')
          .replaceAll(/[\r\n]/g, '')
          .replace(/\(name,[\s]data\)[\s]=>[\s]\{(.*?)\}/g, function(val, ...arr) {
            const js = arr[0].replaceAll(/\/\/[\u4e00-\u9fa5]+/g, '').replaceAll('return', '');
            that.contain.coverage[that.contain.coverageIndex].hintModule.hint = null;
            var name = ''; //eslint-disable-line
            var data = ''; //eslint-disable-line
            try {
              eval(js); //防止eval报错后，echarts提示处理事件报错（暂时这么处理）
              that.contain.coverage[that.contain.coverageIndex].hintModule.hintText = js;
              that.contain.coverage[that.contain.coverageIndex].hintModule.hint = ({ name, data }) => {
                //eslint-disable-line
                console.log(name, data);
                return eval(js);
              };
              that.$emit('close');
              that.contain.coverage[that.contain.coverageIndex].hintModule.hintEditorValue = that.monacoEditor.getValue();
            } catch (err) {
              that.$message.error('代码错误');
            }
          });
      } else if (this.type === 'callback') {
        this.monacoEditor
          .getValue()
          .replaceAll(/[\r\n]/g, ';')
          .replace(/\(\{[\s]name,[\s]type,[\s]value,[\s]data[\s]}\)[\s]=>[\s]\{(.*?)\}/g, function(val, ...arr) {
            const js = arr[0].replaceAll(/\/\/[\u4e00-\u9fa5]+/g, '');
            that.contain.coverage[that.contain.coverageIndex].callbackModule.callback = null;
            that.contain.coverage[that.contain.coverageIndex].callbackModule.callback = ({ name, type, value, data }) => {
              //eslint-disable-line
              console.log(name, type, value, data);
              eval(js);
            };
            that.$emit('close');
            that.contain.coverage[that.contain.coverageIndex].callbackModule.callbackEditorValue = that.monacoEditor.getValue();
          });
      } else {
        return this.monacoEditor.getValue();
      }
    },
  },
};
</script>
<style lang="less"></style>
