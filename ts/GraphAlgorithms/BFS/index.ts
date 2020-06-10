export interface NodeGraph{
  id: number;
  content: string;
  distance: number;
  parent: NodeGraph|null;
  color: string;

}

class ListElement{
  element: NodeGraph;
  nextElement: ListElement | null;

  constructor(element: NodeGraph, nextElement: ListElement| null = null){
    this.element = element;
    this.nextElement = nextElement;
  }

  setNextElement (value: NodeGraph| null){
    if(value === null){
      this.nextElement = null
    }
    else{
      this.nextElement = new ListElement(value)
    }
    
  }

  getNextElement (){
    return this.nextElement
  }
}

class LinkedList {
  root: ListElement

  constructor(rootElement: NodeGraph){
    this.root = new ListElement(rootElement)
  }

  insertElement(newElement: NodeGraph){
    let element = this.root
    
    while(element.nextElement!==null){
      element = element.nextElement
    }

    element.nextElement = new ListElement(newElement)
  }
}

interface AdjNode {
  id: number;
  list: LinkedList|null;
}

export interface Edge{
  value: [NodeGraph, NodeGraph]
}

class Queue{
  nodes: NodeGraph[]=[];

  enqueue(node: NodeGraph){
    this.nodes.push(node)
  }

  dequeue(): NodeGraph|undefined{
    return this.nodes.shift()
  }
}

class Graph {
  
  nodes: NodeGraph[];
  adjList: AdjNode[]=[];

  constructor(nodes: NodeGraph[],edges: Edge[] ){
    this.nodes = nodes;
    this.startAdjList();
    edges.forEach(
      edge=>{
        const findPositionListToAddNode = this.adjList.find(itemList=>itemList.id===edge.value[0].id)
        // console.log(findPositionListToAddNode)
        if(findPositionListToAddNode!==undefined){
          if(findPositionListToAddNode.list === null){
            findPositionListToAddNode.list = new LinkedList(edge.value[1])
          }else{
            findPositionListToAddNode.list.insertElement(edge.value[1])
          }
          
        }
      }
    );

    // console.log(this.adjList)
  }

  private startAdjList() : void{
    this.nodes.map(
      (node)=>{
        this.adjList.push(
          {
            id: node.id,
            list: null
          }
        )
      }
    )
  }

  public bfs(s: NodeGraph ): void{
    this.adjList.forEach(
      item=>{
        const nodeFind = this.nodes.find(node=>node.id===item.id)
        if(nodeFind!==undefined){
          let strReturn = nodeFind?.id + nodeFind?.content + "->";
          if(item.list!==null){
            let element = item.list.root
            strReturn+=element.element.content
            while(element.nextElement!==null){
              element = element.nextElement
              strReturn+="->" + element.element.content
            }
            console.log(strReturn)
          }
        }
        
      }
    )

    
    this.nodes.forEach(

      node=>{
        node.color = "WHITE",
        node.distance = Infinity
        node.parent = null
      }
    )

    
    s.color = "GRAY"
    s.distance=0
    s.parent = null

    const Q = new Queue();

    Q.enqueue(s)

    while(Q.nodes.length>0){
      const u = Q.dequeue()
      

      if(u!==undefined){
        const findAdjList = this.adjList.find(item=>item.id == u.id)

        if(findAdjList !== undefined && findAdjList.list!==null){
          let element: ListElement|null = findAdjList.list.root

          while(element!==null){
            if(element.element.color==="WHITE"){
              element.element.color = "GRAY"
              element.element.distance = u.distance + 1
              element.element.parent = u
              Q.enqueue(element.element)
            }
            element = element.nextElement
          }
        }

        u.color = "BLACK"
          
      }
    }

    console.log(this.nodes)


  }

  

}

export default Graph