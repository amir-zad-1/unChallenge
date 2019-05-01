import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Menu from './components/Menu';
import Header from './components/Header';
import Players from './components/Players';
import GameSessions from './components/GameSessions';

class App extends Component {

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Container>
                        <Header/>
                        <Menu/>
                        <Route exact path="/" component={Players} />
                        <Route exact path="/sessions" component={GameSessions} />
                    </Container>
                </React.Fragment>
            </Router>
        );
    }

}

export default App;
