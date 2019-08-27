import PropTypes from "prop-types";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import Routes from ".././Routes.js";

import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";

class FixedMenuLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: 0
    };
  }

  componentDidMount = () => {
    //this.setState({accountId:this.props.location.state.accountId});
  };

  renderLogin = str => {
    var regex3 = /register/;
    var result3 = regex3.test(str);
    return result3;
  };

  renderLogout = str => {
    var regex1 = /login/;
    var result1 = regex1.test(str);
    var regex2 = /register/;
    var result2 = regex2.test(str);
    return !result1 && !result2;
  };

  renderHome = str => {};

  renderQRTab = str => {
    var regex1 = /gym/;
    var result1 = regex1.test(str);
    var regex2 = /login/;
    var result2 = regex2.test(str);
    var regex3 = /register/;
    var result3 = regex3.test(str);
    return result1 && !result2 && !result3;
  };

  renderDashboard = str => {
    var regexGym = /gym/;
    var regexUser = /user/;
    var regexHealthfirm = /healthfirm/;
    var login = /login/;
    var register = /register/;
    if (regexGym.test(str) && !login.test(str) && !register.test(str)) {
      return (
        <Link
          to={{
            pathname: "/gym/dashboard",
            state: { accountId: this.props.location.state.accountId }
          }}
        >
          <h5 style={{ color: "black" }}>Home</h5>
        </Link>
      );
    }
    if (regexUser.test(str) && !login.test(str) && !register.test(str)) {
      return (
        <Link
          to={{
            pathname: "/user/dashboard",
            state: { accountId: this.props.location.state.accountId }
          }}
        >
          <h5 style={{ color: "black" }}>Home</h5>
        </Link>
      );
    }
    if (regexHealthfirm.test(str) && !login.test(str) && !register.test(str)) {
      return (
        <Link
          to={{
            pathname: "/healthfirm/dashboard",
            state: { accountId: this.props.location.state.accountId }
          }}
        >
          <h5 style={{ color: "black" }}>Home</h5>
        </Link>
      );
    }
  };

  renderWallet = () => {
    const {
      location: { pathname }
    } = this.props;
    if (pathname === "/user/dashboard") {
      return (
        <Link
          to={{
            pathname: "/user/wallet",
            state: { accountId: this.props.location.state.accountId }
          }}
        >
          <Menu.Item>
            <h5 style={{ color: "black" }}>Wallet</h5>
          </Menu.Item>
        </Link>
      );
    }
    if (pathname === "/gym/dashboard") {
      return (
        <Link
          to={{
            pathname: "/gym/wallet",
            state: { accountId: this.props.location.state.accountId }
          }}
        >
          <Menu.Item>
            <h5 style={{ color: "black" }}>Wallet</h5>
          </Menu.Item>
        </Link>
      );
    }
    if (pathname === "/healthfirm/dashboard") {
      return (
        <Link
          to={{
            pathname: "/healthfirm/wallet",
            state: { accountId: this.props.location.state.accountId }
          }}
        >
          <Menu.Item>
            <h5 style={{ color: "black" }}>Wallet</h5>
          </Menu.Item>
        </Link>
      );
    }
    if (pathname === "/user/wallet") {
      return (
        <Link
          to={{
            pathname: "/user/wallet",
            state: { accountId: this.props.location.state.accountId }
          }}
        >
          <Menu.Item>
            <h5 style={{ color: "black" }}>Wallet</h5>
          </Menu.Item>
        </Link>
      );
    }
    if (pathname === "/healthfirm/wallet") {
      return (
        <Link
          to={{
            pathname: "/healthfirm/wallet",
            state: { accountId: this.props.location.state.accountId }
          }}
        >
          <Menu.Item>
            <h5 style={{ color: "black" }}>Wallet</h5>
          </Menu.Item>
        </Link>
      );
    }
    if (pathname === "/gym/wallet") {
      return (
        <Link
          to={{
            pathname: "/gym/wallet",
            state: { accountId: this.props.location.state.accountId }
          }}
        >
          <Menu.Item>
            <h5 style={{ color: "black" }}>Wallet</h5>
          </Menu.Item>
        </Link>
      );
    }
    if (pathname === "/gym/qrcode") {
      return (
        <Link
          to={{
            pathname: "/gym/wallet",
            state: { accountId: this.props.location.state.accountId }
          }}
        >
          <Menu.Item>
            <h5 style={{ color: "black" }}>Wallet</h5>
          </Menu.Item>
        </Link>
      );
    }
  };

  render() {
    console.log("component Rendered");
    console.log("layout props", this.props);
    return (
      <div>
        <Menu
          fixed="top"
          text
          style={{ height: "60px", backgroundColor: "#ffbe31" }}
        >
          <Container>
            <Menu.Item as="a" header>
              <Image
                src={require("../resource/heartlogo.png")}
                style={{ height: "28px", width: "30px" }}
              />
              <Link to={window.location.pathname} className="Hedera-Health">
                <p
                  style={{
                    display: "inline",
                    color: "black",
                    fontFamily: "Open Sans",
                    fontSize: "26px",
                    paddingTop: "5px"
                  }}
                >
                  Track
                  <b style={{ fontFamily: "Open Sans" }}> Fitness</b>
                </p>
              </Link>
            </Menu.Item>
            <Menu.Item position="right">
              {this.renderDashboard(this.props.location.pathname)}
            </Menu.Item>
            <Menu.Item>
              {this.renderWallet(this.props.location.pathname)}
            </Menu.Item>
            <Menu.Item>
              {this.renderQRTab(this.props.location.pathname) && (
                <div>
                  <Link
                    to={{
                      pathname: "/gym/qrcode",
                      state: { accountId: this.props.location.state.accountId }
                    }}
                  >
                    <h5 style={{ color: "black" }}>QRCode</h5>
                  </Link>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {this.renderLogin(this.props.location.pathname) && (
                <Link to={{ pathname: "/login" }}>
                  <h5 style={{ color: "black" }}>Login</h5>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {this.renderLogout(this.props.location.pathname) && (
                <Link to={{ pathname: "/login" }}>
                  <h5 style={{ color: "black" }}>Logout</h5>
                </Link>
              )}
            </Menu.Item>
          </Container>
        </Menu>

        <div
          className="ui inverted vertical footer segment"
          id="sticky"
          style={{ height: "80px", backgroundColor: "#ffbe31" }}
        >
          <div className="ui center aligned container">
            <h4 className="ui header">
              &copy; Copyright 2019 | All rights reserved | Track Fitness
            </h4>
            <a href="https://www.facebook.com/">
              <i className="facebook square icon medium" />
            </a>
            <a href="https://twitter.com/">
              <i className="twitter square icon medium" />
            </a>
            <a href="https://www.linkedin.com/company/c">
              <i className="linkedin square icon medium" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(FixedMenuLayout);
