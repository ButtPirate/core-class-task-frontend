import React, { Component } from 'react';
import './App.css';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExampleTable from './ExampleTable';
import ExampleUploader from './ExampleUploader';

class App extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'choice'
    }
  }

  render () {
    if (this.state.mode ==='choice') {
      return (
        <div>
          <button onClick={()=>{this.setState({mode:'table'})}}>Задание 1 - просмотр таблицы</button>
          <button onClick={()=>{this.setState({mode:'uploader'})}}>Задание 2 - загрузка файлов</button>
        </div>
      )
    }

    if (this.state.mode=== 'table') {
      return <ExampleTable />
    }

    if (this.state.mode=== 'uploader') {
      return <ExampleUploader/>
    }
  }
}

export default App;
