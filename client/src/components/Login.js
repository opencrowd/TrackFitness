import React from "react";
import PropTypes from "prop-types";
import Eos from "eosjs";
import axios from "axios";
import { Link, Route } from "react-router-dom";

import ScatterJS from "scatter-js/dist/scatter.esm";
import {
  Message,
  Button,
  Checkbox,
  Form,
  Container,
  Grid,
  Header,
  Icon,
  Search,
  Segment,
  Divider,
  Image
} from "semantic-ui-react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNames: [],
      accountValue: "",
      scatter: null,
      name: "",
      userName: "",
      password: "",
      accountId: 0,
      publicKey: "0x012493544f91730bdaaa7a5a8bdc61166610fafa",
      weekly_cost: "",
      loginSuccess: true,
      orgId: ""
    };
  }

  handleLogin = d => {
    console.log("Login called");
    var url, targetUrl;
    url = "http://3.81.19.32:8080/loginUser";

    axios({
      method: "get",
      url:
        url +
        "?userName=" +
        this.state.userName +
        "&password=" +
        this.state.password,
      header: { "Content-Type": "application/json" }
    })
      .then(val => {
        console.log("LOGIN DATA", val);
        console.log("rapi-reponse:", val);
        this.setState({ accountId: val.data.accountId, orgId: val.data.orgId });

        if (val.data.role == "User") {
          targetUrl = "/user/dashboard";
        } else if (val.data.role == "HealthFirm") {
          targetUrl = "/healthfirm/dashboard";
        } else if (val.data.role == "Gym") {
          targetUrl = "/gym/dashboard";
        }

        this.props.history.push({
          pathname: targetUrl,
          state: {
            accountId: parseInt(this.state.accountId),
            orgId: parseInt(val.data.orgId)
          } // your data array of objects
        });
      })
      .catch(error => {
        this.setState({ loginSuccess: false });
      });
  };

  statusCheck = () => {
    const { loginSuccess } = this.state;
    if (!loginSuccess) {
      return (
        <Message
          color="red"
          style={{
            marginLeft: "30px",
            marginRight: "30px",
            marginTop: "30px",
            marginBottom: "15px"
          }}
        >
          {" "}
          Login Failed{" "}
        </Message>
      );
    } else {
      return <div />;
    }
  };

  componentDidMount() {
    document.body.style.background = "#e2e6e7";
  }

  clearFields = () => {
    document.getElementById("register").reset();
  };

  render() {
    return (
      <div style={{}}>
        <div
          style={{
            paddingTop: "12em",
            paddingBottom: "10em",
            paddingLeft: "24em"
          }}
        >
          <div style={{ width: "383px", minHeight: "400px", float: "left" }}>
            <Image
              src={require("../resource/login-left-gfx.png")}
              style={{ height: "400px" }}
            />
          </div>
          <div
            align="center"
            style={{
              width: "383px",
              minHeight: "400px",
              backgroundColor: "white",
              overflow: "hidden"
            }}
          >
            <Header
              style={{
                fontFamily: "OpenSans",
                fontSize: "22px",
                paddingTop: "40px"
              }}
            >
              Log in to your Account
            </Header>
            <br />
            <Form id="register">
              <Form.Field>
                <Header
                  as="h6"
                  style={{ paddingRight: "215px", fontSize: "15px" }}
                >
                  Username
                </Header>
                <input
                  style={{
                    width: "300px",
                    height: "35px",
                    borderRadius: "20px",
                    backgroundColor: "#d1d1d1"
                  }}
                  onChange={e => this.setState({ userName: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <Header
                  as="h6"
                  style={{ paddingRight: "215px", fontSize: "15px" }}
                >
                  Password
                </Header>
                <input
                  type="password"
                  style={{
                    width: "300px",
                    height: "35px",
                    borderRadius: "20px",
                    backgroundColor: "#d1d1d1"
                  }}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </Form.Field>
            </Form>
            <div style={{ paddingTop: "34px", paddingBottom: "35px" }}>
              <button
                class="ui button"
                onClick={event => {
                  this.handleLogin();
                }}
                style={{
                  width: "300px",
                  height: "35px",
                  borderRadius: "20px",
                  backgroundColor: "#ffbe31"
                }}
              >
                LOGIN
              </button>
            </div>
            <Link to={{ pathname: "/register", state: {} }}>
              <label
                style={{ fontFamily: "SourceSansPro-Regular", height: "22px" }}
              >
                New Here? Create Account
              </label>
            </Link>
            {this.statusCheck()}
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
