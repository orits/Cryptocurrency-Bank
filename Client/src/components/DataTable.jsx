import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';

import ModalForm from './ModalForm'

import api from "../api"


class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    deleteItem = async (id) => {
        let confirmDelete = window.confirm('Delete coin forever?')
        if(confirmDelete){
            await api.deleteCoinById(id)
            .then(res => {
              this.props.deleteItemFromState(id)
            })
            .catch(err => console.log(err))
        }
      }

    render() { 
        const items = this.props.items.map(item => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.coinType}</td>
                <td>{item.price}</td>
                <td>{item.currency}</td>
                <td>
                  <div style={{width:"150px"}}>
                    <ModalForm 
                    buttonLabel="Edit" 
                    item={item} 
                    updateState={this.props.updateState}
                    coinsTypes = {this.props.coinsTypes}
                    currencyTypes = {this.props.currencyTypes}
                    />
                    {'   '}
                    <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
                  </div>
                </td>
              </tr>
              )
            })
      
        return ( 
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Coin Type</th>
                        <th>Price</th>
                        <th>Currency</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table>
         );
    }
}
 
export default DataTable;