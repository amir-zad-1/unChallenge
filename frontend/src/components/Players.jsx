import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Players extends Component {

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
              {this.props.players.map(player => (
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
