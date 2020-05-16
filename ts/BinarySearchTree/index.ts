export class NodeTree<T>{
  constructor(public value:T, public leftNode: NodeTree<T>|null = null, public rightNode: NodeTree<T>|null = null, public parent : NodeTree<T>|null = null){

  }
}

export class BinarySearchTree<T> {
  constructor(private nodeRoot: NodeTree<T>|null){}

  public getRootNode(): NodeTree<T>|null{
    return this.nodeRoot
  }

  treeSearch(node: NodeTree<T>|null ,value: T): NodeTree<T> | null{
    if(node===null || value === node.value){
      return node
    }
    if(value<node.value){
      return this.treeSearch(node.leftNode, value)
    } else{
      return this.treeSearch(node.rightNode, value)
    }
  }

  treeMinimum(node: NodeTree<T>): NodeTree<T>{
    let currentNode = node
    while(currentNode.leftNode!==null){
      currentNode = currentNode.leftNode
    }
    return currentNode
  }

  treeMaximum(node: NodeTree<T>): NodeTree<T>{
    let currentNode = node
    while(currentNode.rightNode!==null){
      currentNode = currentNode.rightNode
    }

    return currentNode
  }

  treeSucessor(node: NodeTree<T>): NodeTree<T>|null{
    let initialNode = node
    if(initialNode.rightNode!==null){
      return this.treeMinimum(initialNode.rightNode)
    }

    let nextNode = initialNode.parent
    while(nextNode!==null && initialNode===nextNode.rightNode){
      initialNode = nextNode
      nextNode = nextNode.parent
    }

    return nextNode
  }

  treeWalk(node: NodeTree<T> | null = this.nodeRoot){
    const currentNode = node

    if(currentNode!==null){
      this.treeWalk(currentNode.leftNode)
      console.log(`parent: ${currentNode.parent?.value}, value: ${currentNode.value}, leftChild: ${currentNode.leftNode?.value}, rightChild: ${currentNode.rightNode?.value}`)
      this.treeWalk(currentNode.rightNode)
    }

  }

  treeInsert(node:NodeTree<T>){

    if(node===null){
      return
    }

    let leafNode = null
    let currentNode: NodeTree<T>|null = this.nodeRoot

    while (currentNode!==null){
      leafNode = currentNode
      currentNode = (node.value<currentNode.value)?currentNode.leftNode: currentNode.rightNode
    }

    if(leafNode===null){
      this.nodeRoot = node
      return
    }

    node.parent = leafNode

    if(node.value < leafNode.value){
      leafNode.leftNode = node
    } else{
      leafNode.rightNode = node
    }

  }

  private transplant(nodeToBeRemoved: NodeTree<T>, nodeToBeInserted: NodeTree<T>|null){
    if(nodeToBeRemoved.parent===null){
      this.nodeRoot = nodeToBeInserted
      return
    }

    if(nodeToBeRemoved === nodeToBeRemoved.parent.leftNode){
      nodeToBeRemoved.parent.leftNode = nodeToBeInserted
    } else{
      nodeToBeRemoved.parent.rightNode = nodeToBeInserted
    }

    if(nodeToBeInserted!==null){
      nodeToBeInserted.parent = nodeToBeRemoved.parent
    }
  }

  treeDelete(node: NodeTree<T>){
    if(node.leftNode===null){
      this.transplant(node, node.rightNode)
    } else{
      if(node.rightNode === null){
        this.transplant(node, node.leftNode)
      }

      else{
        let y = this.treeMinimum(node.rightNode)
        if(y.parent !== node){
          this.transplant(y, y.rightNode)
          y.rightNode = node.rightNode
          y.rightNode.parent = y
        }
        this.transplant(node, y)
        y.leftNode = node.leftNode
        y.leftNode.parent = y
      }
    }
  }
}


