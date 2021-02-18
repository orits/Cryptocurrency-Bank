import React, { Component } from "react"

import { Container, Row, Col, Button } from 'reactstrap'

import Select from "react-select"

import { DataTableSearch } from '../components'

import api from "../api";

import $ from "jquery";



class Coin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            types: [],
            items: [],
            start: true
         }
    }

    getAllTypesToUser = () => {
        api.getCoinsTypes().then((res) => {
          var allTypes = $.map(res.data, function (item) {
            return {
              label: item,
              value: item,
            };
          });
          this.setState({ 
              types: allTypes
             });
        });
    };

    getAllCoinsByTypesToUser = (type) => {
        api.getCoinsByType(type).then((res) => {
            this.setState({
                items: res.data.sort(function(a, b){ return a.id > b.id }),
                start: false
            });
        });
    };

    handleChange = (e) => {
        this.getAllCoinsByTypesToUser(e.value)
    };

    componentDidMount = () => {
        this.getAllTypesToUser()
    };

    render() { 
        return ( 

            <Container className="App">
                <Row>
                    <Col>
                        <h1 style={{margin: "20px 100px"}}>Search By Coin Type</h1>
                    </Col>
                </Row>
                <Row style={{margin: "20px 300px"}}>
                    <Col>
                        <Select
                        width='200px'
                        menuColor='red'
                        className="select-col"
                        options={this.state.types}
                        onChange={(e) => this.handleChange(e)}
                        defaultValue={"Select type please"}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <DataTableSearch items={this.state.items} start={this.state.start} />
                    </Col>
                </Row>
            </Container>
         );
    }
}
 
export default Coin;