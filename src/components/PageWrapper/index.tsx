import React from "react";
import {IPageWrapper} from "./interface";
import {Button, Divider} from "antd";
import {Link} from "react-router-dom";
import {PageWrapperContainerCss} from "./css-in-js";


const PageWrapper:React.FC <IPageWrapper> = (props) => {

    const {children} = props ;

    const childrenNode = children ?? <></> ;

    return (
        <PageWrapperContainerCss>
            <Link to={'/'} >
                <Button type={'dashed'}>
                    点我回到Home
                </Button>
            </Link>
            <Divider orientation={'left'}>分割线</Divider>
            {childrenNode}
        </PageWrapperContainerCss>
    )
}


export default React.memo(PageWrapper)