



interface IRequestOption {
    method:"POST"|"GET" ,
    params:{[x:string]:any},
}

type IRequestType = (url:string,option:IRequestOption) => Promise<any> ;

export const request:IRequestType = async (url,option) => {
    const newOption:{[x:string]:any} = {} ;
    if(option.method === 'GET') {
        url += ('?'+Object.keys(option.params).map(mm => `${mm}=${option.params[mm]}`).join('&'))
    }else if(option.method === 'POST') {
        newOption['body'] = JSON.stringify(option.params) ;
    }

    newOption['url'] = url ;
    newOption['method'] = option.method ;
    newOption['headers'] = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    };

    const res = await fetch(url,newOption) ;
    return res.json() ;
}

export {}

