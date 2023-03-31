/**
 * @file: other.
 * @authors: yangj (yangjia@fjxhx.cc).
 * @createDate: 2021/10/22.
 * @version: 1.0.
 * @copyright © 2021 新和兴 All rights reserved.
 */
export const tabs = {
    name: { //图层名称
        label: '图层名称',
        type: 'input',
        value: '选项卡'
    },
    hide: { //显示隐藏
        label: '隐藏',
        type: 'switch',
        value: false
    },
    width: {
        label: '宽度',
        type: 'slider',
        value: 300,
        max: 1920
    },
    height: {
        label: '高度',
        type: 'slider',
        value: 40,
        max: 1080
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
    margin: { //字体颜色
        label: '字体间距',
        type: 'number',
        value: 0
    },
    borderConfig: {
        collapseLabel: '边框设置',
        config: {
            bgImg: {
                label: '背景图片',
                type: 'img',
                value: require('@/static/border/border-default.png')
            },
            borderColor: {
                label: '边框颜色',
                type: 'color',
                value: null
            },
            borderWidth: { //边框宽度
                label: '边框宽度',
                type: 'number',
                value: 0
            },
            bgColor: {
                label: '背景颜色',
                type: 'color',
                value: null
            },
        }
    },
    highlightConfig: {
        collapseLabel: '高亮设置',
        config: {
            fontColor: {
                label: '字体高亮颜色',
                type: 'color',
                value: '#4dffff'
            },
            bgImg: {
                label: '背景图片',
                type: 'img',
                value: require('@/static/border/border.png')
            },
            borderColor: {
                label: '边框颜色',
                type: 'color',
                value: null
            },
            borderWidth: { //边框宽度
                label: '边框宽度',
                type: 'number',
                value: 0
            },
        }
    }
}

export const textbox = {
    name: { //图层名称
        label: '图层名称',
        type: 'input',
        value: '文本框'
    },
    hide: { //显示隐藏
        label: '隐藏',
        type: 'switch',
        value: false
    },
    width: {
        label: '宽度',
        type: 'slider',
        value: 200,
        max: 1000
    },
    height: {
        label: '高度',
        type: 'slider',
        value: 100,
        max: 800
    },
    text: {
        label: '文本',
        type: 'textarea',
        value: '文本框'
    },
    fontSize: {
        label: '字体大小',
        type: 'slider',
        value: 24,
        max: 80
    },
    color: {
        label: '字体颜色',
        type: 'color',
        value: '#ffffff'
    },
    fontWeight: {
        label: '字体粗细',
        type: 'slider',
        value: 500,
        max: 1000
    },
    lineHeight: {
        label: '字体行高',
        type: 'number',
        value: 36,
        max: 200
    },
    textAlign: {
        label: '对齐方式',
        type: 'select',
        value: 'left',
        options: [{
            value: 'left',
            label: '左对齐'
        }, {
            value: 'center',
            label: '居中对齐'
        }, {
            value: 'right',
            label: '右对齐'
        }]
    },
    letterSpacing: {
        label: '字体间距',
        type: 'number',
        value: 0,
        max: 100
    },
    textIndent: {
        label: '字体缩进',
        type: 'number',
        value: 0,
        max: 10
    },
    fontStyle: {
        label: '字体样式',
        type: 'select',
        value: 'normal',
        options: [{
            value: 'normal',
            label: '正常'
        }, {
            value: 'italic',
            label: '斜体'
        }, {
            value: 'oblique',
            label: '倾斜'
        }]
    },
    whiteSpace: {
        label: '字体换行',
        type: 'select',
        value: 'normal',
        options: [{
            value: 'normal',
            label: 'normal'
        }, {
            value: 'nowrap',
            label: 'nowrap'
        }, {
            value: 'pre',
            label: 'pre'
        }, {
            value: 'pre-wrap',
            label: 'pre-wrap'
        }, {
            value: 'pre-line',
            label: 'pre-line'
        }]
    }
}