import React from "react";
import { Navbar, Container, Col } from "react-bootstrap";
const NavBar = ({ account }) => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Col>
            <Navbar.Brand>
              Welcome <p style={{ color: "green" }}>{account}</p>{" "}
            </Navbar.Brand>
          </Col>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
