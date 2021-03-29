<script>
/**
@description: 表单组件
@createTime:2021-03-18
@create:lijiahui
*/
import methods from './form-methods'
import XEUtils from 'xe-utils'
// 默认row配置
const DEFAULT_ROW = {
  gutter: 20
}
// 默认col配置
const DEFAULT_COL = {
  xs: 24,
  md: 12,
  lg: 8
}
export default {
  name: 'GForm',
  components: {},
  mixins: [methods],
  // 不要展示在dom上
  inheritAttrs: false,
  props: {
    // 表单配置
    formItemConfig: {
      type: Array,
      default: () => []
    },
    row: {
      type: [Boolean, Object],
      default: undefined
    },
    col: {
      type: [Boolean, Object, Number],
      default: undefined
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    createELRow(h) {},
    getFormItems(h) {
      let self = this
      return this.formItemConfig.map(item => {
        let formItem = item.slot ? self.$slots[item.slot] : h(
          'el-form-item',
          {
            props: {
              ...XEUtils.omit(item, 'label', 'type', 'attrs', 'props', 'on', 'nativeOn')
            },
            scopedSlots: {
              error: function(error) {
                if (self.$scopedSlots[item.prop + '-error']) {
                  return self.$scopedSlots[item.prop + '-error'](error)
                }
              }
            }
          },
          [
            !item.label ? h(
              'template',
              {
                slot: 'label'
              },
              [
                h(
                  'span'
                )
              ]
            ) : '',
            ...self.getFormItemContent(h, item)
          ]
        )
      })
    },
    getFormItemContent(h, item) {
      const children = []
      children.push(this.getItemContent(h, item))
    }
  },
  render(h) {
    // this.$utils.isNaN(111)
    const formItems = this.getFormItems(h)
    let children = formItems
    if (typeof this.row === 'object') {
      children = this.createELRow(h, this.row, formItems)
    } else if ((typeof this.row === 'boolean' && this.row) || typeof this.row === 'undefined') {
      children = this.createELRow(h, DEFAULT_ROW, formItems)
    }
    return h(
      'el-form',
      {
        props: this.$attrs,
        on: this.$listeners,
        ref: 'DynamicFormREF'
      },
      [
        children
      ]
    //   this.formItemConfig.map(item => this.createFormItem(h, item))
    )
  }
}
</script>
<style lang='' scoped></style>
