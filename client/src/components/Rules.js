import React from "react";
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
import { withRouter } from "react-router-dom";
import axios from "axios";

class Rules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: 0,
      accountValue: "",
      scatter: null,
      name: "",
      orgId: "929",
      eventId: 0,
      payOut: 0,
      description: "",
      statParam: 0,
      publicKey: "0x012493544f91730bdaaa7a5a8bdc61166610fafa",
      weekly_cost: "",
      addRuleSuccess: ""
    };
  }

  componentWillMount = () => {
    this.setState({ accountId: this.props.location.state.accountId });
  };

  addRule = () => {
    console.log("adding payout rule");
    axios({
      method: "post",
      url:
        "http://3.81.19.32:8080/addPayoutRule?payerAccountNum=" +
        this.state.accountId +
        "&contractNum=1007&eventId=1&organizationId=2" +
        "&value=100000&id=" +
        this.state.eventId +
        "&eventDescription=" +
        String(this.state.description) +
        "&payOut=" +
        this.state.payOut +
        "&statParam=" +
        this.state.statParam
    })
      .then(val => {
        console.log(val);
        this.setState({ addRuleSuccess: "Y" });
      })
      .catch(error => {
        this.setState({ addRuleSuccess: "N" });
        console.log("exception raised in axios.post.addRule");
      });
  };

  statusCheck = () => {
    const { addRuleSuccess } = this.state;
    if (addRuleSuccess == "N") {
      return (
        <Message
          color="red"
          style={{
            textAlign: "center",
            marginRight: "140px",
            marginTop: "50px",
            marginBottom: "15px"
          }}
        >
          {" "}
          Rule Addition Failed{" "}
        </Message>
      );
    } else if (addRuleSuccess == "Y") {
      return (
        <Message
          color="green"
          style={{
            textAlign: "center",
            marginRight: "140px",
            marginTop: "50px",
            marginBottom: "15px"
          }}
        >
          {" "}
          Rule Added Successfully{" "}
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
      <div
        style={{
          marginTop: "7em",
          marginBottom: "9em",
          marginLeft: "24em",
          marginRight: "24em",
          backgroundColor: "WHITE"
        }}
      >
        <Container text style={{ marginTop: "5em" }}>
          <br />
          <br />
          <div align="center">
            <Header as="h2" icon>
              <Icon name="tasks" style={{ marginBottom: "0.35em" }} />
              ADD PAYOUT RULE
            </Header>
          </div>
          <br />
          <Form id="register" style={{ paddingLeft: "150px" }}>
            <Form.Field>
              <Header as="h6" style={{ paddingLeft: "9px", fontSize: "15px" }}>
                Organization Id
              </Header>
              <input
                value={this.state.orgId}
                onChange={e =>
                  this.setState({ organizationId: e.target.value })
                }
                style={{
                  width: "400px",
                  height: "35px",
                  borderRadius: "20px",
                  backgroundColor: "#d1d1d1"
                }}
                readOnly
              />
            </Form.Field>
            <Form.Field>
              <Header as="h6" style={{ paddingLeft: "9px", fontSize: "15px" }}>
                Account Id
              </Header>
              <input
                value={this.state.accountId}
                onChange={e => this.setState({ accountId: e.target.value })}
                style={{
                  width: "400px",
                  height: "35px",
                  borderRadius: "20px",
                  backgroundColor: "#d1d1d1"
                }}
                readOnly
              />
            </Form.Field>
            <Form.Field>
              <Header as="h6" style={{ paddingLeft: "9px", fontSize: "15px" }}>
                Event Id
              </Header>
              <input
                placeholder="0"
                onChange={e => this.setState({ eventId: e.target.value })}
                style={{
                  width: "400px",
                  height: "35px",
                  borderRadius: "20px",
                  backgroundColor: "#d1d1d1"
                }}
              />
            </Form.Field>
            <Form.Field>
              <Header as="h6" style={{ paddingLeft: "9px", fontSize: "15px" }}>
                Event Description
              </Header>
              <input
                placeholder="Ran 10 mile"
                onChange={e => this.setState({ description: e.target.value })}
                style={{
                  width: "400px",
                  height: "35px",
                  borderRadius: "20px",
                  backgroundColor: "#d1d1d1"
                }}
              />
            </Form.Field>
            <Form.Field>
              <Header as="h6" style={{ paddingLeft: "9px", fontSize: "15px" }}>
                Stat Param
              </Header>
              <input
                placeholder="Numeric value of rule. Eg: 10"
                onChange={e => this.setState({ statParam: e.target.value })}
                style={{
                  width: "400px",
                  height: "35px",
                  borderRadius: "20px",
                  backgroundColor: "#d1d1d1"
                }}
              />
            </Form.Field>
            <Form.Field>
              <Header as="h6" style={{ paddingLeft: "9px", fontSize: "15px" }}>
                Payout
              </Header>
              <input
                placeholder="0 Hbar"
                onChange={e =>
                  this.setState({ payOut: parseInt(e.target.value) })
                }
                style={{
                  width: "400px",
                  height: "35px",
                  borderRadius: "20px",
                  backgroundColor: "#d1d1d1"
                }}
              />
            </Form.Field>
            <div style={{ paddingTop: "20px" }}>
              <button
                class="ui button"
                onClick={event => {
                  this.addRule();
                }}
                style={{
                  width: "158px",
                  height: "35px",
                  borderRadius: "20px",
                  backgroundColor: "#ffbe31",
                  marginLeft: "25px",
                  marginRight: "20px"
                }}
              >
                ADD
              </button>
              <button
                class="ui button"
                onClick={event => {
                  this.props.history.goBack();
                }}
                style={{
                  width: "158px",
                  height: "35px",
                  borderRadius: "20px",
                  backgroundColor: "#ffbe31"
                }}
              >
                BACK
              </button>
            </div>
            {this.statusCheck()}
          </Form>
          <br />
          <br />
          <br />
        </Container>
      </div>
    );
  }
}

export default Rules;
