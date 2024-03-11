// 原型链；构造函数；组合；原型式；寄生式；寄生组合式；
function 原型链() {
  function Parent() {
    this.name = 'parent'
    this.play = [1, 2, 3]
  }
  function Child() {
    this.type = 'child'
  }
  Child.prototype = new Parent()
  const 实现 = () => {
    const child = new Child()
    console.log(child.play)
  }
  const 问题 = () => {
    const s1 = new Child()
    const s2 = new Child()
    s1.play.push(4)
    console.log(s1.play, s2.play) // [1, 2, 3, 4] [1, 2, 3]；原因：实例使用同一原型对象，共享空间
  }
  问题()
}

const 构造函数 = () => {
  function Parent() {
    this.name = 'parent'
  }
  Parent.prototype.getName = function () {
    console.log(this.name)
  }
  function Child() {
    Parent.call(this)
    this.type = 'child'
  }
  let child = new Child()
  console.log('child:', child)
  console.log('child.name:', child.getName()) // 报错
}
const 组合 = () => {
  function Parent() {
    this.name = 'parent'
    this.play = [1, 2, 3]
  }
  Parent.prototype.getName = function () {
    return this.name
  }
  function Child() {
    Parent.call(this)
    this.type = 'child'
  }
  // 首次调用 Parent()
  Child.prototype = new Parent()
  // 手动挂上构造器，指向自己的构造函数
  Child.prototype.constructor = Child
  const s1 = new Child()
  const s2 = new Child()
  s1.play.push(4)
  console.log(s1.play, s2.play) // [ 1, 2, 3, 4 ] [ 1, 2, 3 ]
  console.log(s1.getName()) // parent
  console.log(s2.getName()) // parent
}
const 原型式 = () => {
  const parent = {
    name: 'parent',
    friends: ['p1', 'p2', 'p3'],
    getName: function () {
      return this.name
    },
  }
  const person1 = Object.create(parent)
  person1.name = 'tom'
  person1.friends.push('jerry')
  const person2 = Object.create(parent)
  person2.friends.push('lucy')
  console.log(person1.name) // 'tom'
  console.log(person1.name === person1.getName()) // true
  console.log(person2.name) // 'parent'
  console.log(person1.friends) // [ 'p1', 'p2', 'p3', 'jerry', 'lucy' ]
  console.log(person2.friends) // [ 'p1', 'p2', 'p3', 'jerry', 'lucy' ]
}
const 寄生式 = () => {
  const parent = {
    name: 'parent',
    friends: ['p1', 'p2', 'p3'],
    getName: function () {
      return this.name
    },
  }
  function clone(original) {
    const clone = Object.create(original)
    clone.getFriends = function () {
      return this.friends
    }
    return clone
  }
  const person = clone(parent)
  console.log(person.getName(), 'parent')
}
const 寄生组合式 = () => {
  function clone(parent, child) {
    child.prototype = Object.create(parent.prototype) // 减少组合继承中多进行了一次构造的过程
    child.prototype.constructor = child
  }
  function Parent() {
    this.name = 'parent'
    this.play = [1, 2, 3]
  }
  Parent.prototype.getName = function () {
    return this.name
  }
  function Child() {
    Parent.call(this)
    this.friends = 'child'
  }
  clone(Parent, Child)
  Child.prototype.getFriends = function () {
    return this.friends
  }
  const person = new Child()
  console.log(
    person,
    "Child { name: 'parent', play: [ 1, 2, 3 ], friends: 'child' }"
  )
  console.log(person.getName(), 'parent')
  console.log(person.getFriends(), 'child')
}
