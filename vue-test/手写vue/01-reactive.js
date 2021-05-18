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

// const obj = {}
// defineReactive(obj, 'foo', 'foo')
// obj.foo
// obj.foo = 'sssss'

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  // 遍历obj所有的key，做响应式处理
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

// 其实就是一个转发
function set(obj, key, val) {
  defineReactive(obj, key, val)
}
const obj = {
  foo: 'foo',
  bar: 'bar',
  baz: {
    a: 1
  }
}
observe(obj)
// obj.foo
// obj.bar
// obj.baz
// obj.baz.a
// obj.baz = {
//   a: 10
// }
// obj.dong = 'dong' no ok
// obj.dong

// 动态添加
set(obj, 'dong', 'dong')
obj.dong

// array
// push/pop/shift/unshift 使用defineProperty拦截不到
// 获取原型，克隆原型，覆盖原型例如：更新方法和通知方法
