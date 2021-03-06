import React from 'react';
import { Card, Form, Button, Divider, Table } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getFormItem } from '../../baseFormItem';
import "./index.less"
import Link from 'react-router-dom/Link';

const InStoreSearch = Form.create()(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            let fieldsValue = this.props.form.getFieldsValue();
            console.log(fieldsValue);
        }

        render() {
            const { form } = this.props;
            const formList = [
                { type: 'SELECT', label: '仓库', name: 'store', width: '100px', list: [] },
                { type: 'INPUT', label: '制单人', name: 'creator' },
                { type: 'INPUT', label: '审核人', name: 'checkman' },
                { type: 'SELECT', label: '订单类型', name: 'orderType', width: '100px', list: [] },
                { type: 'SELECT', label: '订单状态', name: 'orderState', width: '100px', list: [] },
                { type: 'INPUT', label: '订单编号', name: 'orderCode' },
                { type: 'RANGPICKER', label: '制单时间', name: 'createTime' },
                { type: 'RANGPICKER', label: '审核时间', name: 'checkTime' },
                { type: 'INPUT', label: 'ISBN', name: 'isbn' },
                { type: 'INPUT', label: '电子标签', name: 'eLabel' },
                { type: 'INPUT', placeholder: '书籍名称/出版社/作者模糊查询', name: 'fuzzyQuery', width: '300px' },
            ];
            return (
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    {getFormItem(form, formList)}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
            );
        }
    }
);

class InStoreData extends React.Component {

    handleSubmit = (params) => {
        console.log(params);
    }

    render() {
        const columns = [
            { title: '订单编号', dataIndex: 'orderCode' },
            { title: '仓库', dataIndex: 'store' },
            { title: '类型', dataIndex: 'type' },
            { title: '入库人', dataIndex: 'inStoreMan' },
            { title: '入库时间', dataIndex: 'inStoreTime' },
            { title: '审核人', dataIndex: 'checkMan' },
            { title: '审核时间', dataIndex: 'checkTime' },
            { title: '运费', dataIndex: 'freight' },
            {
                title: '订单状态', dataIndex: 'orderState',
                render: (state) => {
                    let config = {
                        '1': '草稿',
                        '2': '待审核',
                        '3': '已审核',
                    }
                    return config[state];
                }
            },
            {
                title: '操作', dataIndex: 'action',
                render: (text, record) => {
                    let config = {
                        '1': <Link to={`${this.props.match.url}/add`}>编辑</Link>,
                        '2': <Link to={`${this.props.match.url}/check`}>审核</Link>,
                        '3': <Link to={`${this.props.match.url}/detail`}>查看</Link>,
                    }
                    return config[record.orderState];
                }
            }
        ];

        return (
            <div className="" >
                <BreadcrumbCustom first="仓库管理" second="入库单" />
                <Card
                    title="入库单查询"
                >
                    <InStoreSearch handleSubmit={this.handleSubmit} />
                    <div style={{ textAlign: 'right' }}>
                        <Button type="primary" ><Link to={`${this.props.match.url}/add`}>新建</Link></Button>
                        <Button type="primary" onClick={this.handleExport}>导出</Button>
                    </div><br />
                    <Table
                        className="inStoreData-table"
                        columns={columns}
                        dataSource={[{ key:1,orderState: 1 }, { key:2,orderState: 2 }, { key:3,orderState: 3 },]}
                        pagination={{
                            showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50']
                        }}
                        bordered
                    />
                </Card>
            </div>
        )
    }
}

export default InStoreData;