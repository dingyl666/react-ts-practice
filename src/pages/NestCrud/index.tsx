import React from "react";
import PageWrapper from "../../components/PageWrapper";
import {Alert, Button, Card, Form, Input, message, Select, Space, Table} from "antd";
import {useCheckLogin, DataModel, useGetList, User_Session} from "./utils";
import {userLogin} from "../../services/api";

const NestCrud:React.FC = () => {

    const {loading,list,add,del,up} = useGetList() ;

    const {login,check} = useCheckLogin() ;

    const [form] = Form.useForm<{password:string,name:string}>() ;
    if(!login) {
        return <Form form={form} layout={'horizontal'} onFinish={async e => {
            const {name,password } = e ;
            const res = await userLogin({name,password}) ;

            if(res.message) {
                message.error(res.message)
                return
            }
            if(res) {
                window.sessionStorage.setItem(User_Session,JSON.stringify(res.userInfo))
                message.success('登陆成功') ;
                check() ;
            }
        }}>
            <Form.Item rules={[{required:true}]} name={'name'} label={'name'}>
                <Input />
            </Form.Item>
            <Form.Item rules={[{required:true}]} name={'password'} label={'password'}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type={'primary'} htmlType={'submit'}>提交</Button>
            </Form.Item>
        </Form>
    }
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