

export const list = [] as Array<{title:number,content:string,show:boolean}> ;
while (list.length < 15) {
    const obj = {title:0,content:'',show:false} as typeof list[number] ;
    obj.title = list.length + 1 ;
    list.push(obj)
}