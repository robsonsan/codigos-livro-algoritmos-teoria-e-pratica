import {RBNodeTree, RBBinarySearchTree} from './RBBinarySearchTree'
import {countingSort} from './CountingSort'
import Graph, {Edge, NodeGraph} from './GraphAlgorithms/BFS'

// const rbBinarySearchTree = new RBBinarySearchTree<number>(null)

// // let arr = [12,5,18,2,9,15,19,13,17]

// let arr = [7,4,11,3,6,2,9,18,14,19,12,17,22,20]

// arr.forEach((value)=>{
//   const nodeToBeInserted = new RBNodeTree<number>(value)
//   rbBinarySearchTree.treeInsert(nodeToBeInserted)
//   })

// // binarySearchTree.treeWalk()

// const nodeToBeLeftRotated = rbBinarySearchTree.treeSearch(rbBinarySearchTree.getRootNode(), 11)


// // if(nodeToBeDeleted){

// //   binarySearchTree.treeMinimum(nodeToBeDeleted)
// //   binarySearchTree.treeDelete(nodeToBeDeleted)
// // }

// // binarySearchTree.treeWalk()

// if(nodeToBeLeftRotated){
//   rbBinarySearchTree.rightRotate(nodeToBeLeftRotated)
//   rbBinarySearchTree.treeWalk()
// }

// countingSort([2,5,3,0,2,3,0,3])


const v : NodeGraph ={id: 1, content: "v", color: "None", distance: Infinity, parent: null}
const r : NodeGraph ={id: 2, content: "r", color: "None", distance: Infinity, parent: null}
const s : NodeGraph ={id: 3, content: "s", color: "None", distance: Infinity, parent: null}
const w : NodeGraph ={id: 4, content: "w", color: "None", distance: Infinity, parent: null}
const x : NodeGraph ={id: 6, content: "x", color: "None", distance: Infinity, parent: null}
const u : NodeGraph ={id: 7, content: "u", color: "None", distance: Infinity, parent: null}
const t : NodeGraph ={id: 5, content: "t", color: "None", distance: Infinity, parent: null}
const y : NodeGraph ={id: 8, content: "y", color: "None", distance: Infinity, parent: null}

const nodes = [v,r,s,w,x,u,t,y]

const edges: Array<Edge> = [
  {value: [v,r]},
  {value: [r,v]},
  {value: [r,s]},
  {value: [s,r]},
  {value: [s,w]},
  {value: [w,s]},
  {value: [w,t]},
  {value: [t,w]},
  {value: [w,x]},
  {value: [x,w]},
  {value: [x,t]},
  {value: [t,x]},
  {value: [x,u]},
  {value: [u,x]},
  {value: [t,u]},
  {value: [u,t]},
  {value: [u,y]},
  {value: [y,u]},
  {value: [x,y]},
  {value: [y,x]}
 ]


const graph = new Graph(nodes, edges)

graph.bfs(s)


