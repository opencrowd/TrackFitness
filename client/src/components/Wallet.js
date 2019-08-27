import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Button,
  Checkbox,
  Form,
  Container,
  Divider,
  Table,
  Header,
  Icon,
  Label,
  Message,
  Popup,
  Modal,
  Image
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: 0,
      toAccountId: 1004,
      realmId: 0,
      shardId: 0,
      amount: 0,
      data: [
        {
          company: "Apple",
          product: "Apple Watch 3",
          price: 2000,
          url: "https://www.apple.com/apple-watch-series-3/"
        },
        {
          company: "Fitbit",
          product: "Fitbit Versa Lite",
          price: 900,
          url:
            "https://www.fitbit.com/shop/versa?utm_source=&utm_medium=paidsearch&gclid=EAIaIQobChMI4OLh-abc4QIVl1uGCh0ODwNMEAAYASAAEgJpmPD_BwE&gclsrc=aw.ds"
        },
        {
          company: "Nike",
          product: "Nike Air Max",
          price: 100,
          url: "https://store.nike.com/us/en_us/pw/air-max-shoes/b8dZoi3"
        }
      ],
      value: 0,
      balance: 0,
      status: 0,
      quantity: 0,
      totalPrice: 0,
      error: false,
      isLoading: false,
      showPopup: false,
      showModal: false,
      deliveryAddress: "",
      transferSuccess: ""
    };
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  componentWillMount = () => {
    this.getBalance();
  };

  componentDidMount = async () => {
    document.body.style.background = "#e2e6e7";
    console.log("------");
    console.log(this.props.location.state.accountId);
    await this.setState({
      accountId: this.props.location.state.accountId
    });
    await this.getBalance();
  };

  getBalance = async () => {
    console.log("get balance called");
    axios({
      method: "get",
      url:
        "http://3.81.19.32:8080/getBalance?accountNum=" + this.state.accountId
    }).then(val => {
      this.setState({
        isLoading: false,
        status: val.status,
        balance: val.data
      });
    });
  };

  transferHbar = () => {
    this.setState({ isLoading: true });
    axios({
      method: "post",
      url:
        "http://3.81.19.32:8080/transfer?fromAccountNum=" +
        this.state.accountId +
        "&toAccountNum=" +
        this.state.toAccountId +
        "&amount=" +
        this.state.amount * 10 ** 8
    })
      .then(val => {
        console.log(val);
        this.setState({ transferSuccess: "Y" });
        this.componentDidMount();
      })
      .catch(error => {
        this.setState({ transferSuccess: "N" });
        console.log("exception raised in axios.post.transfer");
      });
  };

  buy = () => {
    console.log("here");
    axios({
      method: "post",
      url:
        "http://3.81.19.32:8080/transfer?fromAccountNum=" +
        this.state.accountId +
        "&toAccountNum=" +
        this.state.toAccountId +
        "&amount=" +
        this.state.totalPrice * 10 ** 8
    })
      .then(val => {
        console.log(val);
        this.componentDidMount();
        this.setState({ isLoading: false, showModal: false });
      })
      .catch(error => {
        this.componentDidMount();
        this.setState({ isLoading: false, showModal: false });
      });
  };

  handlePriceChange = val => {
    console.log(val);
    this.setState({ totalPrice: val });
  };

  statusCheck = () => {
    const { transferSuccess } = this.state;
    if (transferSuccess == "N") {
      return (
        <Message
          color="red"
          style={{
            textAlign: "center",
            marginLeft: "100px",
            marginRight: "100px",
            marginTop: "30px",
            marginBottom: "15px"
          }}
        >
          {" "}
          Transfer Failed{" "}
        </Message>
      );
    } else if (transferSuccess == "Y") {
      return (
        <Message
          color="green"
          style={{
            textAlign: "center"
          }}
        >
          {" "}
          Hbars Sent{" "}
        </Message>
      );
    } else {
      return <div />;
    }
  };

  render() {
    return (
      <Container text style={{ marginTop: "8em", marginBottom: "15em" }}>
        <div
          style={{ width: "750px", height: "520px", backgroundColor: "white" }}
        >
          <div align="center" style={{}}>
            <div
              style={{
                display: "inline-block",
                paddingRight: "10px",
                paddingTop: "35px"
              }}
            >
              <p style={{ fontSize: "23px" }}>My Hedera Balance</p>
            </div>
            <div style={{ display: "inline-block", paddingTop: "21px" }}>
              <Button
                onClick={event => {
                  this.getBalance();
                }}
                animated="vertical"
                style={{
                  backgroundColor: "#ffbe31",
                  borderRadius: "15px",
                  height: "42px"
                }}
              >
                <Button.Content hidden>Refresh</Button.Content>
                <Button.Content visible>
                  <Icon name="refresh" />
                </Button.Content>
              </Button>
            </div>
            <div
              style={{
                fontSize: "15px",
                textAlign: "center",
                paddingRight: "50px",
                paddingTop: "15px"
              }}
            >
              <h1 style={{ fontSize: "18px" }}>
                {" "}
                {this.state.balance / 10 ** 8}{" "}
              </h1>
              <label>May 10th, 2019 10:15:30 EST</label>
            </div>
          </div>
          <div align="center">
            <Form id="register" style={{ paddingTop: "40px" }}>
              <Form.Field>
                <Header
                  as="h6"
                  style={{ paddingRight: "250px", fontSize: "15px" }}
                >
                  Recipient Account Id
                </Header>
                <input
                  onChange={e => this.setState({ toAccountId: e.target.value })}
                  style={{
                    width: "410px",
                    height: "35px",
                    borderRadius: "20px",
                    backgroundColor: "#d1d1d1"
                  }}
                />
              </Form.Field>
              <Form.Field>
                <Header
                  as="h6"
                  style={{ paddingRight: "280px", fontSize: "15px" }}
                >
                  Amount to Send
                </Header>
                <input
                  onChange={e => this.setState({ amount: e.target.value })}
                  style={{
                    width: "410px",
                    height: "35px",
                    borderRadius: "20px",
                    backgroundColor: "#d1d1d1"
                  }}
                />
              </Form.Field>
            </Form>
            <div style={{ paddingTop: "34px", paddingBottom: "35px" }}>
              <button
                class="ui button"
                onClick={event => {
                  this.transferHbar();
                }}
                style={{
                  width: "310px",
                  height: "35px",
                  borderRadius: "20px",
                  backgroundColor: "#ffbe31"
                }}
              >
                SEND
              </button>
              {this.statusCheck()}
            </div>
          </div>
        </div>

        <div
          hidden={this.props.location.pathname == "/user/wallet" ? false : true}
        >
          <Header as="h3" icon textAlign="left" style={{ paddingTop: "25px" }}>
            Hedera Store
          </Header>
        </div>
        <div
          hidden={this.props.location.pathname == "/user/wallet" ? false : true}
          style={{
            minWidth: "750px",
            minHeight: "200px",
            backgroundColor: "white",
            marginTop: "30px"
          }}
        >
          <Table
            celled
            color="black"
            hidden={
              this.props.location.pathname == "/user/wallet" ? false : true
            }
            textAlign="center"
            inverted
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>Company</Table.HeaderCell>
                <Table.HeaderCell>Product</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.data.map((data, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{key}</Table.Cell>
                    <Table.Cell>{data.company}</Table.Cell>
                    <Table.Cell>
                      <a href={data.url} target="_">
                        {data.product}
                      </a>
                    </Table.Cell>
                    <Table.Cell>{data.price}</Table.Cell>
                    <Table.Cell>
                      <Modal
                        trigger={
                          <Button
                            color="blue"
                            onClick={() => this.setState({ showModal: true })}
                            inverted
                          >
                            Buy
                          </Button>
                        }
                        open={this.state.showModal}
                      >
                        <Modal.Header>Spend Your Hbar</Modal.Header>
                        <Modal.Content>
                          <Form style={{ marginLeft: "11em" }} id="register">
                            <Form.Field>
                              <label>Product</label>
                              <input
                                value={data.product}
                                style={{ width: "370px" }}
                                readOnly
                              />
                            </Form.Field>
                            <Form.Field>
                              <label>Price</label>
                              <input
                                value={data.price}
                                style={{ width: "370px" }}
                                readOnly
                              />
                            </Form.Field>
                            <Form.Field>
                              <label>Quanity</label>
                              <input
                                style={{ width: "370px" }}
                                onChange={e =>
                                  this.setState({
                                    quantity: e.target.value,
                                    totalPrice: e.target.value * data.price
                                  })
                                }
                              />
                            </Form.Field>
                            <Form.Field>
                              <label>Total Price</label>
                              <input
                                value={this.state.totalPrice}
                                style={{ width: "370px" }}
                                readOnly
                              />
                            </Form.Field>
                            <Form.Field>
                              <label>Delivery Addres</label>
                              <input
                                style={{ width: "370px" }}
                                onChange={e =>
                                  this.setState({
                                    deliveryAddress: e.target.value
                                  })
                                }
                              />
                            </Form.Field>
                            <Button
                              primary
                              type="submit"
                              onClick={() => this.buy()}
                            >
                              Buy
                            </Button>
                            <Button
                              primary
                              type="submit"
                              onClick={() =>
                                this.setState({ showModal: false })
                              }
                            >
                              Close
                            </Button>
                          </Form>
                        </Modal.Content>
                      </Modal>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </Container>
    );
  }
}
export default Wallet;
