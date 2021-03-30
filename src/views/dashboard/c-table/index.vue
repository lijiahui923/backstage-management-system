<script>
import methods from './mixins/table-methods'
import CPagination from './components/CPagination'
const defaultProps = {
  border: true,
  'highlight-current-row': true,
  'header-cell-style': { 'background-color': '#f8f8f9' }
}
export default {
  name: 'CTable',
  components: { CPagination },
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
    },
    // eslint-disable-next-line vue/require-default-prop
    height: [String, Number]
  },
  data() {
    return {
      selfColumns: [],
      elTableRef: 'EL_TABLE_REF'
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
      this.columns.forEach(column => {
        if (column.type === 'expand') {
          columns.push(this.renderColumnForExpand(h, column))
        } else if (column.type === 'operate') {
          columns.push(this.renderColumnForOPerate(h, column))
        } else {
          columns.push(this.renderColumn(h, column))
        }
      })
      return columns
    },
    renderColumn(h, column) {
      const _column = Object.assign({}, column)
      if (_column.type === 'selection') {
        _column.label = ''
        !_column.fixed && (_column.fixed = 'left')
      }
      const scopedSlots = {}; const slots = []
      console.log(this.$slots, this.$scopedSlots)
      if (_column.slots) {
        const slotName = _column.slots.default || _column.slots
        const scopedSlot = this.$scopedSlots[slotName]
        const slot = this.$slots[slotName]
        console.log(this.$scopedSlots, _column.slots)
        // if (typeof _column.slots === 'object') {
        // for (const key in _column.slots) {
        //   const scopedSlots = this.$scopedSlots[_column.slots[key]]
        //   console.log(_column.slots[key])
        //   scopedSlots[key] = props => {
        //     return scopedSlots(props)
        //   }
        // }
        // const slotName = [_column.slots.default]
        // console.log(slotName)
        // const scopedSlot = this.$scopedSlots[slotName]
        // const slotFn = []
        // slotName.forEach(name => {
        //   slotFn.push(this.$scopedSlots[name])
        // })
        // console.log(slotFn)
        // scopedS.default = props => {
        //   return scopedS(props)
        // }
        // console.log(_column.slots.default)
        // const slotD = _column.slots.default
        // const scopedS = this.$scopedSlots[slotD]
        // console.log(scopedS)
        // const slotH = _column.slots.header
        // const scopedSH = this.$scopedSlots[slotH]
        // if (scopedSH || scopedS) {
        // scopedS.default = props => {
        //   return scopedS(props)
        // }
        // scopedSH.header = props => {
        //   return scopedSH(props)
        // }
        // scopedSlots[_column.slots.type] = props => {
        //   return scopedSlot(props)
        // }
        // scopedSlots[_column.slots.type] = props => {
        //   return scopedSlot(props)
        // }
        // [_column.slots.type] = props => {
        //   return h(
        //     'template',
        //     {
        //       scopedSlots: {
        //         header: props => {
        //           return _column.slots.type(props)
        //         }
        //       }
        //     }
        //   )
        // }
        // }
        // } else {
        //   if (scopedSlot) {
        //     scopedSlots.default = props => {
        //       return scopedSlot(props)
        //     }
        //   }
        // }
        // if (slot) {
        //   slots.push(slot)
        // }
      }
      // if (_column.slots) {
      //   const slotName = _column.slots.default || _column.slots
      //   const scopedSlot = this.$scopedSlots[slotName]
      //   const slot = this.$slots[slotName]
      //   console.log(scopedSlot)
      //   if (scopedSlot) {
      //     scopedSlots.default = props => {
      //       return scopedSlot(props)
      //     }
      //     scopedSlots.header = props => {
      //       return scopedSlot(props)
      //     }
      //   }
      //   if (slot) {
      //     slots.push(slot)
      //   }
      // }
      return h(
        'el-table-column',
        {
          props: _column,
          scopedSlots
        },
        slots
      )
    },
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
    renderColumnForOPerate(h, column) {
      const self = this
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
    }
  },
  render(h) {
    return h(
      'div',
      [
        this.renderTable(h),
        this.renderPagination(h)
      ]
    )
  }
}
</script>
