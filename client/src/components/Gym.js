import React from "react";
import PropTypes from "prop-types";

import {
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
  Image,
  Table,
  Modal
} from "semantic-ui-react";
import axios from "axios";

class Gym extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: 0,
      toAccountId: 1009,
      data: [],
      realmId: 0,
      shardId: 0,
      amount: 50,
      value: 0,
      balance: 0,
      status: 0,
      error: false,
      isLoading: false,
      showModal: false,
      rules: []
    };
  }

  getAddedRules = () => {
    console.log("getting added rules");
    axios({
      method: "get",
      url:
        "http://3.81.19.32:8080/getPayoutRules?organizationId=" +
        String(this.state.accountId)
    })
      .then(val => {
        console.log(val);
        this.setState({ rules: val.data });
      })
      .catch(error => {
        console.log("exception raised in axios.post.getRules");
      });
  };

  componentWillMount = () => {
    this.setState({ accountId: this.props.location.state.accountId });
  };

  componentDidMount = () => {
    document.body.style.background = "#e2e6e7";
    this.getAddedRules();
  };

  earnHbar = () => {
    axios({
      method: "post",
      url:
        "http://3.81.19.32:8080/transfer?fromAccountNum=" +
        this.state.accountId +
        "&toAccountNum=" +
        this.state.toAccountId +
        "&amount=" +
        this.state.amount
    }).then(val => {
      console.log(val);
    });
  };

  claim = (curr, reqd) => {
    console.log(curr > reqd);
    this.setState({ showModal: true });
  };

  handleClose = () => this.setState({ showModal: false });

  handleRuleAddtion = str => {
    var regexGym = /gym/;
    var regexHealthfirm = /healthfirm/;

    if (regexGym.test(str)) {
      this.props.history.push({
        pathname: "/gym/addrules",
        state: { accountId: this.props.location.state.accountId }
      });
    }
    if (regexHealthfirm.test(str)) {
      this.props.history.push({
        pathname: "/healthfirm/addrules",
        state: { accountId: this.props.location.state.accountId }
      });
    }
  };

  render() {
    return (
      <div style={{ marginBottom: "13em", marginTop: "3em" }}>
        <div align="center">
          <br />
          <br />
          <Header as="h2" icon>
            <Icon name="tasks" style={{ marginBottom: "0.35em" }} />
            Payout Rules
          </Header>
        </div>
        <div
          style={{
            marginTop: "3em",
            marginBottom: "2em",
            marginRight: "25em",
            marginLeft: "25em"
          }}
        >
          <Table celled color="black" textAlign="center" inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Event Id</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Payout</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.rules.map((rules, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{rules.eventId}</Table.Cell>
                    <Table.Cell>{rules.eventDescription}</Table.Cell>
                    <Table.Cell>{rules.payOut}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          <div align="center" style={{ marginTop: "3em" }}>
            <button
              class="ui button"
              onClick={() =>
                this.handleRuleAddtion(this.props.location.pathname)
              }
              style={{
                width: "500px",
                height: "35px",
                borderRadius: "20px",
                backgroundColor: "#ffbe31"
              }}
            >
              ADD NEW RULE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Gym;
