import { isEmptyObject } from 'jquery';
import React, { Component } from 'react'
import Select from "react-select"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import api from "../api"

class ConvertorForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            from: '',
            amount: 0.0,
            to: '',
            result: 0.0,
            coinType: this.props.coinsTypes,
            currency: this.props.currencyTypes,
            constAllTypeCoins: this.props.coinsTypes.concat(this.props.currencyTypes),
            allTypeCoins: this.props.coinsTypes.concat(this.props.currencyTypes),
            allTypeCoins: this.props.coinsTypes.concat(this.props.currencyTypes),
            errors: { message: '' },
            submitted: false,
         }
    }
    


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onChangeSelect = (e, name) => {
        console.log(this.state.from)
        console.log(this.state.to)
        if(name === "from"){
            this.setState({
                [name]: e.value,
                allTypeCoins: this.state.constAllTypeCoins.filter(item => (item.label !== e.value && item.label !== this.state.to))
            })
        }
        else if(name === "to"){
            this.setState({
                [name]: e.value,
                allTypeCoins: this.state.constAllTypeCoins.filter(item => (item.label !== e.value && item.label !== this.state.from))
            })
        }
        
    }

    formValidation = () => {
        var { from, to, amount } = this.state
        let isValid = true
        const errors = {}
        if(!from || !to || !amount){
            errors.message = "Please fill all inputs!\n"
            isValid = false
            //this.setState({ errors })
        }
        else if(isNaN(parseFloat(amount)) || amount <= 0){
            errors.message = "Price invalid, Please enter only X.X (bigger then 0) \n"
            isValid = false
           // this.setState({ errors })
        }

        this.setState({ errors })
        return isValid
    }

    submitForm = async (e) => {
        e.preventDefault()
        this.setState({
            result: "Loading..."
        })
        if(this.formValidation()){
            await api.getConversion(this.state.from, this.state.to, this.state.amount).then((res) => {
                this.setState({ result: res.data.result + " " + this.state.to })
            })
            .catch(e => {
                this.setState({ result: "service is unreachable at this moment!" })
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
        console.log(this.state.allTypeCoins)
        
        return ( 
            <Form onSubmit={this.submitForm}>
                {this.state.errors.message != '' && <span style={{color: "red"}}>{this.state.errors.message}</span>}
                <FormGroup>
                    <Label for="amount">Amount:</Label>
                    <Input 
                        type="text"
                        name="amount" 
                        id="amount" 
                        onChange={(e) => this.onChange(e)}
                     />   
                </FormGroup>
                <FormGroup>
                    <Label for="from">From:</Label>
                    <Select 
                        options={ this.state.to == '' ? this.state.constAllTypeCoins : this.state.allTypeCoins }
                        onChange={(e) => this.onChangeSelect(e, "from")}
                        defaultValue={{ label: this.state.from }}
                    />     
                </FormGroup>
                <FormGroup>
                    <Label for="to">To:</Label>
                    <Select 
                        options={this.state.from == '' ? this.state.constAllTypeCoins : this.state.allTypeCoins}
                        onChange={(e) => this.onChangeSelect(e, "to")}
                        defaultValue={{ label: this.state.to }}
                    />    
                </FormGroup>
                <FormGroup>
                    <Label for="result">Result</Label>
                    <Input 
                        type="text" 
                        name="result" 
                        id="result" 
                        readOnly
                        onChange={(e) => this.onChangeSelect(e)} 
                        value={this.state.result === null ? '' : this.state.result}  
                    />    
                </FormGroup>
                <Button>Convert</Button>
        </Form>
         );
    }
}
 
export default ConvertorForm;
