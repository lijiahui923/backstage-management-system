<script>
import methods from './mixins/table-methods'
import CPagination from './components/CPagination'
import TrendsTable from './components/TrendsTable'
const defaultProps = {
  border: true,
  'highlight-current-row': true,
  'header-cell-style': { 'background-color': '#f8f8f9' }
}
export default {
  name: 'CTable',
  components: { CPagination, TrendsTable },
  mixins: [methods],
  inheritAttrs: false,
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    paginationConfig: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      hideColumnsOptions: [],
      isFalse: false,
      elTableRef: 'EL_TABLE_REF'
    }
  },
  watch: {
    columns: {
      immediate: true,
      handler(val) {
        // console.log(val)
        const columnList = val.filter(item => !item.type && item.label)
      // console.log(this.hideColumnsOptions)
      // this.hideColumnsOptions = columnsList.map(item => {
      //   return item.prop || item.type
      // })
      // this.hideColumnsOptions = columnList.find(item => {
      //   console.log(item.prop)
      // })
      // console.log(this.hideColumnsOptions)
      this.hideColumnsOptions = columnList.map(item => {
        return item.prop
      })
      console.log(this.hideColumnsOptions)
      //  = kk
      // this.hideColumnsOptions.push.apply(kk)
      // console.log(kk, this.hideColumnsOptions)
      // const props = { columnList, kk }
      }
    }
  },
  methods: {
    renderTable(h) {
      const { $attrs, $listeners } = this
      const columns = this.renderColumns(h)
      const $this = this
      const props = Object.assign(defaultProps, $attrs, { data: this.data })
      const slots = []
      for (const s in this.$slots) {
        slots.push(
          h(
            'template',
            {
              slot: s
            },
            this.$slots[s]
          )
        )
      }
      return h(
        'el-table',
        {
          props: {
            ...props
          },
          on: {
            ...$listeners
          },
          scopedSlots: $this.$scopedSlots,
          ref: $this.elTableRef
        },
        [...slots, ...columns]
      )
    },
    renderColumns(h) {
      const columns = []
      for (let index = 0; index < this.columns.length; index++) {
        if (!this.hideColumnsOptions.includes(this.columns[index].prop)) {
          continue
        }
        if (this.columns[index].type === 'expand') {
          columns.push(this.renderColumnForExpand(h, this.columns[index]))
        } else if (this.columns[index].type === 'operate') {
          columns.push(this.renderColumnForOPerate(h, this.columns[index]))
        } else {
          columns.push(this.renderColumn(h, this.columns[index]))
        }
      }
      return columns
    },
    renderColumn(h, column) {
      const _column = Object.assign({}, column, { 'show-overflow-tooltip': true })
      // 如果类型等于selection复选框固定在左边
      if (_column.type === 'selection') {
        _column.label = ''
        !_column.fixed && (_column.fixed = 'left')
      }
      const scopedSlots = {}; const scopedSlotsList = {}; const slots = []
      // 如果类型是一个对象说明有多个插槽需要循环渲染，其他的就是一个渲染默认的
      if (_column.slots && typeof _column.slots === 'object') {
        for (const key in _column.slots) {
          const scopedSlots = this.$scopedSlots[_column.slots[key]]
          scopedSlotsList[key] = props => {
            return scopedSlots(props)
          }
        }
      } else {
        const slotName = _column.slots
        const scopedSlot = this.$scopedSlots[slotName]
        const slot = this.$slots[slotName]
        if (scopedSlot) {
          scopedSlots.default = props => {
            return scopedSlot(props)
          }
        }
        if (slot) {
          slots.push(slot)
        }
      }
      return h(
        'el-table-column',
        {
          props: _column,
          scopedSlots: Object.assign({}, scopedSlots, scopedSlotsList)
        },
        slots
      )
    },
    // 渲染展开列
    renderColumnForExpand(h, column) {
      const self = this
      const props = Object.assign({}, column, { label: '' })
      return h(
        'el-table-column',
        {
          props,
          scopedSlots: {
            default: props => {
              return self.$scopedSlots['expand'](props)
            }
          }
        }
      )
    },
    // 渲染操作列
    renderColumnForOPerate(h, column) {
      const self = this
      !column.fixed && (column.fixed = 'right')
      const props = Object.assign({}, column, { label: '操作 ' })
      return h(
        'el-table-column',
        {
          props,
          scopedSlots: {
            default: props => {
              return self.$scopedSlots.operate(props)
            }
          }
        }
      )
    },
    // 分页如果this.paginationConfig就渲染
    renderPagination(h) {
      if (this.paginationConfig) {
        return h(
          'CPagination',
          {
            attrs: this.paginationConfig,
            on: this.$listeners
          }
        )
      }
    },
    // 渲染隐藏列
    renderPopver(h) {
      const columnList = this.columns.filter(item => !item.type && item.label)
      // console.log(this.hideColumnsOptions)
      // this.hideColumnsOptions = columnsList.map(item => {
      //   return item.prop || item.type
      // })
      // this.hideColumnsOptions = columnList.find(item => {
      //   console.log(item.prop)
      // })
      // console.log(this.hideColumnsOptions)
      // const kk = columnList.map(item => {
      //   return item.prop
      // })
      // this.hideColumnsOptions.push.apply(kk)
      // console.log(kk, this.hideColumnsOptions)
      const props = { columnList, hideColumnsOptions : this.hideColumnsOptions }
      return h(
        'TrendsTable',
        {
          props,
          on: {
            changeIsFalse: (val) => {
              this.hideColumnsOptions = val
              console.log(this.hideColumnsOptions)
            }
          }
        }
      )
    }
  },
  render(h) {
    return h(
      'div',
      [
        this.renderPopver(h),
        this.renderTable(h),
        this.renderPagination(h)
      ]
    )
  }
}
</script>

<style scoped>
</style>
