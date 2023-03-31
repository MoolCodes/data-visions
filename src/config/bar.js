/**
 * @file: bar.
 * @authors: yangj (yangjia@fjxhx.cc).
 * @createDate: 2021/10/9.
 * @version: 1.0.
 * @copyright © 2021 新和兴 All rights reserved.
 */
export const barOne = { //组件容器实例对象
  name: { //图层名称
    label: '图层名称',
    type: 'input',
    value: '柱状图'
  },
  hide: { //显示隐藏
    label: '隐藏',
    type: 'switch',
    value: false
  },
  vertical: { //显示隐藏
    label: '竖展示',
    type: 'switch',
    value: false
  },
  width: {
    label: '宽度',
    type: 'slider',
    value: 400,
    max: 1920
  },
  height: {
    label: '高度',
    type: 'slider',
    value: 300,
    max: 1080
  },
  barConfig: {
    collapseLabel: '柱体设置',
    config: {
      width: {
        label: '柱体宽度',
        type: 'slider',
        value: 15,
        max: 50
      },
      radius: {
        label: '圆角',
        type: 'slider',
        value: 40,
        max: 50
      },
      height: {
        label: '最小高度',
        type: 'slider',
        value: 40,
        max: 200
      },
      barGap: {
        label: '多柱体间隔',
        type: 'slider',
        value: 30,
        max: 100
      },
    }
  },
  titleConfig: {
    collapseLabel: '标题设置',
    config: {
      hide: {
        label: '标题',
        type: 'switch',
        value: false
      },
      text: {
        label: '标题',
        type: 'input',
        value: '标题'
      },
      fontSize: { //字体颜色
        label: '字体大小',
        type: 'number',
        value: 16
      },
      fontColor: { //字体颜色
        label: '字体颜色',
        type: 'color',
        value: '#ffffff'
      },
      fontSite: {
        label: '字体位置',
        type: 'select',
        value: 'right',
        options: [{
          value: 'center',
          label: '居中'
        }, {
          value: 'left',
          label: '左对齐'
        }, {
          value: 'right',
          label: '右对齐'
        }]
      },
    }
  },
  gridConfig: {
    collapseLabel: '坐标轴边距设置',
    config: {
      left: {
        label: '左边距',
        type: 'slider',
        value: 40,
        max: 200
      },
      top: {
        label: '顶边距',
        type: 'slider',
        value: 40,
        max: 200
      },
      right: {
        label: '右边距',
        type: 'slider',
        value: 40,
        max: 200
      },
      bottom: {
        label: '底边距',
        type: 'slider',
        value: 40,
        max: 200
      }
    }
  },
  xConfig: {
    collapseLabel: 'X轴设置',
    config: {
      show: {
        label: '显示',
        type: 'switch',
        value: true
      },
      inverse: {
        label: '轴反转',
        type: 'switch',
        value: false
      },
      line: {
        label: '坐标线',
        type: 'switch',
        value: false
      },
      grid: {
        label: '网格线',
        type: 'switch',
        value: false
      },
      gridColor: {
        label: '网格线颜色',
        type: 'color',
        value: '#ffffff'
      },
      gridType: {
        label: '网格线类型',
        type: 'select',
        value: 'solid',
        options: [{
          value: 'solid',
          label: '实线'
        }, {
          value: 'dashed',
          label: '虚线'
        }, {
          value: 'dotted',
          label: '点线'
        }]
      },
      tick: {
        label: '坐标刻度',
        type: 'switch',
        value: false
      },
      fontSize: { //字体颜色
        label: '字体大小',
        type: 'number',
        value: 16
      },
      fontColor: { //字体颜色
        label: '字体颜色',
        type: 'color',
        value: '#ffffff'
      }
    }
  },
  yConfig: {
    collapseLabel: 'Y轴设置',
    config: {
      show: {
        label: '显示',
        type: 'switch',
        value: true
      },
      inverse: {
        label: '轴反转',
        type: 'switch',
        value: false
      },
      line: {
        label: '坐标线',
        type: 'switch',
        value: false
      },
      grid: {
        label: '网格线',
        type: 'switch',
        value: true
      },
      gridColor: {
        label: '网格线颜色',
        type: 'color',
        value: '#ffffff'
      },
      gridType: {
        label: '网格线类型',
        type: 'select',
        value: 'solid',
        options: [{
          value: 'solid',
          label: '实线'
        }, {
          value: 'dashed',
          label: '虚线'
        }, {
          value: 'dotted',
          label: '点线'
        }]
      },
      tick: {
        label: '坐标刻度',
        type: 'switch',
        value: false
      },
      fontSize: { //字体颜色
        label: '字体大小',
        type: 'number',
        value: 16
      },
      fontColor: { //字体颜色
        label: '字体颜色',
        type: 'color',
        value: '#ffffff'
      }
    }
  },
  labelConfig: {
    collapseLabel: '数值设置',
    config: {
      show: {
        label: '显示',
        type: 'switch',
        value: true
      },
      label:{ //文本编辑
        label: '文本编辑',
        type: 'editor',
        field:'formatterText'
      },
      fontSize: { //字体颜色
        label: '字体大小',
        type: 'number',
        value: 16
      },
      fontColor: { //字体颜色
        label: '字体颜色',
        type: 'color',
        value: '#ffffff'
      },
      fontWeight: {
        label: '字体粗细',
        type: 'select',
        value: 'normal',
        options: [{
          value: 'normal',
          label: 'normal'
        }, {
          value: 'blod',
          label: 'bold'
        }, {
          value: 'bolder',
          label: 'bolder'
        }, {
          value: 'lighter',
          label: 'lighter'
        }]
      }
    }
  },
  tooltipConfig: {
    collapseLabel: '提示语设置',
    config: {
      show: {
        label: '显示',
        type: 'switch',
        value: true
      },
      label:{ //文本编辑
        label: '文本编辑',
        type: 'editor',
        field:'hintText'
      },
      backgroundColor: { //字体颜色
        label: '背景颜色',
        type: 'color',
        value: '#ffffff'
      },
      fontSize: { //字体颜色
        label: '字体大小',
        type: 'number',
        value: 16
      },
      fontColor: { //字体颜色
        label: '字体颜色',
        type: 'color',
        value: '#000000'
      },
    }
  }
}
