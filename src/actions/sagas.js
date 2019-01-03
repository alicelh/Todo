import { put, call, takeEvery } from 'redux-saga/effects';
import { getProjects, postProject, deleteProject, getTodosInbox, getTodosByDay, getTodosByWeek,postTodo, deleteTodo, putTodo } from '../api';
import * as types from './types';

function* handleServerResponse(todo, success, failed, errorMsg, additional = {}) {
    if (todo && todo.name) {
        yield put(Object.assign({}, { type: success, todo }, additional));
    } else {
        yield put({ type: failed, error: errorMsg });
    }
}

export function * getProject(){
    const project = yield call(getProjects);
    yield put({
        type: types.GET_PROJECT_SUCCESS,
        projects: project
    })
}

function* watchGetProjects(){
    yield takeEvery(types.GET_PROJECT, getProject);
}

export function * addProject(action){
    const projects = yield call(postProject, action.data);
    yield put(Object.assign({}, { type: types.ADD_PROJECT_SUCCESS, projects }, {}));
}

function* watchAddProjects(){
    yield takeEvery(types.ADD_PROJECT, addProject);
}

export function* removeProject(action) {
    const projects = yield call(deleteProject, action.id);
    yield put(Object.assign({}, { type: types.DELETE_PROJECT_SUCCESS, projects }, {}));
}

function* watchDeleteProjects(){
    yield takeEvery(types.DELETE_PROJECT, removeProject);
}

export function * getTodoInbox(){
    const todo = yield call(getTodosInbox);
    yield put({
        type: types.GET_TODO_INBOX_SUCCESS,
        todos: todo
    });
}

function* watchGetTodoInbox() {
    yield takeEvery(types.GET_TODO_INBOX, getTodoInbox);
}

export function * getTodoToday(){
    const todo = yield call(getTodosByDay);
    yield put({
        type: types.GET_TODO_TODAY_SUCCESS,
        todos: todo
    });
}

function* watchGetTodoToday() {
    yield takeEvery(types.GET_TODO_TODAY, getTodoToday);
}

export function * getTodoWeek(){
    const todo = yield call(getTodosByWeek);
    yield put({
        type: types.GET_TODO_WEEK_SUCCESS,
        todos: todo
    });
}

function* watchGetTodoWeek() {
    yield takeEvery(types.GET_TODO_WEEK, getTodoWeek);
}

export function* addTodo(action) {
    try {
        const todo = yield call(postTodo, action.data);

        yield* handleServerResponse(
            todo,
            types.ADD_TODO_SUCCESS,
            types.ADD_TODO_FAILED,
            'NETWORK ERROR: Todo wasn\'t created'
        );
    } catch(e) {
        yield put({
            type: types.ADD_TODO_FAILED,
            error: e
        });
    }
}

function* watchAddTodo() {
    yield takeEvery(types.ADD_TODO_CLICK, addTodo);
}

export function* removeTodo(action) {
    try {
        const todo = yield call(deleteTodo, action.id);

        yield* handleServerResponse(
            todo,
            types.REMOVE_TODO_SUCCESS,
            types.REMOVE_TODO_FAILED,
            'NETWORK ERROR: Todo wasn\'t deleted'
        );
    } catch(e) {
        yield put({
            type: types.REMOVE_TODO_FAILED,
            error: e
        });
    }
}

function* watchRemoveTodo() {
    yield takeEvery(types.REMOVE_TODO_CLICK, removeTodo);
}

export function* updateTodo(action) {
    try {
        const { id, updates } = action;
        const todo = yield call(putTodo, id, updates);

        yield* handleServerResponse(
            todo,
            types.UPDATE_TODO_SUCCESS,
            types.UPDATE_TODO_FAILED,
            'NETWORK ERROR: Todo status wasn\'t updated',
            { updates }
        );
    } catch(e) {
        yield put({
            type: types.UPDATE_TODO_FAILED,
            error: e
        });
    }
}

function* watchUpdateTodo() {
    yield takeEvery(types.UPDATE_TODO_CLICK, updateTodo);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield [
        watchDeleteProjects(),
        watchAddProjects(),
        watchGetProjects(),
        watchGetTodoInbox(),
        watchGetTodoToday(),
        watchGetTodoWeek(),
        watchAddTodo(),
        watchRemoveTodo(),
        watchUpdateTodo()
    ];
}
