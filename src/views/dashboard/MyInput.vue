<script>
export default {
  name: 'MyInput',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputVal: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.inputVal = val
      }
    }
  },
  render(h) {
    const self = this
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
    const props = Object.assign({}, { value: self.inputVal }, self.$attrs)
    return h(
      'el-input',
      {
        props,
        on: {
          ...self.$listeners,
          input: (e) => {
            self.inputVal = e
            self.$emit('input', e)
          }
        }
      },
      slots
    )
  }
}
</script>
