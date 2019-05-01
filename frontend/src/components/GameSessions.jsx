import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import BackendService from "../services/BackendService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

export default class GameSessions extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            sessions: [],
            modalShow: false,
            feedbacks: []
        };
    }

    componentDidMount() {
        BackendService.getGameSessions().then(gameSessions => {
            this.setState({sessions: gameSessions})
        })
    }

    onClick = (gameSessionId) => {
        BackendService.getGameSessionFeedbacks(gameSessionId).then(feedbacks => {
            this.setState({feedbacks: feedbacks, modalShow: true})
        });
    };

    render() {
        let modalClose = () => this.setState({modalShow: false});
        return (
            <Row>
                <Col className="p-2">
                    <div className='table-responsive'>
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Total Feedbacks</th>
                                <th>Total Rate</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.sessions.map(session => (
                                <tr key={session.id}>
                                    <td>{session.id}</td>
                                    <td>{session.name}</td>
                                    <td>{session.totalFeedback}</td>
                                    <td>{session.totalRate}</td>
                                    <td>
                                        <Button size="sm" onClick={this.onClick.bind(null, session.id)}>
                                            <FontAwesomeIcon icon={faComments}/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Modal show={this.state.modalShow} onHide={modalClose} size="lg" >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Feedbacks
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <div className='table-responsive'>
                                        <table className="table table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <th>PlayerId</th>
                                                <th>Rate</th>
                                                <th>Message</th>
                                                <th>Created</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.feedbacks.map(feedback => (
                                                <tr key={feedback.player_id}>
                                                    <td>{feedback.player_id}</td>
                                                    <td>{feedback.rate}</td>
                                                    <td>{feedback.message}</td>
                                                    <td>{feedback.created}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Container>
                            </Modal.Body>
                        </Modal>
                    </div>
                </Col>
            </Row>
        )
    }

}
