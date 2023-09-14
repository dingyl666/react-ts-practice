
import React from "react";
import {Card, List, Space} from "antd";

interface IStatus {
}
interface IProps {
}


/**
 * 类装饰器
 */
type ClassDecoratorType = {new (...args:any[]):any} ;

const classDecorator = <T extends ClassDecoratorType>(BaseClass:T) => {
    return class extends BaseClass {
        test() {
            return `这是类装饰器的test func 是一个function，实现方式类似于react高阶组件，不同的是这个实现是继承的现有类`
        }
        testName = '这是类装饰器的testName字段 是一个string'
    }
}


/**
 * @参数:
 * target: 对于静态成员来说是类的构造器，对于实例成员来说是类的原型链。
 * propertyKey: 属性的名称。
 */

type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;


function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const observable:PropertyDecorator = (target,propertyKey) => {
    const targetKey = 'get' + capitalizeFirstLetter(propertyKey as string) + 'val' ;

    // @ts-ignore
    target[targetKey] = function () {
        // @ts-ignore
        return  `this ${propertyKey} value is ${target[propertyKey]}`
    }
}

@classDecorator
export class DecoratorDemo extends React.PureComponent<IProps, IStatus> {
    [x: string]: any;

    constructor(props:IProps) {
        super(props);
    }

    @observable
    testPropertyDecorator = '111' ;

    mainDesc = () => {
        return <>
            <h1>装饰器本质是一种特殊的函数被应用在：</h1>
            <List
                bordered={true}
                dataSource={['1.类 类装饰器的参数是类的构造器，如果此装饰器返回了一个值，ta将会被用来代替原有的类构造器。因此类装饰器适合继承一个现有类并向其添加属性或方法','2.类属性','3.类方法','4.类访问器','5.类方法的参数']}
                renderItem={item =>(
                    <List.Item key={item}>
                        {item}
                    </List.Item>
                )}
            />
        </>
    }

    classDecoratorTest() {
        return <Card>
            <Space direction={'vertical'}>
                <h2>类装饰器实现测试</h2>
                <div>类装饰器test func测试使用：{this.test()}</div>
                <div>类装饰器testName string测试使用：{this.testName}</div>
            </Space>
        </Card>
    }

    propertyDecoratorTest() {
        return <Card>
            {this.getTestPropertyDecorator()}
        </Card>
    }
    render() {
        return <Card>
            <Space direction={'vertical'} size={'large'}>
                {this.mainDesc()}
                {this.classDecoratorTest()}
                {this.propertyDecoratorTest()}
            </Space>
        </Card>;
    }
}

