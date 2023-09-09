import React from "react";
import {Alert, Divider, List, message, Typography} from "antd";
import {recordList} from "./utils";
import {StudyRecordListContainerCss} from "./css-in-js";
import {useNavigate} from "react-router-dom";

const StudyRecordList:React.FC = () => {

    const navigate = useNavigate() ;
    const clickListItem = (path:string) => {
        if(path) {
            navigate(path) ;
        }else {
            message.warning('这个记录没有详情页呢～').then( )
        }
    }
    return (
        <StudyRecordListContainerCss>
            <Alert description={'学习记录'} type={'success'} />
            <Divider  orientation={'left'}>分割线</Divider>
            <List
                // header={<div>Header</div>}
                // footer={<div>Footer</div>}
                bordered
                dataSource={recordList}
                renderItem={(item) => (
                    <List.Item className={'list-item'} onClick={() => clickListItem(item.path)}>
                        <Typography.Text mark>[{item.title}]</Typography.Text>
                        <span>{item.desc}</span>
                        <span>点击查看</span>
                    </List.Item>
                )}
            />
        </StudyRecordListContainerCss>
    )
}

export default React.memo(StudyRecordList)