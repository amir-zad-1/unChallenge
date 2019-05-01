import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BackendService from "../services/BackendService";

export default class GameSessions extends Component {
  state = {
    sessions: []
  };

  componentDidMount() {
    BackendService.getGameSessions().then(gameSessions => {
      this.setState({sessions: gameSessions})
    })
  }

  render() {
    return (
      <Row>
        <Col className="p-2">
          <div className='table-responsive'>
            <table className="table table-striped table-hover">
              <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Feedbacks</th>
              </tr>
              </thead>
              <tbody>
              {this.state.sessions.map(session => (
                <tr key={session.id}>
                  <td>{session.id}</td>
                  <td>{session.name}</td>
                  <td>{session.name}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    )
  }

}
