import React from 'react';
import { Select, Input, Button, Card, Table, Divider, Modal, Popover } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { Link } from 'react-router-dom';
import moment from 'moment';
import URL from '../../../api/config';

const Option = Select.Option;
const confirm = Modal.confirm;

class WarehouseM extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectValue: '',
            searchInputValue: '',
            warehouseData: []
        }
    }

    componentDidMount() {
        this.requestList();
    }

    selectChange = (v) => {
        this.setState({
            selectValue: v
        });
    }

    searchInputChange = (e) => {
        const value = e.target.value;
        this.setState(() => ({
            searchInputValue: value
        }));
    }

    searchBtnClick = () => {
        const state = this.state;
        fetch(`${URL}/listWarehouse?id=${state.selectValue}&keyword=${state.searchInputValue}`)
            .then(res => res.json())
            .then(data => {
                data.content.map((i) => {
                    i.key = i.warehouseId;
                    i.updateTime = moment(i.updateTime).format('YYYY-MM-DD');
                    i.department = i.beDepartment ? i.beDepartment.name : null;
                    i.allRemarks = i.remarks;
                    i.remarks =
                        i.remarks.length > 30
                            ?
                            i.remarks.slice(0, 30) + '······'
                            :
                            i.remarks
                });
                this.setState({
                    warehouseData: data.content
                });
            })
            .catch(err => {
                console.log('fetch error', err);
            });
    }

    requestList = () => {
        fetch(`${URL}/listWarehouse`)
            .then((res) => res.json())
            .then(data => {
                console.log(data)
                data.content.map((i) => {
                    i.key = i.warehouseId;
                    i.updateTime = moment(i.updateTime).format('YYYY-MM-DD');
                    i.department = i.beDepartment ? i.beDepartment.name : null;
                    i.allRemarks = i.remarks;
                    i.remarks =
                        i.remarks.length > 30
                            ?
                            i.remarks.slice(0, 30) + '······'
                            :
                            i.remarks
                });
                this.setState({
                    warehouseData: data.content
                })
            })
            .catch(err => {
                console.log('fetch error', err);
            });
    }

    deleteBtnClick = (id) => {
        confirm({
            title: `确定删除${id}号仓库？`,
            content: `点击确定删除${id}号仓库`,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                fetch(`${URL}/deleteWarehouse?warehouse=${id}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
            },
            onCancel: () => {
                console.log('Cancel');
            },
        });
    }

    render() {

        const columns = [{
            title: '仓库编号',
            dataIndex: 'warehouseId',
        }, {
            title: '仓库名称',
            dataIndex: 'warehouseName',
        }, {
            title: '所属部门',
            dataIndex: 'department',
        }, {
            title: '联系人',
            dataIndex: 'contacts'
        }, {
            title: '联系方式',
            dataIndex: 'telephone'
        }, {
            title: '地址',
            dataIndex: 'warehouseAddress'
        }, {
            title: '备注',
            dataIndex: 'remarks',
            render: (text, record) => (
                <Popover
                    content={record.allRemarks}
                    title="备注"
                    trigger="hover"
                    mouseEnterDelay={.3}
                >
                    {text}
                </Popover>
            )
        }, {
            title: '操作员',
            dataIndex: 'operatorId'
        }, {
            title: '修改日期',
            dataIndex: 'updateTime'
        }, {
            title: '操作',
            dataIndex: 'option',
            render: (text, record) => (
                <span>
                    <Link to={`${this.props.match.url}/changeWarehouse/${record.warehouseId}`}>修改</Link>
                    <Divider type="vertical" />
                    {/* eslint-disable-next-line */}
                    <a href="javascript:;" onClick={() => this.deleteBtnClick(record.warehouseId)}>删除</a>
                </span>
            )
        }];

        return (
            <React.Fragment>
                <BreadcrumbCustom first="系统管理" second="仓库维护" />
                <Card title="仓库维护">
                    <div>
                        所属部门：
                        <Select
                            defaultValue="全部"
                            style={{ width: 120, marginLeft: '10px' }}
                            onChange={this.selectChange}
                        >
                            <Option value="" >全部</Option>
                            <Option value="1" >运维部</Option>
                            <Option value="2" >财务部</Option>
                            <Option value="3" >产品部</Option>
                        </Select>
                        <Input
                            style={{ width: '400px', marginLeft: '10px' }}
                            placeholder="仓库名称，编号，联系人，地址模糊查询"
                            onChange={this.searchInputChange}
                            value={this.state.searchInputValue}
                        />
                        <Button
                            type="primary"
                            onClick={this.searchBtnClick}
                            style={{ marginLeft: '10px' }}
                        >
                            查询
                        </Button>
                    </div>
                    <div>
                        <div className="gutter-box">
                            <div style={{ marginTop: '24px' }}>
                                <Button
                                    type="primary"
                                >
                                    <Link to={`${this.props.match.url}/addWarehouse`}>
                                        新建
                                    </Link>
                                </Button>
                            </div>
                            <Table
                                bordered
                                columns={columns}
                                dataSource={this.state.warehouseData}
                                style={{ marginTop: '10px' }}
                                pagination={{
                                    showTotal: (total, range) => `第 ${range[0]} 条到第 ${range[1]} 条，共 ${total} 条`,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['10', '20', '50']
                                }}
                            />
                        </div>
                    </div>
                </Card>
            </React.Fragment >
        );
    }
}

export default WarehouseM;
