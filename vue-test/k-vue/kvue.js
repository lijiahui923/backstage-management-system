// 数据响应式
function defineReactive(obj, key, val) {
  observe(val)
  // 创建Dop实例 跟key是一对一的关系
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key)
      // 依赖收集
      Dep.target && dep.appDep(Dep.target)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set' + newVal)
        // 保证如果newVal是一个对象，再次做响应式处理
        observe(newVal)
        val = newVal
        dep.notify()
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
          //   k-xx="abc"
          const attrName = attr.name
          const exp = attr.value
          if (attrName.startsWith('k-')) {
            const dir = attrName.substring(2)
            this[dir] && this[dir](node, exp)
          }
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
  update(node, exp, dir) {
    // 1.初始化
    const fn = this[dir + 'Updater']
    fn && fn(node, exp)
    // 2.更新
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val)
    })
  }
  text(node, exp) {
    this.update(node, exp, 'text')
    // node.textContent = this.$vm[exp]
  }
  // 编译文本{{xxx}}
  textUpdater(node, value) {
    node.textContent = value
  }
  html(node, exp) {
    this.update(node, exp, 'html')
    // node.innerHTML = this.$vm[exp]
  }
  htmlUpdater(node, value) {
    node.innerHTML = value
  }
  // 编译文本
  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }
  // 是否插值表达式
  isInter(node) {
    return node.nodeType === 3 && /{\{(.*)}\}/.test(node.textContent)
  }
}

// 监听器：负责依赖更新
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn
    // 触发依赖收集
    // 当前实例赋值在这个静态属性上（这就是一个全局属性了）
    Dep.target = this
    // 这个就是为了触发上面的defineReactive的get
    this.vm[this.key]
  }
  // 被Dep调用
  update() {
    // 执行实际更新操作
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

class Dep {
  constructor() {
    this.deps = []
  }
  appDep(dep) {
    this.deps.push(dep)
  }
  // 未来有人更新就执行
  notify() {
    // dep 就是Watcher
    this.deps.forEach(dep => dep.update())
  }
}

// 完成时间处理@，注意上下文
// v-model:value, @input
// 实现数组响应式
