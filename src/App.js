import React, { Component } from 'react';
import './App.css';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExampleTable from './ExampleTable';
import ExampleUploader from './ExampleUploader';

class App extends Component {
  // switch = 'table';
  switch = 'uploader';

  render () {
    if (this.switch === 'table') {
      return <ExampleTable />
    } else {
      return <ExampleUploader/>
    }
  }
}

export default App;
