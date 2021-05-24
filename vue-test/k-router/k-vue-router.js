let Vue
class VueRouter {
  constructor(options) {
    this.$options = options
    // 让current变成响应式数据，发生变化router-view的render函数就能够再次执行
    // this.current = '/'
    const initial = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'current', initial)
    window.addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1)
    })
  }
}
VueRouter.install = function(_Vue) {
  Vue = _Vue
  // 延迟router创建完毕并且附加到选项上才执行
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      const { to } = this
      return h(
        'a',
        {
          attrs: {
            href: `#` + to
          }
        },
        this.$slots.default)
    }
  })

  Vue.component('router-view', {
    methods: {
      getRoutes(allRoutes, newArr = []) {
        allRoutes.map(router => {
          if (router.children && router.children.length) {
            newArr.push(router)
            this.getRoutes(router.children, newArr)
          } else {
            newArr.push(router)
          }
        })
        return newArr
      }
    },
    render(h) {
      let component = null
      const routes = this.getRoutes(this.$router.$options.routes)
      const route = routes.find(route => {
        return route.path === this.$router.current
      })
      if (route) {
        component = route.component
      }
      return h(component)
    }
  })
}
export default VueRouter
