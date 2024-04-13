const getGraph = (data) => {
  const [n, m] = data.shift().split(' ').map(Number)
  const stateList = []
  const clientList = []
  for (let i = 0; i < n; i++) {
    const state = data.shift().split(' ').map(Number)
    stateList.push(state)
  }
  for (let i = 0; i < m; i++) {
    const client = data.shift().split(' ').map(Number)
    clientList.push(client)
  }
  const graph = {}
  for (let i = 0; i < stateList.length; i++) {
    const [id, distance] = stateList[i]
    graph['投递站'] = graph['投递站'] || []
    graph['投递站'].push({ node: id, distance })
    graph[id] = graph[id] || []
    graph[id].push({ node: '投递站', distance })
  }
  for (let i = 0; i < clientList.length; i++) {
    const [id1, id2, distance] = clientList[i]
    graph[id1] = graph[id1] || []
    graph[id1].push({ node: id2, distance })
    graph[id2] = graph[id2] || []
    graph[id2].push({ node: id1, distance })
  }
  return graph
}
const dijkstra = (graph, start) => {
  const distances = Object.keys(graph)
    .map((node) => ({
      node,
      distance: Infinity,
    }))
    .map((item) => {
      if (item.node === start) {
        item.distance = 0
      }
      return item
    })
  for (let i = 0; i < distances.length; i++) {
    const currentNode = distances.reduce(
      (min, node) => (node.distance < min.distance ? node : min),
      { distance: Infinity }
    )
    console.log(currentNode.node)
    console.log(graph)
    for (const neightor of graph[currentNode.node]) {
      const newDistance = currentNode.distance + neightor.distance
      console.log(newDistance, distances[neightor.node].distance)
      if (newDistance < distances[neightor.node].distance) {
        distances[neightor.node].distance = newDistance
      }
    }
  }
  return distances
}

const data = ['3 1', '1 2000', '2 1000', '3 4000', '1 2 500']
const graph = getGraph(data)
const startNode = '投递站'

const shortestPaths = dijkstra(graph, startNode)
console.log(shortestPaths.reduce((sum, node) => sum + node.distance, 0))
