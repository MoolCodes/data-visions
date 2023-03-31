/*
 * @Descripttion: 表格配置
 * @Author: Li Yuyuan
 * @Date: 2021-10-09 10:57:49
 */
export const tableOne = {
    name: { //图层名称
        label: '图层名称',
        type: 'input',
        value: '表格'
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
        max: 1000
    },
    height: {
        label: '高度',
        type: 'slider',
        value: 200,
        max: 1000
    },
    rowNum: {
        label: '表行数',
        type: 'number',
        value: 5
    },
    headerBGC: {
        label: '表头背景色',
        type: 'color',
        value: '#00BAFF'
    },
    oddRowBGC: {
        label: '奇数行背景色',
        type: 'color',
        value: '#003B51'
    },
    evenRowBGC: {
        label: '偶数行背景色',
        type: 'color',
        value: '#0A2732'
    },
    waitTime: {
        label: '轮播间隔(ms)',
        type: 'number',
        value: 2000
    },
    headerHeight: {
        label: '表头高度',
        type: 'number',
        value: 35
    },
    index: {
        label: '显示行号',
        type: 'switch',
        value: false
    },
    indexHeader: {
        label: '行号表头',
        type: 'input',
        value: '#'
    },
    carousel: {
        label: '轮播方式',
        type: 'select',
        value: 'single',
        options: [{
            value: 'single',
            label: '单行'
        }, {
            value: 'page',
            label: '整页'
        }]
    },
    hoverPause: {
        label: '悬浮暂停轮播',
        type: 'switch',
        value: true
    },
    columnWidth: {
        label: '列宽度',
        type: 'editor',
        field: 'array',
        value: [],
        explain: '配置每一列的宽度，默认情况下每一列宽度相等；例如[100,200]'
    },
    align: {
        label: '列对齐方式',
        type: 'editor',
        field: 'array',
        value: [],
        explain: `配置每一列的对齐方式，可选值有'left'|'center'|'right'，默认值为'left'`
    }
}