import axios from './Api';

const getPlayers = () => {
    return new Promise(resolve => {
        axios.get(`players`).then(getResponse => {
            resolve(getResponse.data);
        });
    });
};

const getGameSessions = () => {
    return new Promise(resolve => {
        axios.get(`gamesessions`).then(getResponse => {
            resolve(getResponse.data);
        });
    });
};

const getGameSessionFeedbacks = (gameSessionId) => {
    return new Promise(resolve => {
        axios.get(`gamesessions/${gameSessionId}/feedbacks`).then(getResponse => {
            resolve(getResponse.data);
        });
    });
};

export default {
    getGameSessions,
    getPlayers,
    getGameSessionFeedbacks
}
