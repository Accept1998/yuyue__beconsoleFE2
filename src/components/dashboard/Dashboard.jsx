/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Card, Timeline, Icon } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import URL from '../../api/config';
import "./index.less";


class Dashboard extends React.Component {
    state={data:{}};
    componentDidMount(){
        fetch(`${URL}/home`,{
            method:'GET',
            // mode: 'cors',
            credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
            })
            .then((res)=>res.json())
            .then(data=>{
                this.setState({data:data.data})
            }).catch(err=>{console.log(err)})
    }
    render() {
        // console.log(`${ceshiURL}/home`);
        // console.log(ceshiURL);
        return (
            <div className="headerDash">
                <BreadcrumbCustom />
                <div>您有{this.state.data.allocation}个书柜待调拨新书</div>
                <div>您有{this.state.data.repair}个书柜格子待维修</div>
            </div>
        )
    }
}

export default Dashboard;