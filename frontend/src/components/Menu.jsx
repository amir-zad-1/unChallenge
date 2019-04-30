import Button from "react-bootstrap/Button";
import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUsers, faGamepad} from '@fortawesome/free-solid-svg-icons'


export default class Menu extends Component {

  menuStyle = {
    backgroundColor: "#27ae60"
  };

  render() {
    return (
      <Row>
        <Col style={this.menuStyle} className="p-2">
          <Button size="sm" alt="Users" className="mr-2">
            <FontAwesomeIcon icon={faUsers} />
          </Button>

          <Button size="sm" alt="Games">
            <FontAwesomeIcon icon={faGamepad} />
          </Button>
        </Col>
      </Row>
    )
  }

}
