import React from 'react';
import { Card, Button, Input, Select, Form, Table, Divider, Modal } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { Link } from 'react-router-dom';

const Option = Select.Option;
const confirm = Modal.confirm;
const SearchForm = Form.create()(
    (props) => {
        const { getFieldDecorator } = props.form;
        const selectData = [{
            label: "所属仓库",
            placeholder: "全部",
            name: "category",
            value: ['全部', '朝阳街道']
        }];
        return (
            <Form layout="inline">
                {selectData.map(i => (
                    <Form.Item key={i.name} label={i.label}>
                        {getFieldDecorator(i.name)(
                            <Select placeholder={i.placeholder} style={{ width: 120 }}>
                                {i.value.map(v => (<Option key={v} value={v}>{v}</Option>))}
                            </Select>
                        )}
                    </Form.Item>
                ))}
                <Form.Item>
                    <Input placeholder="柜子名称，编号，运维人，地址模糊查询" style={{ width: 350 }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
            </Form>
        );
    }
);

class StaffM extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        this.requestList();
    }

    showConfirm = () => {
        confirm({
            title: 'Want to delete these items?',
            content: 'some descriptions',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    requestList = () => {
        const url = 'https://www.easy-mock.com/mock/5c7134c16f09752cdf0d69f4/example/systemM/cabinetM';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: this.state.data
            })
        })
            .then((res) => res.json())
            .then(data => {
                // eslint-disable-next-line
                data.data.data.map((item, index) => {
                    item.key = index;
                });
                this.setState({
                    data: data.data.data
                });
            })
            .catch(err => {
                console.log('fetch error', err)
            });
    }

    render() {

        const columns = [{
            title: '序号',
            dataIndex: 'num',
        }, {
            title: '柜子编号',
            dataIndex: 'ID',
        }, {
            title: '柜子名称',
            dataIndex: 'name',
        }, {
            title: '所属仓库',
            dataIndex: 'wareHouse',
        }, {
            title: '容量',
            dataIndex: 'capacity',
        }, {
            title: '运维人',
            dataIndex: 'people',
        }, {
            title: '联系方式',
            dataIndex: 'phoneNum',
        }, {
            title: '柜子地址',
            dataIndex: 'address',
        }, {
            title: '柜子状态',
            dataIndex: 'status'
        }, {
            title: '操作员',
            dataIndex: 'operator'
        }, {
            title: '修改日期',
            dataIndex: 'date'
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <span>
                    <Link to={`${this.props.match.url}/changeCabinet/${record.ID}`}>修改</Link>
                    <Divider type="vertical" />
                    {/* eslint-disable-next-line */}
                    <a href="javascript:;" onClick={this.showConfirm}>删除</a>
                    <Divider type="vertical" />
                    {/* eslint-disable-next-line */}
                    <a href="javascript:;">格子管理</a>
                </span>
            ),
        }];

        const { data } = this.state;
        console.log(data)

        return (
            <React.Fragment>
                <BreadcrumbCustom first="系统管理" second="机柜管理" />
                <Card
                    title="机柜管理"
                >
                    <SearchForm /><br />
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary"><Link to={`${this.props.match.url}/addCabinet`}>新增</Link></Button>
                    </div>
                    <Table className="infoC-table"
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
            </React.Fragment>
        );
    };
}

export default StaffM;
