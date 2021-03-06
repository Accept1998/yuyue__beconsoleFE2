import React from 'react';
import { Row, Col, Form, Button, Input, Select } from 'antd';

const TextArea = Input.TextArea;
const Option = Select.Option;
const CabinetForm = Form.create()(
    class extends React.Component {

        handleSubmitClick = (e) => {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const initial = this.props.initialValues;
            const formItemLayout = {
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            };
            const formItem = [
                { type: 3, label: '柜子编号', name: 'ID', width: '150px', required: true },
                { type: 1, label: '柜子名称', name: 'name', width: '150px', },
                { type: 1, label: '所属仓库', name: 'wareHouse', width: '150px' },
                { type: 1, label: '容量', name: 'capacity', width: '150px' },
                { type: 1, label: '运维人', name: 'people', width: '150px', },
                { type: 3, label: '联系方式', name: 'phoneNum', width: '300px' },
                { type: 1, label: '柜子地址', name: 'address', width: '300px' },
                { type: 2, label: '柜子状态', name: 'status', width: '150px', value: ['停用', '正常'] },
                { type: 1, label: '操作员', name: 'operator', width: '150px' },
            ];
            return (
                <Form onSubmit={(e) => { this.props.onSubmit(e) }}><Row>
                    {formItem.map(i => (
                        <Col key={i.name} span={i.span ? i.span : 12}>
                            <Form.Item {...formItemLayout} label={i.label} help={i.help}>
                                {getFieldDecorator(i.name, {
                                    initialValue: initial ? initial[i.name] : null,
                                    rules: [
                                        {
                                            required: i.name === 'ID' ? true : false,
                                            message: '柜子编号不能为空'
                                        },
                                        {
                                            pattern: i.name === 'ID' || 'capacity' || 'phoneNum' ? new RegExp('[0-9]+', 'g') : null,
                                            message: '请输入数字'
                                        }
                                    ]
                                })((() => {
                                    switch (i.type) {
                                        case 1:
                                            return <div>
                                                <Input defaultValue={initial ? initial[i.name] : null} style={{ width: `${i.width}` }} />
                                            </div>
                                        case 2:
                                            return <Select style={{ width: `${i.width}` }}>
                                                {i.value.map(v => (<Option key={v} value={v}>{v}</Option>))}
                                            </Select>
                                        case 3:
                                            return <div>
                                                <Input defaultValue={initial ? initial[i.name] : null} style={{ width: `${i.width}` }} />
                                            </div>
                                        default:
                                            return null
                                    }
                                })())}
                            </Form.Item>
                        </Col>
                    ))}
                    <Col span={24}>
                        <Form.Item label="备注">
                            {getFieldDecorator('remark', { initialValue: initial ? initial['remark'] : null })(
                                <TextArea rows={3} />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                    <Row hidden={this.props.type === 'change' ? false : true}>
                        <Col span={12}>
                            <Form.Item
                                {...formItemLayout}
                                label="创建时间"
                            >
                                <span style={{ marginLeft: 10 }}>{initial ? initial['createTime'] : null}</span>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                {...formItemLayout}
                                label="最近修改时间"
                            >
                                <span style={{ marginLeft: 10 }}>{initial ? initial['date'] : null}</span>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ textAlign: "center" }}>
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmitClick}>提交</Button>
                        <Button type="primary" onClick={() => { this.props.onCancel() }}>取消</Button>
                    </div>
                </Form>
            );
        }
    }
);

export default CabinetForm;
