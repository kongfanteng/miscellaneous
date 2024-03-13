;`提纲：属性的简写; 属性名表达式; super关键字; 扩展运算符的应用; 属性的遍历; 对象新增的方法;`
属性的简写 = `
  const baz = {foo: foo}
  等同于
  const baz = {foo}

  const o = {
    method(){
      return 'hello'
    }
  }
  等同于
  const o = {
    method: function(){
      return 'hello'
    }
  }

  在函数中作为返回值
  function getPoint(){
    const x = 1
    const y = 1
    return {x,y}
  }

  报错: 简写的对象方法用作构造函数
  const obj = {
    fn(){
      this.foo = 'bar'
    }
  }
  new obj.fn()
`
属性名表达式 = () => {
  表达式放到括号内 = () => {
    let lastWorld = 'last world'
    const a = {
      'first world': 'hello',
      [lastWorld]: 'world',
    }
    console.log(a['first world'], 'hello')
    console.log(a[lastWorld], 'world')
    console.log(a['last world'], ' ')
  }
  // 表达式放到括号内()
  表达式定义方法名 = () => {
    let obj = {
      ['h' + 'ello']() {
        return 'hi'
      },
    }
    console.log(obj.hello(), 'hi')
  }
  // 表达式定义方法名()
  表达式和简洁表达式不同同时使用 = `
    const foo = 'bar'
    const bar = 'abc'
    const baz = {[foo]}; 报错

    const foo ='bar'
    const baz = { [foo]: 'abc' }
  `
  属性名表达式是对象 = () => {
    const keyA = { a: 1 }
    const myObj = {
      [keyA]: 'valueA',
    }
    console.log(myObj, "{ '[object Object]': 'valueA' }")
  }
  属性名表达式是对象()
}
// 属性名表达式()
super关键字 = () => {
  const proto = {
    foo: 'hello',
  }
  const obj = {
    foo: 'world',
    find() {
      return super.foo
    },
  }
  Object.setPrototypeOf(obj, proto)
  console.log(obj.find(), 'hello')
}
// super关键字()
扩展运算符的应用 = () => {
  应用 = () => {
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
    console.log(x, y, z, '1 2 { a: 3, b: 4 }')
  }
  // 应用()
  浅拷贝 = () => {
    let obj = { a: { b: 1 } }
    let { ...x } = obj
    obj.a.b = 2
    console.log(x.a.b, '2')
  }
  浅拷贝()
}
// 扩展运算符的应用()
属性的遍历 = () => {
  console.log(
    Reflect.ownKeys({ [Symbol()]: 0, b: 0, 10: 0 }),
    "[ '10', 'b', Symbol() ]"
  )
}
// 属性的遍历()
对象新增的方法 = () => {
  // ObjectIs; ObjectAssign; ObjectGetOwnPropertyDescriptors; ObjectSetPrototypeOfObjectGetPrototypeOf; ObjectKeysObjectValuesObjectEntries; ObjectFromEntries
  ObjectIs = () => {
    console.log(+0 === -0, 'true')
    console.log(NaN === NaN, 'false')
    console.log(Object.is(+0, -0), 'false')
    console.log(Object.is(NaN, NaN), 'true')
  }
  // ObjectIs()
  ObjectAssign = () => {
    const target = { a: 1, b: 1 }
    const source1 = { b: 2, c: 2 }
    const source3 = { c: 3 }
    console.log(Object.assign(target, source1, source3), '{ a: 1, b: 2, c: 3 }')
  }
  // ObjectAssign()
  ObjectGetOwnPropertyDescriptors = () => {
    const obj = {
      foo: '123',
      get bar() {
        return 'abc'
      },
    }
    console.log(
      Object.getOwnPropertyDescriptors(obj),
      `{ foo: 
          { value: '123',
            writable: true,
            enumerable: true,
            configurable: true 
          },
          bar: 
          { get: [λ: get bar],
            set: undefined,
            enumerable: true,
            configurable: true 
          } 
        }
      `
    )
  }

  // ObjectGetOwnPropertyDescriptors()
  ObjectSetPrototypeOfObjectGetPrototypeOf = () => {
    ObjectSetPrototypeOf = () => {
      const o = Object.setPrototypeOf({}, null)
      console.log(o, '{}')
    }
    // ObjectSetPrototypeOf()
    ObjectGetPrototypeOf = () => {
      const obj = { foo: 'bar', baz: 42 }
      console.log(Object.getPrototypeOf(obj), '{}')
    }
    ObjectGetPrototypeOf()
  }
  // ObjectSetPrototypeOfObjectGetPrototypeOf()
  ObjectKeysObjectValuesObjectEntries = () => {
    ObjectKeys = () => {
      const obj = { foo: 'bar', baz: 42 }
      console.log(Object.keys(obj), `[ 'foo', 'baz' ]`)
    }
    // ObjectKeys()
    ObjectValues = () => {
      const obj = { foo: 'bar', baz: 42 }
      console.log(Object.values(obj), `[ 'bar', 42 ]`)
    }
    // ObjectValues()
    ObjectEntries = () => {
      const obj = { foo: 'bar', baz: 42 }
      console.log(Object.entries(obj), `[ [ 'foo', 'bar' ], [ 'baz', 42 ] ]`)
    }
    ObjectEntries()
  }
  // ObjectKeysObjectValuesObjectEntries()
  ObjectFromEntries = () => {
    console.log(
      Object.fromEntries([
        ['foo', 'bar'],
        ['baz', 42],
      ]),
      `{ foo: 'bar', baz: 42 }`
    )
  }
  ObjectFromEntries()
}
对象新增的方法()
