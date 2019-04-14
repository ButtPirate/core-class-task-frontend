import axios from "axios/index";
import React, { Component } from 'react';
import './App.css';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, FormGroup, Label, Input, Button} from 'reactstrap';

class ExampleTable extends Component {
  constructor() {
    super();

    this.state = {
      tableData: [],
      fields: {
        idField: null,
        nameField: null
      },
      order: 'id_asc',
      loading: false,
      pages: 1,
      pageSize: 3,
      page: 0
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
          defaultPageSize={3}
          pageSizeOptions={[3,5,10]}
          multiSort={false}
          pages={this.state.pages}
          manual
          onFetchData={(state, instance)=>{ if (this.state.tableData.length) { this.tableChange(state);} }
          }
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
            <Button color='secondary' block onClick={() => {this.search(true)}}>Search</Button>
          </Col>
        </Row>
      </Container>
    );
  };

  tableChange = (tableState) => {
    let orderCode = this.state.order;

    if (tableState.sorted.length) {
      orderCode = tableState.sorted[0].id;
      if (tableState.sorted[0].desc) {
        orderCode += '_desc';
      } else {
        orderCode += '_asc';
      }

    }

    if (this.state.pageSize === tableState.pageSize) {
      this.setState({pageSize: tableState.pageSize, page: tableState.page, order: orderCode}, ()=>{this.search(false)});
    } else {
      this.setState({pageSize: tableState.pageSize, page: tableState.page, order: orderCode}, ()=>{this.search(true)});
    }


  };


  //--- state

  search = async (withTotal) => {
    this.setState({loading:true});

    let response = await this.fetchData(withTotal);

    this.setState({tableData: response.result, loading: false});

    if (withTotal) {
      this.setState({pages: response.pages});
    }
  };

  setFieldValue = (fieldName, newValue) => {
    let newState = {...this.state};
    newState.fields[fieldName] = newValue;
    this.setState(newState);
  };


  //--- fetch

  fetchData = async(withTotal) => {
    let fetchedData = await axios.get('api/table', {
      params:{
        id: this.state.fields.idField ? this.state.fields.idField : null,
        name: this.state.fields.nameField ? this.state.fields.nameField : null,
        order: this.state.order,
        pageSize: this.state.pageSize,
        page: this.state.page,
        withTotal
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

export default ExampleTable;