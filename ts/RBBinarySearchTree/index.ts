export class RBNodeTree<T>{
  constructor(
    public value:T,
    public leftNode: RBNodeTree<T>|null = null,
    public rightNode: RBNodeTree<T>|null = null,
    public parent : RBNodeTree<T>|null = null,
    public color: "red" | "black" = "black"
  ){

  }
}

export class RBBinarySearchTree<T> {
  constructor(private nodeRoot: RBNodeTree<T>|null){}

  public getRootNode(): RBNodeTree<T>|null{
    return this.nodeRoot
  }

  treeSearch(node: RBNodeTree<T>|null ,value: T): RBNodeTree<T> | null{
    if(node===null || value === node.value){
      return node
    }
    if(value<node.value){
      return this.treeSearch(node.leftNode, value)
    } else{
      return this.treeSearch(node.rightNode, value)
    }
  }

  treeMinimum(node: RBNodeTree<T>): RBNodeTree<T>{
    let currentNode = node
    while(currentNode.leftNode!==null){
      currentNode = currentNode.leftNode
    }
    return currentNode
  }

  treeMaximum(node: RBNodeTree<T>): RBNodeTree<T>{
    let currentNode = node
    while(currentNode.rightNode!==null){
      currentNode = currentNode.rightNode
    }

    return currentNode
  }

  treeSucessor(node: RBNodeTree<T>): RBNodeTree<T>|null{
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

  treeWalk(node: RBNodeTree<T> | null = this.nodeRoot){
    const currentNode = node

    if(currentNode!==null){
      this.treeWalk(currentNode.leftNode)
      console.log(`parent: ${currentNode.parent?.value}, value: ${currentNode.value}, leftChild: ${currentNode.leftNode?.value}, rightChild: ${currentNode.rightNode?.value}, color: ${currentNode.color}`)
      this.treeWalk(currentNode.rightNode)
    }

  }

  public leftRotate(node: RBNodeTree<T>){
    let y = node.rightNode
    if(y){
      node.rightNode = y.leftNode
      if(node.rightNode){
        node.rightNode.parent = node
      }
      y.parent = node.parent

      if(node.parent===null){
        this.nodeRoot = y
      }else{
        if(node === node.parent.leftNode){
          node.parent.leftNode = y
        }else{
          node.parent.rightNode = y
        }
      }

      y.leftNode = node
      node.parent = y
    }

  }

  public rightRotate(node: RBNodeTree<T>){
    let y = node.leftNode
    if(y){
      node.leftNode = y.rightNode
      if(node.leftNode){
        node.leftNode.parent = node
      }
      y.parent = node.parent

      if(node.parent === null){
        this.nodeRoot = y
      }else{
        if(node===node.parent.leftNode){
          node.parent.leftNode = y
        }
        else{
          node.parent.rightNode = y
        }
      }

      y.rightNode = node
      node.parent = y
    }
  }

  treeInsert(node:RBNodeTree<T>){

    if(node===null){
      return
    }

    let leafNode = null
    let currentNode: RBNodeTree<T>|null = this.nodeRoot

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

  private transplant(nodeToBeRemoved: RBNodeTree<T>, nodeToBeInserted: RBNodeTree<T>|null){
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

  treeDelete(node: RBNodeTree<T>){
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


