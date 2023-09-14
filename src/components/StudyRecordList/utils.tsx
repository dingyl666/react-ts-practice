


export class RecordList {
    id = 0 ;
    title = '' ;
    desc = '' ;
    content = '' ;
    path = '' ;
    constructor(id = 0,path='',title = '',desc = '',content = '') {
        this.id = id ;
        this.title = title ;
        this.desc = desc ;
        this.content = content ;
        this.path = path ;
    }
}
export const recordList:RecordList[] = [
    new RecordList(1,'/swagger','第一天','模仿swagger做了一个类似的交互效果demo'),
    new RecordList(2,'/decorator','装饰器','ts装饰器深入学习')
]