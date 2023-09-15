import React from "react";
import {Card, List, Space} from "antd";
import PageWrapper from "../../components/PageWrapper";

interface IStatus {
}
interface IProps {
}


/**
 * 类装饰器
 */
type ClassDecoratorType = {new (...args:any[]):any} ;

const classDecorator = <T extends ClassDecoratorType>(value:number) => {
    return (BaseClass:T) => class extends BaseClass {
        test() {
            return `${value}这是类装饰器的test func 是一个function，实现方式类似于react高阶组件，不同的是这个实现是继承的现有类`
        }
        testName = '这是类装饰器的testName字段 是一个string' ;
        firstProps = `这是通过类装饰器传的参数value：${value}` ;
    }
}


/**
 * 属性装饰器
 * @参数:
 * target: 对于静态成员来说是类的构造器，对于实例成员来说是类的原型链。
 * propertyKey: 属性的名称。
 */

type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;


function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const observable:PropertyDecorator = (target:{[x: string|symbol]: any;},propertyKey) => {
    const targetKey = 'get' + capitalizeFirstLetter(propertyKey as string) + 'Val' ;
    target[targetKey] = function () {
        return `function ${targetKey} 执行结果 this ${propertyKey as string} value is ${this[propertyKey]}`
    }
}

/**
 *
 * 方法装饰器
 */
type MethodDecorator = <T>(
    target: Object,//对于静态成员来说是类的构造器，对于实例成员来说是类的原型链。
    propertyKey: string | symbol,//属性的名称。
    descriptor: TypedPropertyDescriptor<T> //属性的描述器。
) => TypedPropertyDescriptor<T> | void;

const methodDecorator:MethodDecorator = (...args) => {
    const descriptor = args[2] ;
    const original = descriptor.value as Function ;
    // @ts-ignore
    descriptor.value = function () {
        return original.call(this, '传入数据1', '传入数据2')
    }
}

function methodDD(query:string) {
    return function (...args:any[]) {
        args[2].value = function () {
            return `query is ${query}`
        }
    }
}

class MethodDecoratorClass {
    @methodDD(':userId')
    getInfo(name:string,age:number,) {
        return`name:${name},age:${age}`
    }
}

const obj = new MethodDecoratorClass() ;

const info = obj.getInfo('dyl',20) ;


/**
 * 参数装饰器
 */
type ParameterDecorator = (
    target: Object,
    propertyKey: string | symbol,//注意是方法的名称，而不是参数的名称
    parameterIndex: number,//参数在方法中所处的位置的下标。
) => void;

const parameterDecorator:ParameterDecorator = (...args) => {
    const propertyKey = args[1] ;
    const parameterIndex = args[2] ;
    console.log(parameterIndex,propertyKey)
}


// 多重装饰器是按照相反的顺序应用的。
// 这背后的想法来自数学：在数学中如果我们有f(g(x))这样的表达式，然后我们会先求得 g(x)的值然后把它传给 f(x)。
@classDecorator(111)
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
                dataSource={[
                    '1.类 类装饰器的参数是类的构造器，如果此装饰器返回了一个值，ta将会被用来代替原有的类构造器。因此类装饰器适合继承一个现有类并向其添加属性或方法',
                    '2.类属性 返回的结果将被忽略。',
                    '3.类方法 如果返回了值，它会被用于替代属性的描述器。方法装饰器不同于属性装饰器的地方在于多了第三个参数descriptor。 通过这个参数我们可以修改方法原本的实现，添加一些共用逻辑。',
                    '4.类访问器 同类方法',
                    '5.类方法的参数 返回的值将会被忽略。' ,
                ]}
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
                <div>类装饰器firstProps 传参测试使用：{this.firstProps}</div>
            </Space>
        </Card>
    }

    propertyDecoratorTest() {
        return <Card>
            <h2>通过属性装饰器给class添加了一个新的method：getTestPropertyDecoratorVal</h2>
            {this.getTestPropertyDecoratorVal()}
        </Card>
    }

    @methodDecorator
    methodDecoratorTest(...args:any[]) {
        console.log(args,'aaa')
        return <Card>
            <h2>方法装饰器测试</h2>
            <p>这些是通过方法装饰器传过来的值:{args}</p>
        </Card>
    }

    paramsDecoratorTest(name:string,age:number) {
        return <Card>
            <h2>参数装饰器</h2>
            <p>react中使报错。。。</p>
        </Card>
    }
    render() {
        return<>
            <PageWrapper>
                <Card>
                    <Space direction={'vertical'} size={'large'}>
                        {this.mainDesc()}
                        {this.classDecoratorTest()}
                        {this.propertyDecoratorTest()}
                        {this.methodDecoratorTest()}
                        {this.paramsDecoratorTest('dyl',20)}
                    </Space>
                </Card>
            </PageWrapper>
        </>
    }
}

