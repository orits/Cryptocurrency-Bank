import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';

import ModalForm from './ModalForm'

import api from "../api"


class DataTableSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const items = this.props.items.map(item => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.coinType}</td>
                <td>{item.price}</td>
                <td>{item.currency}</td>
              </tr>
              )
            })
      
        return ( 
            <div>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Coin Type</th>
                            <th>Price</th>
                            <th>Currency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.items.length > 0 ? items : ""
                        }
                    </tbody>
                </Table>
                {
                    (this.props.items.length > 0 || (this.props.items.length == 0 && this.props.start)) ?
                     "" 
                     :
                      <h5> No muching coins has found! </h5> 
                }
                   
            </div>
            
         );
    }
}
 
export default DataTableSearch;