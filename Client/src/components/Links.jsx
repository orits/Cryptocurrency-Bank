import React, { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";


class Links extends Component {
  render() {
    return (
      <ul className="navbar-nav ml-auto">
        <Nav.Item as="li">
          <Nav.Link>
            <Link
              to={"/home"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Home
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link>
            <Link
              to={"/coin"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Coin
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link>
            <Link
              to={"/management "}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Management 
            </Link>
          </Nav.Link>
        </Nav.Item>
      </ul>
    );
  }
}

export default Links;