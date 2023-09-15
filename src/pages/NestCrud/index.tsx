import React from "react";
import PageWrapper from "../../components/PageWrapper";
import {Alert, Button, Card, Space, Table} from "antd";
import {DataModel, useGetList} from "./utils";

const NestCrud:React.FC = () => {
    const {loading,list,add,del,up} = useGetList() ;
    const columns = [
        {
            title:'id',
            dataIndex:'userId',
        },
        {
            title:'名字',
            dataIndex:'name',
        },
        {
            title:'操作',
            render:(record:DataModel) => {
               return <Space>
                    <Button size={'large'} type={'dashed'} danger={true} onClick={() => del(record.userId)}>删除</Button>
                    <Button size={'large'} type={'primary'} onClick={() => up(record.userId)}>更新</Button>
                </Space>
            }
        }
    ]
    return (
        <PageWrapper>
            <Alert description={'nest crud 接口测试'} />
            <p></p>
            <Card>
                <Space direction={'vertical'} size={'large'}>
                    <Button style={{background:'#4660e0',color:'white'}} type={'dashed'} onClick={add}>增加数据</Button>
                    <Table
                        columns={columns}
                        pagination={false}
                        size={'large'}
                        bordered={true}
                        dataSource={list}
                        loading={loading}
                        rowKey={record => record.userId}
                    />
                </Space>
            </Card>
        </PageWrapper>
    )
}

export default React.memo(NestCrud)