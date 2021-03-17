<script>
/**
@description: 左侧的菜单栏
@createTime:2021-03-17
@create:lijiahui
*/
export default {
  name: 'MainMenu',
  props: {
    menuData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      indexPath: ''
    }
  },
  methods: {
    createMenuItem(h, item) {
      const haveChilden = Object.prototype.toString.call(item.children) === '[object Array]' && item.children.length
      const index = item.path
      const props = { ...item, index }
      if (haveChilden) {
        // 如果只有一个孩子就用使用它的第一个孩子作为父
        if (haveChilden === 1) {
          return h(
            'el-menu-item',
            { props },
            this.createIconTitle(h, item.children[0])
          )
        } else {
          return h(
            'el-submenu',
            { props },
            [
              h('template', { slot: 'title' }, this.createIconTitle(h, item)),
              ...item.children.map(_item => this.createMenuItem(h, _item))
            ]
          )
        }
      } else {
        return h(
          'el-menu-item',
          {
            props,
            key: index,
            on: {
              click: () => {
                this.$emit('select', item, this.indexPath)
              }
            }
          },
          this.createIconTitle(h, item)
        )
      }
    },
    createIconTitle(h, item) {
      const vnodes = []
      if (item.meta) {
        const { icon, title } = item.meta
        if (icon) {
          if (icon.includes('el-icon')) {
            vnodes.push(h('i', { 'class': [icon, 'sub-el-icon'] }))
          } else {
            vnodes.push(<svg-icon icon-class={icon}/>)
          }
        }
        vnodes.push(h('span', { slot: 'title' }, title))
      }
      return vnodes
    }
  },
  render(h) {
    return h(
      'el-menu',
      {
        props: this.$attrs,
        on: {
          ...this.$listeners,
          select: (index, indexPath) => {
            this.indexPath = indexPath
          }
        }
      },
      this.menuData.filter(item => !(item.hidden === true)).map(item => this.createMenuItem(h, item))
    )
  }
}
</script>
