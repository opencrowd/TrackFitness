import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import ReactToPrint from "react-to-print";

import { Input, Container, Button, Header } from "semantic-ui-react";
import "./../App.css";
var QRCode = require("qrcode.react");

class QRcode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      url: "http://3.81.19.32:8080/markAttendance?",
      size: 256,
      fgColor: "#000000",
      bgColor: "#ffffff",
      level: "L",
      renderAs: "svg",
      includeMargin: false
    };
  }

  render() {
    console.log(
      this.state.url +
        "gymId=" +
        this.props.value +
        "&date=" +
        this.props.date +
        "&accountId="
    );
    return (
      <div>
        <br />

        <Container textAlign="center">
          <QRCode
            value={this.state.url + "gymId=" + this.props.value}
            size={this.state.size}
            fgColor={this.state.fgColor}
            bgColor={this.state.bgColor}
            level={this.state.level}
            renderAs={this.state.renderAs}
            includeMargin={this.state.includeMargin}
          />
        </Container>
        <br />
        <br />
      </div>
    );
  }
}

class QRGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <br />

        <Container textAlign="center">
          <Header as="h1">QR Code Generator</Header>
          <br />
          <br />

          <Input
            icon="qrcode"
            iconPosition="left"
            placeholder="Gym Id .."
            onChange={e => this.setState({ value: e.target.value })}
          />
          <br />
          <br />
          <br />

          <QRcode
            value={this.state.value}
            ref={el => (this.componentRef = el)}
          />
          <ReactToPrint
            trigger={() => <a href="#">Print this out!</a>}
            content={() => this.componentRef}
          />
        </Container>
        <br />
        <br />
      </div>
    );
  }
}

export default QRGenerator;
