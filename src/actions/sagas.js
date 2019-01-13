import { put, call, takeEvery } from 'redux-saga/effects';
import { registerUsers, loginUsers ,getProjects, postProject, deleteProject, getTodosInbox, getTodosByDay, getTodosByWeek,postTodo, deleteTodo, putTodo } from '../api';
import * as types from './types';
import jwt_decode from 'jwt-decode';
import {setAuthToken} from '../api';

function* handleServerResponse(todo, success, failed, errorMsg, additional = {}) {
    if (todo && todo.name) {
        yield put(Object.assign({}, { type: success, todo }, additional));
    } else {
        yield put({ type: failed, error: errorMsg });
    }
}

export function * getProject(action){
    const project = yield call(getProjects,action.userId);
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

export function * getTodoInbox(action){
    const todo = yield call(getTodosInbox,action.userId);
    yield put({
        type: types.GET_TODO_INBOX_SUCCESS,
        todos: todo
    });
}

function* watchGetTodoInbox() {
    yield takeEvery(types.GET_TODO_INBOX, getTodoInbox);
}

export function * getTodoToday(action){
    const todo = yield call(getTodosByDay,action.userId);
    yield put({
        type: types.GET_TODO_TODAY_SUCCESS,
        todos: todo
    });
}

function* watchGetTodoToday() {
    yield takeEvery(types.GET_TODO_TODAY, getTodoToday);
}

export function * getTodoWeek(action){
    const todo = yield call(getTodosByWeek,action.userId);
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

export function* registerUser(action){
    try{
        const user = yield call(registerUsers, action.user);
        if(user._id){
            // yield put(Object.assign({}, { type: types.REGISTER_USER_SUCCESS, user }, {}));
            alert('注册成功！')
        }else{
            yield put({
                type: types.REGISTER_USER_FAILED,
                error: user
            });
        }
    }catch(e){
        yield put({
            type: types.REGISTER_USER_FAILED,
            user: e
        });
    }
}

function* watchRegisterUser() {
    yield takeEvery(types.REGISTER_USER, registerUser);
}

export function* loginUser(action){
    try{
        const res = yield call(loginUsers, action.user);
        if(res.success){
            const { token } = res;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const user = jwt_decode(token);
            const userId = {userId:user.id};
            yield put({type: types.SET_CURRENT_USER, user});
            yield put({type: types.GET_TODO_TODAY, userId});
            yield put({type: types.GET_PROJECT, userId});
        } else{
            yield put({
                type: types.LOGIN_USER_FAILED,
                error: res
            });
        }
    }catch(e){
        yield put({
            type: types.LOGIN_USER_FAILED,
            error: e
        });
    }
}

function* watchLoginUser() {
    yield takeEvery(types.LOGIN_USER, loginUser);
}

export function* logoutUser(action){
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    yield put({type:types.SET_CURRENT_USER,user:{}});
    yield put({
        type: types.GET_PROJECT_SUCCESS,
        projects: {}
    })
    yield put({
        type: types.GET_TODO_INBOX_SUCCESS,
        todos: {}
    });
    action.history.push('/login');
}

function* watchLogoutUser() {
    yield takeEvery(types.LOGOUT_USER, logoutUser);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield [
        watchLogoutUser(),
        watchLoginUser(),
        watchRegisterUser(),
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
