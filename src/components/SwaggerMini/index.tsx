import React, {useEffect, useState} from "react";
import {Alert, Spin} from "antd";
import {IContentItem} from "./interface";
import {list} from "./utils";
import {ContainerCss, ContainerItem, ContentItemCss} from "./css-in-js";
import {useNavigate, useParams,} from "react-router-dom";

const ContentItem:React.FC <IContentItem> = React.memo((props) => {
    const {titleId} = props ;
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        new Promise(resolve => {
            setTimeout(() => {
                resolve('')
            },1000)
        }).then(() => {
            setLoading(false)
        })
    },[])
    return (
        <ContentItemCss>
            {
                loading ? <Spin spinning={loading} />
                    :<>
                    content...{titleId}
                    </>
            }
        </ContentItemCss>
    )
})
const SwaggerMini:React.FC = () => {
    const [loading,setLoading] = useState(true) ;
    const [data,setData] = useState([...list]) ;
    const params = useParams<{id:string}>();
    const navigate = useNavigate();

    const init = async () => {
        await new Promise(resolve => {
            setTimeout(() => {
                resolve('')
            },1000)
        })

        setLoading(false) ;
        if(params?.id) {
            setData(value => {
                const find = value.find(dd => dd.title === Number(params.id)) ;
                if(find) {
                    find.show = true ;
                    const dom = document.getElementById(`${find.title}`) ;
                    console.log(dom,'ddd')
                    if(dom && dom.scrollIntoView) {
                        dom.scrollIntoView({
                            behavior:"smooth"
                        })
                    }
                }
                return [...value] ;
            })
        }else {
            window.scrollTo({
                top:0,
                behavior:'smooth'
            })
        }
    }
    useEffect(() => {
        init().then()
    },[])
    return (
        <Spin spinning={loading} tip={'load data...'}>
            <ContainerCss>
                {
                    data.map(pp => (
                        <ContainerItem key={pp.title} id={`${pp.title}`}>
                            <Alert onClick={() => {
                                setData(value => {
                                    value.forEach(ff => {
                                        if(ff.title === pp.title) {
                                            ff.show = !ff.show ;
                                            if(ff.show) {
                                                navigate(`/swagger/${pp.title}`)
                                            }else {
                                                navigate(`/`)
                                            }
                                        }else {
                                            ff.show = false ;
                                        }
                                    })
                                    return [...value]
                                })
                            }} style={{cursor:'pointer'}} description={<>{'title'+pp.title}</>} />
                            {pp.show ?<ContentItem titleId={pp.title}/>:null}
                        </ContainerItem>
                    ))
                }
            </ContainerCss>
        </Spin>
    )
}

export default React.memo(SwaggerMini) ;