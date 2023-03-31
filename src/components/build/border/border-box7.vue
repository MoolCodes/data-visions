<!--
 * @file: border-box.
 * @authors: yangj (yangjia@fjxhx.cc).
 * @createDate: 2021/10/19.
 * @version: 1.0.
 * @copyright © 2021 新和兴 All rights reserved.
 -->

<template>
  <div>
    <dv-border-box-7 :id="id" :color="borderColor" :backgroundColor="options.bgColor.value" :key="key" :style="{ width: options.width.value + 'px', height: options.height.value + 'px' }"></dv-border-box-7>
  </div>
</template>
<script>
export default {
  name: 'border7',
  props: {
    id: {
      type: String,
      default: 'test',
    },
    options: {},
  },
  watch: {
    options: {
      handler(newVal) {
        this.borderColor = newVal.color.data.map(item => {
          return item.value;
        });
        this.$nextTick(() => {
          this.key = !this.key;
        });
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  data() {
    return {
      key: false,
      borderColor: [],
    };
  },
};
</script>
