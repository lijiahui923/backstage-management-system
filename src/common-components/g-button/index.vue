<script>
import { isObject, isFunction, has, isBoolean, omit } from 'lodash'
import componentConfig from '../../conf/index'
/**
@description:
@createTime:2021-05-17
@create:lijiahui
*/
const DEFAULT_BUTTONS = {
  add: {
    label: '新增',
    icon: 'el-icon-plus'
  },
  update: {
    label: '编辑',
    icon: 'el-icon-edit'
  },
  remove: {
    label: '删除',
    icon: 'el-icon-delete'
  }
}
export default {
  name: 'GButton',
  components: {},
  inheritAttrs: false,
  props: {
    // 数据源
    options: {
      type: Object,
      default: null
    },
    // 是否是按钮组
    group: {
      type: Boolean,
      default: false
    },
    uniqueKey: {
      type: String,
      default: ''
    },
    needAuth: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    // 是否阻止冒泡事件
    stop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 按钮配置信息
      buttonsConfiguration: []
    }
  },
  computed: {},
  watch: {
    options: {
      immediate: true,
      deep: true,
      handler(options) {
        if (isObject(options)) {
          this.initConfiguration(options)
        }
      }
    }
  },
  mounted() {},
  created() {},
  methods: {
    initConfiguration(options) {
      // 按钮配置数组
      const buttonConfigArr = []
      const _this = this
      // 从attrs中提取公共的配置
      const globalConfig = this.getGlobalConfig()
      Object.keys(options).forEach((key, index) => {
        let uniqueKey = key
        // 如果包含uniqueKey属性，使用uniaueKey作为按钮标识
        if (!isFunction(options) && options[key].uniqueKey) {
          uniqueKey = options[key].uniqueKey
        }
        // 单个按钮配置
        const btnConfig = {
          prop: {},
          attr: {},
          listeners: {},
          label: '',
          key: uniqueKey,
          directives: {},
          class: {}
        }
        const defaultConfig = Object.assign({}, DEFAULT_BUTTONS[key], globalConfig)
        // 合并默认配置
        // 值的方法是add: () => {}
        if (isFunction(options[key])) {
          if (defaultConfig) {
            btnConfig.prop = omit(defaultConfig, 'label')
            btnConfig.label = defaultConfig.label
          }
          // 方法作为点击事件
          btnConfig.listeners['click'] = function(event) {
            // 阻止事件冒泡
            if (_this.stop) {
              event.stopPropagation()
            }
            options[key]()
          }
        }
        // 值是对象 add: { type: '', loading: '' }
        if (isObject(options[key])) {
          const normalAttribte = {}
          if (defaultConfig.label) {
            normalAttribte.label = defaultConfig.label
          }
          Object.keys(options[key]).forEach(configKey => {
            if (isFunction(options[key][configKey])) {
              btnConfig.listeners[configKey] = function(event) {
                //   单个按钮配置stop属性为true 或者全局配置为true
                if ((isBoolean(options[key]['stop']) && options[key]['stop']) || (_this.stop && options[key]['stop'] === undefined)) {
                  event.stopPropagation()
                }
                options[key][configKey]()
              }
            } else {
              if (configKey === 'needAuth') {
                btnConfig.needAuth = options[key][configKey]
              } else if (configKey === 'title') {
                btnConfig.title = options[key][configKey]
              } else if (configKey === 'throttle') {
                btnConfig.directives[configKey] = options[key][configKey]
              } else if (configKey === 'class') {
                const classConfig = {}
                const classArr = options[key][configKey].split(' ')
                classArr.forEach(item => {
                  classConfig[item] = true
                })
                btnConfig.class = classConfig
              } else if (configKey !== 'stop') {
                normalAttribte[configKey] = options[key][configKey]
              }
            }
          })
          btnConfig.label = normalAttribte.label
          // 合并配置
          const propConfig = Object.assign({}, omit(defaultConfig, 'label'), omit(normalAttribte, 'label'))
          // 处理icon配置为false的情况
          if (isBoolean(propConfig.icon) && !propConfig.icon) {
            // icon配置为false,排除icon属性
            btnConfig.prop = omit(propConfig, 'icon')
          } else {
            btnConfig.prop = propConfig
          }
        }
        buttonConfigArr.push(btnConfig)
      })
      this.buttonsConfiguration = buttonConfigArr
    },
    // 从attrs中提取公共的配置
    getGlobalConfig() {
      const globalConfig = {}
      const buttonsAttribute = ['size', 'type', 'plain', 'round', 'circle', 'disabled', 'autofocus', 'icon', 'label']
      buttonsAttribute.forEach(attribute => {
        if (has(this.$attrs, attribute)) {
          globalConfig[attribute] = this.$attrs[attribute]
        }
      })
      return globalConfig
    },
    // 单个按钮
    singleButton(h) {
      const directives = []
      // 全局配置使用权限并且当前按钮需要权限并且当前按钮的唯一编号存在
      if (componentConfig.permissionDirective && this.needAuth && this.uniqueKey) {
        directives.push({
          name: 'permission'
        })
      }
      const listeners = {}
      const _this = this
      Object.keys(this.$listeners).forEach(key => {
        listeners[key] = function(event) {
          if (_this.stop) {
            event.stopPropagation()
          }
          _this.$listeners[key]()
        }
      })
      return h(
        'el-button',
        {
          props: this.$attrs,
          attrs: {
            title: this.title ? this.t(this.title) : ''
          },
          key: this.uniqueKey,
          directives,
          on: listeners
        },
        [
          this.$slots.default
        ]
      )
    },
    buttonGroup(h, useGroup) {
      const buttons = this.getButtons(h)
      return h(
        useGroup ? 'el-button-group' : 'div',
        {
          class: {
            'buttons-container': !useGroup
          }
        },
        buttons
      )
    },
    getButtons(h) {
      const _this = this
      const buttons = []
      _this.buttonsConfiguration.forEach(btnConfig => {
        const directives = []
        const needAuth = isBoolean(btnConfig.needAuth) ? btnConfig.needAuth : _this.needAuth
        if (componentConfig.permissionDirective && needAuth) {
          directives.push({
            name: 'permission'
          })
        }
        Object.keys(btnConfig.directives).forEach(key => {
          directives.push({
            name: key,
            value: btnConfig.directives[key]
          })
        })
        const button = h(
          'el-button',
          {
            props: btnConfig.prop,
            class: btnConfig.class,
            attrs: {
              title: btnConfig.attr.title ? this.t(btnConfig.attr.title) : ''
            }
          },
          [
            btnConfig.label ? h(
              'span',
              [
                _this.t(btnConfig.label)
              ]
            ) : null
          ]
        )
        buttons.push(button)
      })
      return buttons
    }
  },
  render(h) {
    if (!this.options) {
      // 单个
      return this.singleButton(h)
    } else if (this.options && this.group) {
      // 按钮组
      return this.buttonGroup(h, true)
    } else {
      // 多个不是按钮组
      return this.buttonGroup(h, false)
    }
  }
}
</script>
<style lang='scss' scoped></style>
