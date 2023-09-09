import React, {useEffect, useState} from "react";
import {Alert, Spin} from "antd";
import {IContentItem} from "./interface";
import {list} from "./utils";
import {ContainerCss, ContainerItem, ContentItemCss} from "./css-in-js";
import {useNavigate, useParams,} from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";

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

    const clickItem = (title:number) => {
        setData(value => {
            value.forEach(ff => {
                if(ff.title === title) {
                    ff.show = !ff.show ;
                    if(ff.show) {
                        navigate(`/swagger/${title}`)
                    }else {
                        navigate(`/swagger`)
                    }
                }else {
                    ff.show = false ;
                }
            })
            return [...value]
        })
    }
    return (
        <PageWrapper>
            <Spin spinning={loading} tip={'load data...'}>
                <ContainerCss>
                    {
                        data.map(pp => (
                            <ContainerItem key={pp.title} id={`${pp.title}`}>
                                <Alert onClick={() => clickItem(pp.title)} style={{cursor:'pointer'}} description={<>{'title'+pp.title}</>} />
                                {pp.show ?<ContentItem titleId={pp.title}/>:null}
                            </ContainerItem>
                        ))
                    }
                </ContainerCss>
            </Spin>
        </PageWrapper>

    )
}

export default React.memo(SwaggerMini) ;