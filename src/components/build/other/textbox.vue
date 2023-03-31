<!--
 * @Descripttion:文本框
 * @Author: Li Yuyuan
 * @Date: 2021-10-25 17:00:40
-->
<template>
  <div class="textbox" :style="textStyle" :id="id" v-text="text"></div>
</template>
<script>
export default {
  name: 'textbox',
  props: {
    id: {
      type: String,
      default: 'test',
    },
    options: {},
  },
  data() {
    return {};
  },
  computed: {
    text() {
      return this.options.text.value;
    },
    textStyle() {
      return {
        width: this.options.width.value + 'px',
        height: this.options.height.value + 'px',
        fontSize: this.options.fontSize.value + 'px',
        color: this.options.color.value,
        fontWeight: this.options.fontWeight.value,
        lineHeight: this.options.lineHeight.value + 'px',
        textAlign: this.options.textAlign.value,
        letterSpacing: this.options.letterSpacing.value + 'px',
        textIndent: this.options.textIndent.value + 'em',
        fontStyle: this.options.fontStyle.value,
        whiteSpace: this.options.whiteSpace.value,
      };
    },
  },
};
</script>
<style lang="less">
// .textbox {
// }
</style>
