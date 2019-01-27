import React from 'react';
import { Form, Input, Button, Card, Table, Divider } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import './index.less';

const PublisherSearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        return (
            <Form layout="inline">
                <Form.Item>
                    {getFieldDecorator('fuzzyQuery')(
                        <Input placeholder="名称模糊查询" style={{ width: 200 }} />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        );
    }
);

class BookLib extends React.Component {

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'publisherId',
        }, {
            title: '名称',
            dataIndex: 'name',
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <span>
                    <a href="javascript:;">修改</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">删除</a>
                </span>
            ),
        }];

        const data = [{
            publisherId: 1,
            name: '信息出版社'
        }];

        data.map(i => i.key = i.publisherId);

        return (
            <div className="">
                <BreadcrumbCustom first="书籍管理" second="出版社" />
                <Card
                    title="出版社维护"
                >
                    <PublisherSearchForm /><br />
                    <div style={{ marginBottom: '10px' }}><Button type="primary">新增</Button></div>
                    <Table 
                        className="publisherM-Table"
                        columns={columns}
                        dataSource={data}
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

export default BookLib;