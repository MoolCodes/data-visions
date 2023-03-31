/**
 * @file: custom.
 * @authors: yangj (yangjia@fjxhx.cc).
 * @createDate: 2021/10/20.
 * @version: 1.0.
 * @copyright © 2021 新和兴 All rights reserved.
 */

export const customOption = '(data) => {\n' +
  '    console.log(data);\n' +
  '    return {\n' +
  '        xAxis: {\n' +
  '            type: \'category\',\n' +
  '            data: [\'Mon\', \'Tue\', \'Wed\', \'Thu\', \'Fri\', \'Sat\', \'Sun\']\n' +
  '        },\n' +
  '        yAxis: {\n' +
  '            type: \'value\'\n' +
  '        },\n' +
  '        series: [\n' +
  '            {\n' +
  '                data: [150, 230, 224, 218, 135, 147, 260],\n' +
  '                type: \'line\'\n' +
  '            }\n' +
  '        ]\n' +
  '    }\n' +
  '}'
export const customFn = (data) => {//eslint-disable-line
  return {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  }
}
export const custom = { //组件容器实例对象
  name: { //图层名称
    label: '图层名称',
    type: 'input',
    value: '自定义组件'
  },
  hide: { //显示隐藏
    label: '隐藏',
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
  document: { //自定义编辑器
    label: '在线文档',
    type: 'document',
    href: 'https://echarts.apache.org/examples/zh/index.html'
  },
  customEditor: { //自定义编辑器
    label: '配置列表',
    type: 'customEditor',
    field: 'custom'
  },
}
