class Compile {
  /**
   * 构造函数，用于初始化一个视图模型绑定到具体的DOM元素上。
   * @param {string} el - 用于查询的DOM元素的选择器。
   * @param {Object} vm - 视图模型对象，绑定了数据和逻辑。
   * @returns {Void} 无返回值。
   */
  constructor(el, vm) {
    this.vm = vm // 视图模型对象
    this.el = document.querySelector(el) // 查询并获取指定的DOM元素
    this.fragment = null // 初始化一个空的文档片段，用于后续的DOM操作
    this.init() // 初始化过程，进行必要的设置和绑定 // [ ] 3.1
  }
  /**
   * 初始化函数，将指定的DOM元素转换为文档片段，并对其进行编译，然后将其添加到原始DOM元素中。
   * 如果指定的DOM元素不存在，则打印错误消息。
   */
  init() {
    // 检查是否存在指定的DOM元素
    if (this.el) {
      // 将DOM元素转换为文档片段
      this.fragment = this.nodeToFragment(this.el) // [ ] 3.1.1
      // 对文档片段进行编译
      this.compileElement(this.fragment) // [ ] 3.1.2
      // 将编译后的文档片段添加到原始DOM元素中
      this.el.appendChild(this.fragment)
    } else {
      // 打印错误消息，指示DOM元素不存在
      console.log('DOM元素不存在')
    }
  }
  /**
   * 将一个DOM元素内的所有子元素移动到一个文档片段中，并返回该文档片段。
   * @param {Element} el - 要移动子元素的DOM元素。
   * @return {DocumentFragment} - 包含原DOM元素所有子元素的文档片段。
   */
  nodeToFragment(el) {
    // 创建一个空的文档片段
    var fragment = document.createDocumentFragment()
    var child = el.firstChild
    while (child) {
      // 循环将DOM元素的每个子元素添加到文档片段中
      fragment.appendChild(child)
      // 获取下一个兄弟元素，继续循环
      child = el.firstChild
    }
    return fragment
  }
  /**
   * 编译元素内的节点，对文本节点中的双大括号{{}}内的内容进行处理
   * @param {HTMLElement} el - 需要编译的DOM元素
   */
  compileElement(el) {
    var childNodes = el.childNodes
    var self = this
    ;[].slice.call(childNodes).forEach(function (node) {
      // 检查是否为双大括号绑定文本
      var reg = /\{\{(.*)\}\}/
      var text = node.textContent

      // 如果是元素节点，则递归编译
      // [ ] 3.1.1.1/3.1.1.5.1
      if (self.isElementNode(node)) {
        self.compile(node) // [ ] 3.1.1.2
        // 如果是文本节点且包含双大括号绑定，则编译文本
        // [ ] 3.1.1.3
      } else if (self.isTextNode(node) && reg.test(text)) {
        self.compileText(node, reg.exec(text)[1]) // [ ] 3.1.1.4
      }

      // 如果当前节点有子节点，则递归编译子节点
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node) // [ ] 3.1.1.5
      }
    })
  }
  /**
   * 编译节点的属性，处理指令。
   * @param {Object} node - 要编译的DOM节点，包含属性集合。
   */
  compile(node) {
    var nodeAttrs = node.attributes
    var self = this
    // 遍历节点的所有属性，处理指令
    Array.prototype.forEach.call(nodeAttrs, function (attr) {
      var attrName = attr.name
      // 检查是否为指令
      // [ ] 3.1.1.2.1
      if (self.isDirective(attrName)) {
        var exp = attr.value
        var dir = attrName.substring(2)
        // 判断是事件指令还是v-model指令
        // [ ] 3.1.1.2.2
        if (self.isEventDirective(dir)) {
          // 处理事件指令
          self.compileEvent(node, self.vm, exp, dir) // [ ] 3.1.1.2.3
        } else {
          // 处理v-model指令
          self.compileModel(node, self.vm, exp, dir) // [ ] 3.1.1.2.4
        }
        // 移除已处理的指令属性
        node.removeAttribute(attrName)
      }
    })
  }
  /**
   * 编译并更新文本节点的内容。
   * 该函数首先根据表达式(exp)从视图模型(vm)中获取初始文本值，并将其更新到指定的节点(node)上。
   * 然后，它创建一个监视器(Watcher)，以在表达式的值发生变化时更新节点的内容。
   *
   * @param {Object} node - 需要更新文本内容的DOM节点。
   * @param {string} exp - 用于从视图模型中获取文本值的表达式。
   */
  compileText(node, exp) {
    var self = this
    // 初始化文本值并更新到节点上
    var initText = this.vm[exp]
    this.updateText(node, initText) // [ ] 3.1.1.4.1

    // 创建一个Watcher来监听表达式的变化，并更新节点的文本内容
    // [ ] 3.1.1.4.2
    new Watcher(this.vm, exp, function (value) {
      self.updateText(node, value) // [ ] 3.1.1.4.3
    })
  }
  /**
   * 编译事件绑定
   * @param node 需要绑定事件的DOM节点
   * @param vm Vue实例，用于访问实例方法和数据
   * @param exp 用于在Vue实例中寻找方法的表达式
   * @param dir 事件类型和表达式的组合，以冒号分隔
   */
  compileEvent(node, vm, exp, dir) {
    // 从dir中分离出事件类型
    var eventType = dir.split(':')[1]
    // 尝试从vm的方法中找到对应的方法
    var cb = vm.methods && vm.methods[exp]

    // 如果找到了事件类型和对应的方法，则进行事件监听
    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm), false)
    }
  }
  /**
   * 编译模型，实现数据的双向绑定。
   * @param {Object} node - DOM节点，需要绑定数据的元素。
   * @param {Object} vm - 视图模型，包含需要绑定的数据。
   * @param {String} exp - 表达式，用于在视图模型中访问数据。
   * @param {String} dir - 指令，指示绑定的类型（如v-model）。
   */
  compileModel(node, _vm, exp, _dir) {
    var self = this
    // 根据表达式从视图模型中获取初始值，并更新DOM
    var val = this.vm[exp]
    this.modelUpdater(node, val) // [ ] 3.1.1.2.4.1

    // 创建一个观察者，当数据变化时更新DOM
    // [ ] 3.1.1.2.4.2
    new Watcher(this.vm, exp, function (value) {
      self.modelUpdater(node, value) // [ ] 3.1.1.2.4.3
    })

    // 为节点添加输入事件监听，实现从DOM到数据的更新
    node.addEventListener('input', function (e) {
      var newValue = e.target.value
      // 如果值没有变化，则不进行任何操作
      if (val === newValue) {
        return
      }
      // 更新视图模型中的数据，并更新val的值以避免重复更新
      self.vm[exp] = newValue
      val = newValue
    })
  }
  /**
   * 更新给定节点的文本内容。
   * @param {Node} node - 需要更新文本内容的DOM节点。
   * @param {*} value - 新的文本内容。如果为undefined，则将文本内容清空。
   */
  updateText(node, value) {
    // 根据value的类型，更新node的textContent属性
    node.textContent = typeof value === 'undefined' ? '' : value
  }
  /**
   * 更新模型的值。
   * 该函数用于将给定的值更新到指定的节点上。如果提供的值是未定义的，则节点的值将被空字符串替换。
   *
   * @param {Object} node - 要更新的节点对象。该对象应包含一个value属性。
   * @param {*} value - 要设置的新值。如果此参数是未定义的，则节点的值将被设置为空字符串。
   * @param {*} _oldValue - 节点的旧值。此参数在函数体中未使用，但可用于记录或验证目的。
   */
  modelUpdater(node, value, _oldValue) {
    // 根据value是否未定义来更新node的value属性
    node.value = typeof value === 'undefined' ? '' : value
  }
  /**
   * 判断给定的属性是否为指令
   * @param {string} attr - 待检查的属性名
   * @return {boolean} 如果属性以 'v-' 开头，则返回 true，否则返回 false
   */
  isDirective(attr) {
    // 检查属性名是否以 'v-' 开头
    return attr.indexOf('v-') == 0
  }
  /**
   * 检查给定的指令是否为事件指令
   * @param {string} dir - 待检查的指令字符串
   * @returns {boolean} - 如果指令以 'on:' 开头，则返回 true，否则返回 false
   */
  isEventDirective(dir) {
    // 检查指令字符串是否以 'on:' 开头
    return dir.indexOf('on:') === 0
  }
  /**
   * 检查给定的节点是否为元素节点。
   *
   * @param {Object} node - 待检查的DOM节点。
   * @returns {boolean} 如果节点是元素节点，则返回true；否则返回false。
   */
  isElementNode(node) {
    // 检查节点类型是否为元素节点（1表示元素节点）
    return node.nodeType == 1
  }
  /**
   * 检查给定的节点是否为文本节点。
   *
   * @param {Object} node - 需要检查的DOM节点对象。
   * @returns {boolean} 如果节点是文本节点，则返回true；否则返回false。
   */
  isTextNode(node) {
    // 检查节点的类型是否为文本节点（Node.TEXT_NODE）
    return node.nodeType == 3
  }
}
