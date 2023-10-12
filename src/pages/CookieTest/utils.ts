/**
 * 解析cookie name=value;name=value
 */

export const handleCookie = ():Array<{key:string,value:string}> => {
    const cookie = document.cookie ;
    if(cookie) {
        return cookie.split(';')
            .map(pp => {
                const array = pp.split('=') ;
                if(array.length === 2) {
                    return {
                        key:pp[0],
                        value:pp[1],
                    }
                }
                return {key:'',value:''}
            })
            .filter(ff => ff.key) ;
    }

    return [] ;
}