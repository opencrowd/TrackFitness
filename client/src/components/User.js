import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
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

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: 0,
      toAccountId: 1001,
      activityHistory: [],
      events: [
        {
          eventId: 2,
          description: "Run 15 miles in 1 week",
          currentStat: 14,
          requiredStat: 15,
          payout: 150
        },
        {
          eventId: 4,
          description: "Walk 10k steps in 1 day",
          currentStat: 11000,
          requiredStat: 10000,
          payout: 250
        },
        {
          eventId: 6,
          description: "Cycle 15 miles in 1 day",
          currentStat: 4,
          requiredStat: 15,
          payout: 100
        }
      ],
      claimData: [{ organizationId: 1, eventId: 4, payOut: 250 }],
      realmId: 0,
      shardId: 0,
      amount: 50,
      value: 0,
      balance: 0,
      status: 0,
      error: false,
      isLoading: false,
      showModal: false,
      claimWin: 0,
      eventId: 0
    };
  }

  componentWillMount = () => {
    this.setState({ accountId: this.props.location.state.accountId });
  };

  componentDidMount = () => {
    document.body.style.background = "#e2e6e7";
    this.getUserActivity();
  };

  getUserActivity = () => {
    axios({
      method: "get",
      url:
        "http://3.81.19.32:8080/userActivity?accountId=" + this.state.accountId
    }).then(val => {
      console.log("activity history");
      console.log(val);
      this.setState({ activityHistory: val.data });
    });
  };

  earnHbar = () => {
    axios({
      method: "post",
      url:
        "http://3.81.19.32:8080/transfer?fromAccountNum=2&toAccountNum=" +
        this.state.accountId +
        "&amount=500000000"
    }).then(val => {
      console.log(val);
    });
  };

  claim = eventId => {
    this.setState({
      isLoading: false,
      showModal: true,
      claimWin: 55,
      eventId: 45
    });

    axios({
      method: "post",
      url:
        "http://3.81.19.32:8080/transfer?fromAccountNum=2&toAccountNum=" +
        this.state.accountId +
        "&amount=25000000000"
    }).then(val => {
      console.log(val);
    });
    /*
    axios({
      method: "post",
      url:
        "http://3.81.19.32:8080/broadcastEvent?payerAccountNum=2&contractNum=1008&eventId=" +
        eventId +
        "&userId=" +
        this.state.accountId
    })
      .then(val => {
        console.log(val);
        this.componentDidMount();
        this.setState({
          isLoading: false,
          showModal: true,
          claimWin: 55,
          eventId: eventId
        });
      })
      .catch(error => {
        this.componentDidMount();
        console.log("error");
        this.setState({
          isLoading: false,
          showModal: true,
          claimWin: 90,
          eventId: eventId
        });
      });*/
  };

  handleClose = () => this.setState({ showModal: false });

  render() {
    return (
      <div style={{ marginBottom: "13em" }}>
        <div
          style={{ marginTop: "8em", marginLeft: "11em", marginRight: "11em" }}
        >
          <Grid>
            <Grid.Row columns={4}>
              <Grid.Column>
                <h3>Special</h3>
                <a
                  href="https://nike.com"
                  onClick={() => this.earnHbar()}
                  target="_blank"
                >
                  <Image
                    src={require("../resource/prod-tile-0.png")}
                    style={{
                      height: "250px",
                      width: "250px",
                      borderRadius: "10px"
                    }}
                  />
                </a>
                <h5 align="center">Scooter EXP 2300 (300 pts)</h5>
              </Grid.Column>
              <Grid.Column>
                <h3>Apparel</h3>
                <a
                  href="https://apple.com"
                  onClick={() => this.earnHbar()}
                  target="_blank"
                >
                  <Image
                    src={require("../resource/prod-tile-1.png")}
                    style={{
                      height: "250px",
                      width: "250px",
                      borderRadius: "10px"
                    }}
                  />
                </a>
                <h5 align="center">Nike Air Max 12 (200 pts)</h5>
              </Grid.Column>
              <Grid.Column>
                <h3>Electronics</h3>
                <a
                  href="https://www.apple.com/apple-watch-series-4/?afid=p238%7CsJKznVXu8-dc_mtid_20925qtb42335_pcrid_295216235016&cid=wwa-us-kwgo-watch-slid---apple+watch-e"
                  onClick={() => this.earnHbar()}
                  target="_blank"
                >
                  <Image
                    src={require("../resource/prod-tile-2.png")}
                    style={{
                      height: "250px",
                      width: "250px",
                      borderRadius: "10px"
                    }}
                  />
                </a>
                <h5 align="center">Apple iWatch 3 (400 pts)</h5>
              </Grid.Column>
              <Grid.Column>
                <h3>Food/Drink</h3>
                <a
                  href="https://www.apple.com/apple-watch-series-4/?afid=p238%7CsJKznVXu8-dc_mtid_20925qtb42335_pcrid_295216235016&cid=wwa-us-kwgo-watch-slid---apple+watch-e"
                  onClick={() => this.earnHbar()}
                  target="_blank"
                >
                  <Image
                    src={require("../resource/prod-tile-3.png")}
                    style={{
                      height: "250px",
                      width: "250px",
                      borderRadius: "10px"
                    }}
                  />
                </a>
                <h5 align="center">6 Pack Powerade (100 pts)</h5>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <br />
        <br />
        <div align="center">
          <br />
          <Header as="h3" icon textAlign="left" style={{ marginLeft: "12em" }}>
            Rewards Available
          </Header>
        </div>
        <div
          style={{
            marginTop: "1.5em",
            marginBottom: "2em",
            marginRight: "15em",
            marginLeft: "15em"
          }}
        >
          <Table celled color="black" textAlign="center" inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Event Id</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Current Stat</Table.HeaderCell>
                <Table.HeaderCell>Required Stat</Table.HeaderCell>
                <Table.HeaderCell>Payout</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.events.map((data, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{data.eventId}</Table.Cell>
                    <Table.Cell>{data.description}</Table.Cell>
                    <Table.Cell>{data.currentStat}</Table.Cell>
                    <Table.Cell>{data.requiredStat}</Table.Cell>
                    <Table.Cell>{data.payout + " Hbar"}</Table.Cell>
                    <Table.Cell>
                      <Modal
                        trigger={
                          <Button
                            inverted
                            color="blue"
                            disabled={
                              data.currentStat >= data.requiredStat
                                ? false
                                : true
                            }
                            onClick={() => {
                              this.claim(data.eventId);
                            }}
                          >
                            Claim
                          </Button>
                        }
                        open={this.state.showModal}
                        onClose={this.handleClose}
                        basic
                        size="small"
                      >
                        <img
                          src={require("../resource/hedera.png")}
                          class="ui large  image"
                          style={{
                            height: "155px",
                            width: "255px",
                            float: "left"
                          }}
                        />
                        <h2>Rewards Earned ::</h2>
                        <Modal.Content>
                          <h3>
                            You have just earned 250 Hbars for completing event
                            4.
                          </h3>

                          <Table
                            celled
                            textAlign="center"
                            style={{
                              backgroundColor: "transparent",
                              borderColor: "red"
                            }}
                          >
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell
                                  style={{
                                    backgroundColor: "transparent",
                                    color: "yellow",
                                    borderColor: "red"
                                  }}
                                >
                                  Organization Id
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                  style={{
                                    backgroundColor: "transparent",
                                    color: "yellow",
                                    borderColor: "red"
                                  }}
                                >
                                  Event Id
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                  style={{
                                    backgroundColor: "transparent",
                                    color: "yellow",
                                    borderColor: "red"
                                  }}
                                >
                                  Payout
                                </Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {this.state.claimData.map((claimData, key) => {
                                return (
                                  <Table.Row key={key}>
                                    <Table.Cell style={{ color: "yellow" }}>
                                      {claimData.organizationId}
                                    </Table.Cell>
                                    <Table.Cell style={{ color: "yellow" }}>
                                      {claimData.eventId}
                                    </Table.Cell>
                                    <Table.Cell style={{ color: "yellow" }}>
                                      {claimData.payOut}
                                    </Table.Cell>
                                  </Table.Row>
                                );
                              })}
                            </Table.Body>
                          </Table>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button
                            color="green"
                            onClick={this.handleClose}
                            inverted
                          >
                            <Icon name="checkmark" /> Okay
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
        <div align="center">
          <br />
          <br />
          <Header as="h3" icon textAlign="left" style={{ marginLeft: "12em" }}>
            Activity History
          </Header>
        </div>
        <div
          style={{
            marginTop: "1.5em",
            marginBottom: "2em",
            marginRight: "15em",
            marginLeft: "15em"
          }}
        >
          <Table celled color="black" textAlign="center" inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Gym Attended</Table.HeaderCell>
                <Table.HeaderCell>Step Count</Table.HeaderCell>
                <Table.HeaderCell>Miles Run</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.activityHistory.map((data, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>
                      {data.date.split("T")[0] + " " + data.date.split("T")[1]}
                    </Table.Cell>
                    <Table.Cell>{data.gymAttended}</Table.Cell>
                    <Table.Cell>{data.stepCount}</Table.Cell>
                    <Table.Cell>{data.milesRan}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

export default User;
