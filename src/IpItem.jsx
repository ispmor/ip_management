import React, { Component } from 'react';

export default class IpItem extends Component {
    constructor(props) {
        super(props);
        this.state = { isEdit: false }
        this.editIp = this.editIp.bind(this)
        this.editIpInfo = this.editIpInfo.bind(this);
        this.deleteIp = this.deleteIp.bind(this);
    }

    deleteIp() {
        const { id } = this.props.ip;
        this.props.deleteIp(id)
    }

    editIp() {
        this.setState((prevState, props) => ({
            isEdit: !prevState.isEdit
        }))
    }

    editIpInfo() {
        const { id } = this.props.ip;
        this.setState((prevState, props) => ({
            isEdit: !prevState.isEdit
        }));

        this.props.editIpInfo(
            id,
            this.ipInput.value,
            this.serverIpInput.value,
            this.userInput.value
        );
    }

    render() {
        const { ip, serverIp, user } = this.props.ip;

        return (
            this.state.isEdit === true ? (
                <tr className="bg-warning" key={this.props.index}>
                    <td>
                        <input ref={ipInput => this.ipInput = ipInput} defaultValue={ip} />
                    </td>
                    <td><input defaultValue={serverIp} ref={serverIpInput => this.serverIpInput = serverIpInput} />
                    </td>
                    <td>
                        <input ref={userInput => this.userInput = userInput} defaultValue={user} />
                    </td>
                    <td><i className="far fa-save" onClick={this.editIpInfo}></i>
                    </td>
                    <td><i className="fas fa-trash"></i></td>
                </tr>

            ) : (
                    <tr key={this.props.index}>
                        <td>{ip}</td>
                        <td>{serverIp}</td>
                        <td>{user}</td>
                        <td><i className="far fa-edit" onClick={this.editIp}></i></td>
                        <td><i className="fas fa-trash" onClick={this.deleteIp}></i></td>
                    </tr>
                )
        )
    }
}
