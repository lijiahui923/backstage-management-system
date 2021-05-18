// 数据响应式
function defineReactive(obj, key, val) {
  observe(val)
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key)
      return val
    },
    set(newVal) {
      console.log('set' + newVal)
      // 保证如果newVal是一个对象，再次做响应式处理
      observe(newVal)
      if (newVal !== val) {
        val = newVal
      }
    }
  })
}

// 劫持监听所有属性
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  // 遍历obj所有的key，做响应式处理
  //   Object.keys(obj).forEach(key => {
  //     defineReactive(obj, key, obj[key])
  //   })
  new Observer(obj)
}
function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(v) {
        vm.$data[key] = v
      }
    })
  })
}
// 根据传入的value的类型做相应的响应式处理
class Observer {
  constructor(value) {
    this.value = value
    if (Array.isArray(value)) {
      // todo
    } else {
      this.walk(value)
    }
  }
  // 对象响应式
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

// KVue
// 1.对data选项做响应式处理
// 2.编译模板
class KVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    //  data响应式处理
    observe(this.$data)
    // 代理
    proxy(this)
    // compile
    new Compile(options.el, this)
  }
}

// 解析模板
// 1、处理插值
// 2、处理指令和事件
// 3、以上两者初始化和更新
class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    if (this.$el) {
      this.compile(this.$el)
    }
  }
  compile(el) {
    // 遍历el子节点，判断他们类型做相应的处理
    const childNodes = el.childNodes
    childNodes.forEach(node => {
      if (node.nodeType === 1) {
        // 元素
        // console.log('元素' + node.nodeName)
        // 处理指令和事件
        const attrs = node.attributes
        Array.from(attrs).forEach(attr => {
          console.log(attr)
        })
      } else if (this.isInter(node)) {
        // 文本
        // console.log('插值' + node.textContent)
        this.compileText(node)
      }
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }
  // 编译文本
  compileText(node) {
    node.textContent = this.$vm[RegExp.$1]
  }
  // 是否插值表达式
  isInter(node) {
    return node.nodeType === 3 && /{\{(.*)}\}/.test(node.textContent)
  }
}
