import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import authService from "../../services/authService";

const renderNavItem = (label, to) => {
  return (
    <Nav.Link>
      <Link to={to} style={{ color: "inherit", textDecoration: "inherit" }}>
        {label}
      </Link>
    </Nav.Link>
  );
};
const renderDropDownItem = (label, to, handleClick) => {
  return (
    <NavDropdown.Item
      onClick={() => {
        if (handleClick) handleClick();
      }}
    >
      <Link to={to} style={{ color: "inherit", textDecoration: "inherit" }}>
        {label}
      </Link>
    </NavDropdown.Item>
  );
};

const NavigationBar = ({ user, onHandleLogin }) => {
  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Aarya
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {renderNavItem("Home", "/")}
              <NavDropdown title="My Account" id="basic-nav-dropdown">
                {user.isLoggedIn && (
                  <React.Fragment>
                    {renderDropDownItem("Profile", "/profile")}
                    {renderDropDownItem("Orders", "/orders")}
                    <NavDropdown.Divider />
                  </React.Fragment>
                )}
                {!user.isLoggedIn && (
                  <React.Fragment>
                    {renderDropDownItem("Login", "/login")}
                    {renderDropDownItem("Register", "/register")}
                  </React.Fragment>
                )}
                {user.isLoggedIn &&
                  renderDropDownItem("Log Out", "/", () => {
                    onHandleLogin(false);
                    authService.logout();
                  })}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};
export default NavigationBar;
