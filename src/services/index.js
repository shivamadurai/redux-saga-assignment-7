import axios from 'axios';

export function getAllBoards() {
    return axios.get('/api/boardsList').then(result => new Promise((resolve, reject) => {
        resolve(result.data);
    }));
}

export function getBoard(boardId) {
    return axios.get(`../api/board/${boardId}`).then(result => new Promise((resolve,reject) => {
        resolve(result.data);
    }));
}