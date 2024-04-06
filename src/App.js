import React from 'react';
import Header from './components/Header/Header';
import Graph3D from './components/Graph3D/Graph3D';
import Graph2D from './components/Graph2D/Graph2D';
import Esse from './components/Esse/Esse';
import StudentSimulator from './components/StudentSimulator/StudentSimulator';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageName: 'graph3D'
    };
  }

  setPageName(name) {
    this.setState({ pageName: name });
  }

  render() {
    return (<div className='app'>
      <Header setPageName={name =>
        this.setPageName(name)
      } />
      { this.state.pageName === 'graph3D' && <Graph3D /> }
      { this.state.pageName === 'graph2D' && <Graph2D /> }
      { this.state.pageName === 'esse' && <Esse /> }
      { this.state.pageName === 'studentSimulator' && <StudentSimulator /> }
    </div>);
  }
}

export default App;
