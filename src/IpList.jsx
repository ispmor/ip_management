import React, { Component } from 'react';
import IpItem from './IpItem.jsx';

export default class IpList extends Component{
    render() {
        let ips = this.props.ipList;
        const trItem = ips.map((item, index) => (
            <IpItem
                key={index}
                ip={item}
                index={index}
                editIpInfo={this.props.editIpInfo}
                deleteIp={this.props.deleteIp}
            />
        ));

        return <tbody>{trItem}</tbody>;
    }
}