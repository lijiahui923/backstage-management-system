<script>
// import { defaults } from 'node_modules/js-cookie/src/js.cookie'
export default {
  name: 'MyInput',
  inheritAttrs: false,
  props: {
    // name: {
    //   require: true
    // }
  },
  render(h) {
    console.log(this.$scopedSlots, this.props)
    const self = this
    // const scopedSlots = {
    //   default: props => this.$scopedSlots(props)
    // }
    // for (const slot in this.$slots) {
    //   scopedSlots[slot] = props => self.$scopedSlots(props)
    // }
    // console.log(scopedSlots)
    return h(
      'el-input',
      {
        props: {
          ...self.$attrs
        },
        on: {
          ...self.$listeners
        },
        scopedSlots: {
        //   default: function(props) {
        //     return h('span', props.text)
        //   }
        //   prepend: props => this.$scopedSlots.prepend(props)
        //   prepend(prop) {
        //     return prop
        //   }
        }
      }
    )
  }
}
</script>

<style>

</style>
