/**
 * flatArrayToTree
 * @desc 
 * ```
 * 递归：程序调用自身的编程技巧
 * 
 * 基本思想：将一个复杂问题分解成更小、更易管理的子问题
 * 
 * 递归的要素
 *  基本情况(Base Case)，递归终止的条件，当问题足够小，可以直接解决而不需要进一步递归时，就会返回一个直接的答案
 *  递归步骤(Recursive Step), 这一步中，问题被分解成更小的子问题，并递归地解决这些问题，每个递归调用都向基本情况更近一步
 * ```
 * @example
 *
 * ```js
 * 扁平数组转为树结构
  const flatArray = [
    { id: 1, parentId: null, name: 'root1' },
    { id: 2, parentId: 1, name: 'child1' },
    { id: 3, parentId: 1, name: 'child2' },
    { id: 4, parentId: 2, name: 'grandchild1' },
    { id: 5, parentId: 3, name: 'grandchild2' },
  ];
  const tree = flatArrayToTree(flatArray)
  console.log(tree)
  // 转换为以下树结构
  [
    {
      id: 1,
      parentId: null,
      name: 'root1',
      children: [
        { id: 2, parentId: 1, name: 'child1', children: [ {...} ] },
        { id: 3, parentId: 1, name: 'child2', children: [ {...} ] }
      ]
    }
  ]
 * 
 * ```
 * 
 */
const flatArrayToTree = (flatArray) => {
  const map = new Map()
  flatArray.forEach((item) => {
    map.set(item.id, { ...item, children: [] })
  })
  function buildTree(node) {
    flatArray.forEach((item) => {
      if (item.parentId === node.id) {
        const childNode = map.get(item.id)
        node.children.push(buildTree(childNode))
      }
    })
    return node
  }
  return flatArray
    .filter((item) => item.parentId === null)
    .map((rootNode) => buildTree(map.get(rootNode.id)))
}
/**
 * 树结构转扁平数组
 * @param {*} treeNodes 
 * @example
 * ```js
  const tree = [
    {
      id: 1,
      parentId: null,
      name: 'root1',
      children: [
        {
          id: 2,
          parentId: 1,
          name: 'child1',
          children: [
            {
              id: 4,
              parentId: 2,
              name: 'grandchild1',
              children: [],
            },
          ],
        },
        {
          id: 3,
          parentId: 1,
          name: 'child2',
          children: [
            {
              id: 5,
              parentId: 3,
              name: 'grandchild2',
              children: [],
            },
          ],
        },
      ],
    },
  ]
  console.log(treeToArray(tree))
 * ```
 * @returns 
 */
const treeToArray = (treeNodes) => {
  let result = []
  function traverse(node) {
    const newNode = { ...node }
    delete newNode.children
    result.push(newNode)
    if (node.children) {
      node.children.forEach(traverse)
    }
  }
  treeNodes.forEach(traverse)
  return result
}
