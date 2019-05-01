import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BackendService from "../services/BackendService";

export default class Players extends Component {
  state = {
    players: []
  };

  componentDidMount() {
    BackendService.getPlayers().then(players => {
      this.setState({players})
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
                <th>Email</th>
              </tr>
              </thead>
              <tbody>
              {this.state.players.map(player => (
                <tr key={player.id}>
                  <td>{player.id}</td>
                  <td>{player.name}</td>
                  <td>{player.email}</td>
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
