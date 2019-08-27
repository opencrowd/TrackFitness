import React from 'react';
import PropTypes from 'prop-types';
import Eos from 'eosjs';
import ScatterJS from 'scatter-js/dist/scatter.esm';
import { Table, Container,Button } from 'semantic-ui-react';


const headerRow = [ 'Book ID', 'Name', 'Description', 'Genre', 'Cost' ];


class Books extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      data: []
    };
  }

  render() {
    return (
      <Container text style={{ marginTop: '5em' }}>
      <div align="center">

      </div>
      </Container>
    )
  }
}
export default Books;
