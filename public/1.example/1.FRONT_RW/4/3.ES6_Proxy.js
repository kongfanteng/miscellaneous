// 提纲: proxyGet; proxySet; deleteProperty;  取消代理; dataTypeConfirm; outBanVisit; 观察者模式;
proxyGet = () => {
  getUse = () => {
    const person = {
      name: '张三',
    }
    const proxy = new Proxy(person, {
      get: function (target, propKey) {
        return Reflect.get(target, propKey)
      },
    })
    console.log(proxy.name, '张三')
  }
  // getUse()
  get拦截数组操作 = () => {
    function createArray(...elements) {
      const handler = {
        get(target, propKey, reciver) {
          const index = Number(propKey)
          if (index < 0) {
            propKey = String(target.length + index)
          }
          return Reflect.get(target, propKey, reciver)
        },
      }
      const target = []
      target.push(...elements)
      return new Proxy(target, handler)
    }
    const arr = createArray('a', 'b', 'c')
    console.log(arr[-1], 'c')
  }
  // get拦截数组操作()
  get不可配置 = () => {
    const target = Object.defineProperties(
      {},
      {
        foo: {
          value: 123,
          writable: false,
          configurable: false,
        },
      }
    )
    const handler = {
      get(target, propKey) {
        return 'abc'
      },
    }
    const proxy = new Proxy(target, handler)
    console.log(
      `proxy.foo`,
      `get' on proxy: property 'foo' is a read-only and non-configurable data`
    )
  }
  get不可配置()
}
// proxyGet()
proxySet = () => {
  confirmAgeIsIntegerAndMore200 = () => {
    const validator = {
      set: function (obj, prop, value) {
        if (prop === 'age') {
          if (!Number.isInteger(value)) {
            throw new TypeError('The age is not an integer')
          }
          if (value > 200) {
            throw new RangeError('The age should not be over 200')
          }
        }
        obj[prop] = value
      },
    }
    const person = new Proxy({}, validator)
    person.age = 100
    console.log(person.age, '100')
    ;(person.age = 'young'), `The age is not an integer `
    ;(person.age = 300), `The age should not be over 200 `
  }
  // confirmAgeIsIntegerAndMore200()
  set不可写 = () => {
    const obj = {}
    Object.defineProperty(obj, 'foo', {
      value: 'bar',
      writable: false,
    })
    const handler = {
      set(obj, prop, value, reciver) {
        obj[prop] = 'baz'
      },
    }
    const proxy = new Proxy(obj, handler)
    proxy.foo = 'baz'
    console.log(obj.foo, 'bar')
  }
  // set不可写()
  setUseStrictMustReturnTrue = () => {
    'use strict'
    const handler = {
      set(obj, prop, value, reciver) {
        obj[prop] = reciver
        return false
      },
    }
    const proxy = new Proxy({}, handler)
    proxy.foo = 'bar'
    ;`'set' on proxy: trap returned falsish for property 'foo' `
  }
  // setUseStrictMustReturnTrue()
}
proxySet()
deleteProperty = () => {
  const handler = {
    deleteProperty(target, key) {
      invariant(key, 'delete')
      Reflect.deleteProperty(target, key)
      return true
    },
  }
  function invariant(key, action) {
    if (key[0] === '_') {
      throw new Error('无法删除私有属性')
    }
  }
  var target = { _prop: 'foo' }
  var proxy = new Proxy(target, handler)
  delete proxy._prop
  ;`无法删除私有属性`
}
// deleteProperty()
取消代理 = () => {
  const revocable = Proxy.revocable(
    { foo: 1 },
    {
      get(target, name) {
        return '[[' + name + ']]'
      },
    }
  )
  const proxy = revocable.proxy
  console.log(proxy.foo, '[[foo]]')
  revocable.revoke()
  ;`Cannot perform 'get' on a proxy that has been revoked `
}
// 取消代理()
dataTypeConfirm = () => {
  let numericDataStore = { count: 0, amount: 1234, total: 14 }
  numericDataStore = new Proxy(numericDataStore, {
    set(target, key, value, proxy) {
      if (typeof value !== 'number') {
        throw Error('属性只能是 number 类型')
      }
      return Reflect.set(target, key, value, proxy)
    },
  })
  numericDataStore.count = 'foo'
  ;`抛错：
  属性只能是 number 类型`
}
// dataTypeConfirm()
outBanVisit = () => {
  let api = {
    _apiKey: '1234',
    getUses() {},
    getUser(userId) {},
    setUser(userId, config) {},
  }
  const RESIRICTED = ['_apiKey']
  api = new Proxy(api, {
    get(target, key, proxy) {
      if (RESIRICTED.includes(key)) {
        throw Error(`${key} 不允许访问`)
      }
      return Reflect.get(target, key, proxy)
    },
    set(target, key, value, proxy) {
      if (RESIRICTED.includes(key)) {
        throw Error(`${key} 不允许修改`)
      }
      return Reflect.set(target, key, value, proxy)
    },
  })
  console.log(api._apiKey)
  ;`_apiKey 不允许访问`
  api._apiKey = 1234
  ;`_apiKey 不允许修改 `
}
// outBanVisit()
观察者模式 = () => {
  const queueObservers = new Set()
  const observe = (fn) => queueObservers.add(fn)
  observe((target) => {
    console.log(target, `{ name: '李四', age: 18 }`)
  })
  const set = (target, key, value, receiver) => {
    const result = Reflect.set(target, key, value, receiver)
    queueObservers.forEach((observe) => observe(target, key, value, receiver))
    return result
  }
  const observable = (obj) => new Proxy(obj, { set })
  const obj = {
    name: '张三',
    age: 18,
  }
  let proxy = observable(obj)
  proxy.name = '李四'
}
观察者模式()
