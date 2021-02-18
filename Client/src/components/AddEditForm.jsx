import { isEmptyObject } from 'jquery';
import React, { Component } from 'react'
import Select from "react-select"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import api from "../api"

class AddEditForm  extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: 0,
            coinType: this.props.item  ? this.props.item.coinType : '',
            price: 0.0,
            currency: this.props.item  ? this.props.item.currency : '',
            submitted: false,
            errors: { message: '' },
            types: this.props.coinsTypes,
         }
    }
    


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onChangeSelect = (e, name) => {
        this.setState({[name]: e.value})
    }

    isDouble = (d) => {
        const re1 = new RegExp('\d+\.\d*|\.?\d+')
        return re1.test(d)
    }

    formValidation = () => {
        var { coinType, price, currency } = this.state
        let isValid = true
        const errors = {}
        coinType = coinType.trim().toUpperCase()
        if(!coinType || !price || !currency){
            errors.message = "Please fill all inputs!\n"
            isValid = false
        }
        else if(isNaN(parseFloat(price)) || price <= 0){
            errors.message = "Price invalid, Please enter only X.X (bigger then 0) \n"
            isValid = false
        }
        this.setState({ errors })

        return isValid
    }

    submitFormAdd = (e) => {
        e.preventDefault()
        
        if(this.formValidation()){
            const payload = {
                coinType: this.state.coinType,
                price: this.state.price,
                currency: this.state.currency,
            };
    
            api.addNewCoin(payload).then((res) => {
                this.props.addItemToState(res.data)
                this.props.toggle()
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    submitFormEdit = (e) => {
        e.preventDefault()
        if(this.formValidation()){
            const payload = {
                coinType: this.state.coinType,
                price: this.state.price,
                currency: this.state.currency,
            };
            api.updateCoinById(this.state.id, payload).then((res) => {
                this.props.updateState(res.data)
                this.props.toggle()
            })
            .catch(e => {
                console.log(e)
            })
        }
    }
    
    componentDidMount(){
        // if item exists, populate the state with proper data
        if(this.props.item){
          const { id, coinType, price, currency } = this.props.item
          this.setState({ id, coinType, price, currency })
        }
    }

    render() { 
        return ( 
            <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                {this.state.errors.message != '' && <span style={{color: "red"}}>{this.state.errors.message}</span>}
                <FormGroup>
                    <Label for="coinType">Coin Type</Label>
                     <Select 
                        options={this.props.coinsTypes}
                        onChange={(e) => this.onChangeSelect(e, "coinType")}
                        defaultValue={{ label: this.state.coinType }}
                     />     
                </FormGroup>
                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input 
                        type="text" 
                        name="price" 
                        id="price" 
                        onChange={(e) => this.onChange(e)} value={this.state.price === 0.0 ? '' : this.state.price}  
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="currency">Currency</Label>
                    <Select 
                        options={this.props.currencyTypes}
                        onChange={(e) => this.onChangeSelect(e, "currency")}
                        defaultValue={{ label: this.state.currency }}
                     />    
                </FormGroup>
                <Button>Submit</Button>
        </Form>
         );
    }
}
 
export default AddEditForm;
