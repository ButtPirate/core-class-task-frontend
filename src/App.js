import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, FormGroup, Label, Input, Button} from 'reactstrap';

class App extends Component {
  constructor() {
    super();

    this.state = {
      tableData: [],
      fields: {
        idField: null,
        nameField: null
      },
      loading: false,
    }
  }

  columns = [
    {
      Header: 'ID',
      accessor: 'id'
    },{
      Header: 'name',
      accessor: 'name'
    },{
      Header: 'value',
      accessor: 'value'
    }
  ];



  //--- draw

  drawTable = () => {
    return (
      <div>
        <ReactTable
          data={this.state.tableData}
          columns={this.columns}
          className='table-wrapper'
          loading={this.state.loading}
        />
      </div>
    )
  };

  drawBar = () => {
    return (
      <Container fluid={true}>
        <Row className='top-bar-row'>
          <Col className='top-bar-column'>
            <FormGroup>
              <Label for="idField">Id</Label>
              <Input type="text"
                     name="ID field"
                     id="idField"
                     placeholder="Enter ID"
                     onChange={(event) => {this.setFieldValue('idField', event.target.value)}}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="nameField">Name</Label>
              <Input type="text"
                     name="Name field"
                     id="nameField"
                     placeholder="Enter name"
                     onChange={(event) => {this.setFieldValue('nameField', event.target.value)}}/>
            </FormGroup>
          </Col>
          <Col className='top-bar-button-column'>
            <Button color='secondary' block onClick={this.search}>Search</Button>
          </Col>
        </Row>
      </Container>
    );
  };

  //--- state

  search = async () => {
    this.setState({loading:true});

    let pageData = await this.fetchData();

    this.setState({tableData: pageData, loading: false});
  };

  setFieldValue = (fieldName, newValue) => {
    let newState = {...this.state};
    newState.fields[fieldName] = newValue;
    this.setState(newState);
  };



  //--- fetch

  fetchData = async() => {
    let fetchedData = await axios.get('api/table', {
      params:{
        id: this.state.fields.idField ? this.state.fields.idField : null,
        name: this.state.fields.nameField ? this.state.fields.nameField : null,
      }
    });

    return fetchedData.data;
  };


  //--- render

  render() {
    return (
      <div className='main-container'>
        {this.drawBar()}
        {this.drawTable()}
      </div>
    );
  }
}

export default App;
