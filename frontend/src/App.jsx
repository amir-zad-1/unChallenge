import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Menu from './components/Menu';
import Header from './components/Header';
import Players from './components/Players';

import BackendService from './services/BackendService';

class App extends Component {

  state = {
    players: []
  };

  componentDidMount() {
    BackendService.getPlayers().then(players => { this.setState({players}) })
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Container>
            <Header/>
            <Menu/>
            <Players players={this.state.players} />
          </Container>
        </React.Fragment>
      </Router>
    );
  }

}

export default App;
