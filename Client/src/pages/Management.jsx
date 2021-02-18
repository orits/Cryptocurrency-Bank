import React, { Component } from 'react'

import { Container, Row, Col, Button } from 'reactstrap'

import { DataTable, ModalForm } from '../components'

import api from "../api"

import $ from "jquery";

class Management extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            items: [],
            coinsTypes: [],
            currencyTypes: [],
         }
    }

    getTypesCoinsAndCurrency = async () =>{
      var obj = {
           coinsTypes: '',
           currencyTypes: '',
      }
      await api.getCoinsTypes().then((res) => {
        var allTypes = $.map(res.data, function (item) {
          return {
            label: item,
            value: item,
          };
        });
        obj.coinsTypes = allTypes
      })
      await api.getCurrencyTypes().then((res) => {
        var allCurrencyTypes = $.map(res.data, function (item) {
          return {
            label: item,
            value: item,
          };
        });
        obj.currencyTypes = allCurrencyTypes
      })

      this.setState({
        coinsTypes: obj.coinsTypes,
        currencyTypes: obj.currencyTypes,
      })
  }


    getItems = async () => {
        await api.getCoins()
        .then((res) => {
          this.setState({
            items: res.data.sort(function(a, b){ return a.id > b.id }),
          });
        });
      }
    
      addItemToState = (item) => {
        this.setState(prevState => ({
          items: [...prevState.items, item].sort(function(a, b){ return a.id > b.id }),
        }))
      }
    
      updateState = (item) => {
        const itemIndex = this.state.items.findIndex(data => data.id === item.id)
        const newArray = [
        // destructure all items from beginning to the indexed item
          ...this.state.items.slice(0, itemIndex),
        // add the updated item to the array
          item,
        // add the rest of the items to the array from the index after the replaced item
          ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({ items: newArray })
      }
    
      deleteItemFromState = (id) => {
        const updatedItems = this.state.items.filter(item => item.id !== id)
        this.setState({ items: updatedItems })
      }
    
      componentDidMount(){
        this.getItems()
        this.getTypesCoinsAndCurrency()
      }

    render() { 

        return ( 
            <Container className="App">
                <Row>
                    <Col>
                        <h1 style={{margin: "20px 0"}}>Coins Database</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable 
                        items={this.state.items} 
                        updateState={this.updateState} 
                        deleteItemFromState={this.deleteItemFromState}
                        coinsTypes = {this.state.coinsTypes}
                        currencyTypes = {this.state.currencyTypes}
                         />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ModalForm 
                        buttonLabel="Add Coin" 
                        addItemToState={this.addItemToState}
                        coinsTypes = {this.state.coinsTypes}
                        currencyTypes = {this.state.currencyTypes}
                        />

                      <ModalForm 
                        buttonLabel="Convertor" 
                        coinsTypes = {this.state.coinsTypes}
                        currencyTypes = {this.state.currencyTypes}
                        />  
                    </Col>
                </Row>
            </Container>
         );
    }
}
 
export default Management;