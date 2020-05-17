
export const countingSort = (originalArray: Array<number>)=>{
  const maximumElement = Math.max(...originalArray)

  let c : Array<number> = (new Array<number>(maximumElement+1)).fill(0)

  originalArray.forEach((value, index)=>{
    c[value]+=1
  })

  c.forEach((value, index)=>{
    if(index>0){
      c[index] = c[index]+c[index-1]
    }
  })

  let b = new Array<number>(originalArray.length)

  for (let i = originalArray.length-1 ; i>=0; i--){

    b[c[originalArray[i]]-1]=originalArray[i]
    c[originalArray[i]] = c[originalArray[i]]-1
    console.log(b)
  }

}
