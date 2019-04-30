import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Header extends Component {

    logoStyle = {
        width: "64px"
    };
    rowStyle = {
        backgroundColor: "#ecf0f1"
    };

    render() {
        return (
            <Row>
                <Col md={12} className="text-left" style={this.rowStyle}>
                    <img style={this.logoStyle}
                         src="https://sharepointmaven.com/wp-content/uploads/2017/01/comments-icon.png" alt=""/>
                </Col>
            </Row>
        )
    }

}
