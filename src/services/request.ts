



interface IRequestOption {
    method:"POST"|"GET" ,
    params:{[x:string]:any},
}

type IRequestType = (url:string,option:IRequestOption) => Promise<any> ;

export const request:IRequestType = async (url,option) => {
    const newOption:{[x:string]:any} = {} ;
    const paramsMapArray = Object.keys(option.params)
    if(option.method === 'GET') {
        if(paramsMapArray.length) {
            url += ('?'+paramsMapArray.map(mm => `${mm}=${option.params[mm]}`).join('&'))
        }
    }else if(option.method === 'POST') {
        newOption['body'] = JSON.stringify(option.params) ;
    }

    newOption['url'] = url ;
    newOption['mode'] = 'cors' ;
    newOption['method'] = option.method ;
    newOption['headers'] = {
        'credentials': "include",
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };

    const res = await fetch(url,newOption) ;
    return res.json() ;
}

export {}

