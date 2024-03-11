// 提纲：递归；尾递归；应用场景；
递归 = () => {
  迭代实现pow = () => {
    function pow(x, n) {
      let result = 1
      for (let i = 0; i < n; i++) {
        result *= x
      }
      return result
    }
    console.log(pow(2, 3), 8)
  }
  递归实现pow = () => {
    function pow(x, n) {
      if (n === 1) {
        return x
      } else {
        return x * pow(x, n - 1)
      }
    }
    console.log(pow(3, 3), 27)
  }
  递归实现pow()
}
尾递归 = () => {
  普通递归阶乘 = () => {
    function factorial(n) {
      if (n === 1) return 1
      return n * factorial(n - 1)
    }
    factorial(5)
    console.log(factorial(5), '120')
  }
  尾递归阶乘 = () => {
    function factorial(n, total = 1) {
      if (n === 1) return total
      return factorial(n - 1, n * total)
    }
    console.log(factorial(5), '120')
  }
  尾递归阶乘()
}
应用场景 = () => {
  数组求和 = () => {
    const sumArray = (arr, total = 0) => {
      if (arr.length === 0) return total
      return sumArray(arr, total + arr.pop())
    }
    console.log(sumArray([1, 2, 5, 7, 5]), '20')
  }
  斐波那契数列 = () => {
    factorial = (n, start = 1, total = 1) => {
      if (n <= 2) return total
      return factorial(n - 1, total, total + start)
    }
    console.log(factorial(7), '13')
  }
  数组扁平化 = () => {
    // [1, 2, 3, [4, 5, 6], 7]
    flat = (arr = [], result = []) => {
      arr.forEach((v) => {
        if (Array.isArray(v)) {
          result = result.concat(flat(v, []))
        } else {
          result.push(v)
        }
      })
      return result
    }
    console.log(flat([1, 2, 3, [4, 5, 6], 7]), '[ 1, 2, 3, 4, 5, 6, 7 ]')
  }
  数组对象格式化 = () => {
    const obj = {
      a: '1',
      b: {
        c: 2,
        D: { E: 3 },
      },
    }
    keysLower = (obj) => {
      const reg = /([A-Z]+)/g
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          let temp = obj[key]
          if (reg.test(key.toString())) {
            temp = obj[key.replace(reg, (result) => result.toLowerCase())] =
              obj[key]
            delete obj[key]
          }
          if (
            typeof temp == 'object' ||
            Object.prototype.toString.call(temp) === '[object Array]'
          ) {
            keysLower(temp)
          }
        }
      }
      return obj
    }
    console.log(keysLower(obj), "{ a: '1', b: { c: 2, d: { e: 3 } } }")
  }
  数组对象格式化()
}
应用场景()
