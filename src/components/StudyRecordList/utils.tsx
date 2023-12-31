


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
    new RecordList(1,'/swagger','路由锚点练习','模仿swagger的刷新重新定位做了一个类似的交互效果demo'),
    new RecordList(2,'/decorator','装饰器','ts装饰器深入学习'),
    new RecordList(3,'/nest/crud','nest练习','nest crud demo'),
    new RecordList(4,'/wrapper','页面布局练习','传统布局路由导航demo'),
    new RecordList(5,'/cookieTest','cookie登陆练习','nestjs使用cookie实现登陆流程'),
]