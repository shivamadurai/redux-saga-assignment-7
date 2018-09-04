import { takeLatest } from 'redux-saga';
import { call,put } from 'redux-saga/effects'
import { getBoard, getAllBoards } from './services';

function* getBoardsList(action) {
    const boards = yield call(getAllBoards, null);
    yield put({ type: 'SET_BOARDS_LIST', payload: boards });
}

function* getCurrentBoard(action) {
    const board = yield call(getBoard, action.boardId);
    yield put({ type: 'SET_CURRENT_BOARD', payload: board});
}

export default function* sagas() {
    yield takeLatest('GET_BOARDS_LIST', getBoardsList);
    yield takeLatest('GET_CURRENT_BOARD', getCurrentBoard);
}