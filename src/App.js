
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IpList from './IpList.jsx';

const ipList = [
  {id:1,ip:'123.123.123.1',server_ip: '123.0.0.1',user:'Pan Kowalski'},
  {id:2,ip:'123.123.123.2',server_ip: '123.0.0.1',user:'Pan Kowalski2'},  
  {id:3,ip:'123.123.123.3',server_ip: '123.0.0.1',user:'Pan Kowalski3'},
  {id:4,ip:'123.123.123.4',server_ip: '123.0.0.1',user:'Pan Kowalski4'}
];

if (localStorage.getItem("ips") === null) {
  localStorage.setItem('ips', JSON.stringify(ipList));
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipList : []
    }

    this.editIpInfo = this.editIpInfo.bind(this);
    this.deleteIp = this.deleteIp.bind(this);
    this.addNewIp = this.addNewIp.bind(this)
  }

  componentWillMount() {
    let ipList = JSON.parse(localStorage.getItem("ips"));
    this.setState((prevState, props) => ({
      ipList: ipList
    }));
  }

  addNewIp() {
    this.setState((prevState, props) => ({
      ipList: [...prevState.ipList, {
        id: Math.max(...prevState.ipList.map(function(obj){
          return obj.id
        })) + 1, ip: '', server_ip: '', user:''
      }]
    }));
  }

  deleteIp(id) {
    let r = window.confirm("Do you want to delete this item");
    if (r == true) {
      let filteredIpList = this.state.ipList.filter(
        x => x.id !== id
      );

      this.setState((prevState, props) => ({
        ipList: filteredIpList
      }));
      localStorage.setItem(
        'ips', 
        JSON.stringify(filteredIpList)
      );
    }
  }

  editIpInfo(id, ip, server_ip, user) {
    let ipListCopy = this.state.ipList.map((item) => {
      if(item.id == id) {
        item.ip = ip;
        item.server_ip = server_ip;
        item.user = user;
      }
      
      return ip;
    });

    localStorage.setItem(
      'ips',
      JSON.stringify(ipListCopy)
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-3"><div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              IP Registry
            </div>
            <div className="card-body">
              <table className="table table-hover">
                <thead className="thead-dark"><tr><th>IP</th><th>SERVER</th><th>USER</th><th>Edit/Save</th><th>Delete</th></tr></thead>
                <IpList
                  deleteIp={this.deleteIp}
                  ipList={this.state.ipList}
                  editIpInfo={this.editIpInfo}
                />
              </table>
            <button
              className="btn btn-dark pull-left"
              onClick={this.addNewIp}>
              Add New
            </button>
          </div>
        </div>
      </div>
     </div>
    </div>
    );
  }
}

export default App;
