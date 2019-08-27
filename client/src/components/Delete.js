import React from 'react';
import PropTypes from 'prop-types';
import Eos from 'eosjs';
import ScatterJS from 'scatter-js/dist/scatter.esm';
import { Button, Checkbox, Form,  Container } from 'semantic-ui-react'


const blockchainNetwork = "https://api-kylin.eosasia.one:443";
const blockchainDomain = "api-kylin.eosasia.one";
const apiPort = 443
const contractName = "bookrental11";
const tokenContract = "booktoken111";
const chainId = '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191';
const protocol = 'https';

const network = {
  protocol: protocol, // Defaults to https
  blockchain:'eos',
  host: blockchainDomain,
  port:apiPort,
  chainId: chainId
}
const requiredFields = {
  accounts:[network]
};

class Delete extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      accountNames: [],
      accountValue: ""
    };
  }


  clearFields = () => {
      document.getElementById("remove").reset();
    }



  render() {
  return (
    <div>
    <Container text style={{ marginTop: '5em' }}>
      <Form id="remove">
        <Form.Field>
          <label>Book Id</label>
          <input placeholder='Id' onChange = {(e) => {} } />
        </Form.Field>
        <Button type='submit' onClick={(event) => {} }>Delete</Button>
      </Form>
      </Container></div>
    )
  }
}

export default Delete;
