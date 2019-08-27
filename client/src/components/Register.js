import React from "react";
import {
  Button,
  Message,
  Checkbox,
  Form,
  Container,
  Grid,
  Header,
  Icon,
  Search,
  Segment,
  Divider,
  Image,
  Dropdown
} from "semantic-ui-react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const rapi_svr = "http://3.81.19.32";
const rapi_port = "8080";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "929",
      name: "",
      userName: "",
      password: "",
      role: "User",
      accountValue: "",
      accountId: "",
      initialDeposit: 25,
      registrationSuccess: ""
    };
  }

  handleRegistration = e => {
    if (this.state.role == "User") {
      console.log("User is registered");
      console.log(e);
      var url = "http://3.81.19.32:8080/registerUser";
      axios({
        method: "post",
        url:
          url +
          "?userName=" +
          this.state.userName +
          "&password=" +
          this.state.password +
          "&role=" +
          this.state.role +
          "&accountId=" +
          this.state.accountId +
          "&payerAccountNum=2&contractNum=1007&userAddress=00000000000000000000000000000000000003e9" +
          "&userId=" +
          this.state.id +
          "&name=" +
          this.state.name,
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(reqdata => {
          console.log("axios.post was successful");
          this.setState({ registrationSuccess: "Y" });
          console.log("Registration Successful? : ", reqdata.data);
        })
        .catch(error => {
          this.setState({ registrationSuccess: "N" });
          console.log("exception raised in axios.post.OnboardOrganization");
        });
    } else {
      console.log(e);
      var url = "http://3.81.19.32:8080/registerOrganization";
      axios({
        method: "post",
        url:
          url +
          "?id=1&orgId=" +
          this.state.id +
          "&orgName=" +
          this.state.name +
          "&userName=" +
          this.state.userName +
          "&role=" +
          this.state.role +
          "&accountId=" +
          this.state.accountId +
          "&payerAccountNum=2&contractNum=1007&value=250000000000" +
          "&password=" +
          this.state.password,
        header: {
          "Content-Type": "application/json"
        }
      })
        .then(reqdata => {
          console.log("axios.post was successful");
          this.setState({ registrationSuccess: "Y" });
          console.log("Registration Successful? : ", reqdata.data);
        })
        .catch(error => {
          this.setState({ registrationSuccess: "N" });
          console.log("exception raised in axios.post.OnboardOrganization");
        });
    }
  };

  setRole = (e, value) => {
    e.persist();
    console.log(value.value);
    this.setState({ role: value.value });
  };

  statusCheck = () => {
    const { registrationSuccess } = this.state;
    if (registrationSuccess == "N") {
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
          Registration Failed{" "}
        </Message>
      );
    } else if (registrationSuccess == "Y") {
      return (
        <Message
          color="green"
          style={{
            marginLeft: "30px",
            marginRight: "30px",
            marginTop: "30px",
            marginBottom: "15px"
          }}
        >
          {" "}
          Your user registration was successful{" "}
        </Message>
      );
    } else {
      return <div />;
    }
  };

  componentDidMount() {
    document.body.style.background = "#e2e6e7";
  }

  render() {
    return (
      <div style={{}}>
        <div
          style={{
            paddingTop: "12em",
            paddingBottom: "10em",
            paddingLeft: "28em"
          }}
        >
          <div style={{ width: "215px", minHeight: "790px", float: "left" }}>
            <Image
              src={require("../resource/login-left-gfx.png")}
              style={{ height: "790px" }}
            />
          </div>
          <div
            align="center"
            style={{
              width: "475px",
              minHeight: "790px",
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
              Create an Account
            </Header>
            <br />
            <Form id="register">
              <Form.Field>
                <Header
                  as="h6"
                  style={{ paddingRight: "265px", fontSize: "15px" }}
                >
                  Role
                </Header>
                <Dropdown
                  placeholder="Select Role"
                  fluid
                  selection
                  options={[
                    {
                      key: "Health Firm",
                      text: "Health Firm",
                      value: "HealthFirm"
                    },
                    { key: "Gym", text: "Gym", value: "Gym" },
                    { key: "User", text: "Individual", value: "User" }
                  ]}
                  defaultValue={"User"}
                  style={{
                    width: "314px",
                    height: "35px",
                    borderRadius: "20px",
                    backgroundColor: "#d1d1d1"
                  }}
                  onChange={this.setRole}
                />
              </Form.Field>
              <Form.Field
                hidden={
                  this.state.role == "Gym" || this.state.role == "HealthFirm"
                    ? false
                    : true
                }
              >
                <Header
                  as="h6"
                  style={{ paddingRight: "195px", fontSize: "15px" }}
                >
                  Organization Id
                </Header>
                <input
                  value={this.state.id}
                  style={{
                    width: "314px",
                    height: "35px",
                    borderRadius: "20px",
                    backgroundColor: "#d1d1d1"
                  }}
                />
              </Form.Field>
              <Form.Field hidden={this.state.role == "User" ? false : true}>
                <Header
                  as="h6"
                  style={{ paddingRight: "250px", fontSize: "15px" }}
                >
                  User Id
                </Header>
                <input
                  value={this.state.id}
                  style={{
                    width: "314px",
                    height: "35px",
                    borderRadius: "20px",
                    backgroundColor: "#d1d1d1"
                  }}
                />
              </Form.Field>
              <Form.Field>
                <Header
                  as="h6"
                  style={{ paddingRight: "260px", fontSize: "15px" }}
                >
                  Name
                </Header>
                <input
                  placeholder="Name"
                  style={{
                    width: "314px",
                    height: "35px",
                    borderRadius: "20px",
                    backgroundColor: "#d1d1d1"
                  }}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <Header
                  as="h6"
                  style={{ paddingRight: "225px", fontSize: "15px" }}
                >
                  User Name
                </Header>
                <input
                  placeholder="User Name"
                  style={{
                    width: "314px",
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
                  style={{ paddingRight: "230px", fontSize: "15px" }}
                >
                  Password
                </Header>
                <input
                  type="password"
                  placeholder="Pasword"
                  style={{
                    width: "314px",
                    height: "35px",
                    borderRadius: "20px",
                    backgroundColor: "#d1d1d1"
                  }}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <Header
                  as="h6"
                  style={{ paddingRight: "225px", fontSize: "15px" }}
                >
                  Account Id
                </Header>
                <input
                  placeholder="Id"
                  style={{
                    width: "314px",
                    height: "35px",
                    borderRadius: "20px",
                    backgroundColor: "#d1d1d1"
                  }}
                  onChange={e => this.setState({ accountId: e.target.value })}
                />
              </Form.Field>
              <Form.Field
                hidden={
                  this.state.role == "Gym" || this.state.role == "HealthFirm"
                    ? false
                    : true
                }
              >
                <Header
                  as="h6"
                  style={{ paddingRight: "200px", fontSize: "15px" }}
                >
                  Initial Deposit
                </Header>
                <input
                  placeholder="HBAR"
                  value={this.state.initialDeposit + " Hbar"}
                  style={{
                    width: "314px",
                    height: "35px",
                    borderRadius: "20px",
                    backgroundColor: "#d1d1d1"
                  }}
                  readOnly
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  style={{
                    paddingTop: "11px",
                    paddingBottom: "11px",
                    fontSize: "15px"
                  }}
                  label="I agree to the Terms and Conditions"
                />
              </Form.Field>
              <Form.Field>
                <button
                  class="ui button"
                  style={{
                    width: "314px",
                    height: "35px",
                    borderRadius: "20px",
                    backgroundColor: "#ffbe31"
                  }}
                  onClick={event => {
                    this.handleRegistration(event);
                  }}
                >
                  REGISTER
                </button>
              </Form.Field>
              {this.statusCheck()}
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
