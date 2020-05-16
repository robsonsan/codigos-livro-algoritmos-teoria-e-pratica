import {NodeTree, BinarySearchTree} from './BinarySearchTree'

const binarySearchTree = new BinarySearchTree<number>(null)

let arr = [12,5,18,2,9,15,19,13,17]

arr.forEach((value)=>{
  const nodeToBeInserted = new NodeTree<number>(value)
  binarySearchTree.treeInsert(nodeToBeInserted)
  })

const nodeToBeDeleted = binarySearchTree.treeSearch(binarySearchTree.getRootNode(), 18)


if(nodeToBeDeleted){

  binarySearchTree.treeMinimum(nodeToBeDeleted)
  binarySearchTree.treeDelete(nodeToBeDeleted)
}

binarySearchTree.treeWalk()

