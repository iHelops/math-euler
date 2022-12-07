import React, {FC, useState} from 'react';
import style from './Euler.module.scss'
import {Button, Col, Form, Input, InputNumber, notification, Row, Table, Typography} from "antd";
import {eulerData} from "../../types/type";
import {Parser} from 'expr-eval'

const { Title, Text } = Typography

const Euler: FC = () => {
    const [taskSolved, setTaskSolved] = useState<boolean>(false)

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (message: string, description: string, type: 'error' | 'success') => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const tableColumns = [
        {
            title: 'x',
            dataIndex: 'x',
            key: 'x'
        },
        {
            title: 'y',
            dataIndex: 'y',
            key: 'y'
        },
        {
            title: 'f(x, y)',
            dataIndex: 'function',
            key: 'function'
        }
    ]

    const [tableSource, setTableSource] = useState<object[]>([])
    const [result, setResult] = useState<number | null>(null)

    const onFormSubmit = (data: eulerData) => {
        try {
            const tableData = [
                {
                    key: 0,
                    x: data.intervalStart,
                    y: data.initialY,
                    function: +Parser.evaluate(data.equation, {x: data.intervalStart, y: data.initialY}).toFixed(2)
                }
            ]

            for (let value = data.intervalStart + data.step; value <= data.intervalEnd; value += data.step) {
                const newY = tableData[tableData.length - 1].y + data.step * Parser.evaluate(data.equation, {
                    x: tableData[tableData.length - 1].x,
                    y: tableData[tableData.length - 1].y
                })

                const newData = {
                    key: tableData.length,
                    x: +value.toFixed(2),
                    y: +newY.toFixed(2),
                    function: +Parser.evaluate(data.equation, {x: value, y: newY}).toFixed(2)
                }

                tableData.push(newData)
            }

            setTableSource(tableData)
            setResult(tableData[tableData.length - 1].y)
            setTaskSolved(true)
        } catch (e) {
            openNotification('Неверное уравнение', 'Уравнение y\' содержит ошибку. Исправьте ее для продолжения.', 'error')
        }
    }

    return (
        <div className={style.euler}>
            {contextHolder}
            <div className='container'>
                <div className={style.card}>
                    <Form layout='vertical' requiredMark={false} onFinish={onFormSubmit}>
                        <Row gutter={15}>
                            <Col xs={24} sm={12}>
                                <Form.Item label="Уравнение (y')" name='equation' rules={[{ required: true, message: '' }]}>
                                    <Input placeholder='x*(y^2)'/>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item label="Начальное значение y" name='initialY' rules={[{ required: true, message: '' }]}>
                                    <InputNumber style={{ width: '100%' }} placeholder='1'/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={15}>
                            <Col xs={24} sm={12}>
                                <Form.Item label="Начало отрезка (x0)" name='intervalStart' rules={[{ required: true, message: '' }]}>
                                    <InputNumber style={{ width: '100%' }} placeholder='0'/>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item label="Конец отрезка (xn)" name='intervalEnd' rules={[{ required: true, message: '' }]}>
                                    <InputNumber style={{ width: '100%' }} placeholder='1'/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Шаг (h)" name='step' rules={[{ required: true, message: '' }]}>
                            <InputNumber min={0.1} step='0.1' style={{ width: '100%' }} placeholder='0.1'/>
                        </Form.Item>
                        <Form.Item style={{marginBottom: 0}}>
                            <Button type='primary' size='large' htmlType='submit' style={{width: '100%'}}>Решить</Button>
                        </Form.Item>
                    </Form>

                    {taskSolved ? <>
                        <div className={style.result}>
                            <Text>Приближенное значение y</Text>
                            <Title level={3} style={{margin: 0}}>{result}</Title>
                            <Table style={{marginTop: 25}} pagination={false} bordered columns={tableColumns} dataSource={tableSource}></Table>
                        </div>
                    </> : <></>}
                </div>
            </div>
        </div>
    );
};

export default Euler;