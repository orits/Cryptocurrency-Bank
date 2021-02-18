import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import { Logo, Links } from "./";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Navbar bg="dark" expand="lg" sticky="top" variant="dark">
                <div className="container">
                    <Logo />
                    <Navbar.Brand>Cryptocurrency Bank</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Links />
                    </Navbar.Collapse>
                </div>
            </Navbar>
         );
    }
}
 
export default Header;
    