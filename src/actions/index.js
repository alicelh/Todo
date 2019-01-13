import * as types from './types';

export function getProject(id){
    return {
        type: types.GET_PROJECT,
        userId: id
    }
}

export function addProject(project){
    return {
        type: types.ADD_PROJECT,
        data: project
    }
}

export function deleteProject(id){
    return {
        type: types.DELETE_PROJECT,
        id
    }
}

export function getTodoInbox(id){
    return {
        type: types.GET_TODO_INBOX,
        userId: id
    }
}

export function getTodoToday(id){
    return {
        type: types.GET_TODO_TODAY,
        userId: id
    }
}

export function getTodoWeek(id){
    return {
        type: types.GET_TODO_WEEK,
        userId:id
    }
}

export function addTodo(todo) {
    return {
        type: types.ADD_TODO_CLICK,
        data: todo
    };
}

export function removeTodo(id) {
    return {
        type: types.REMOVE_TODO_CLICK,
        id
    };
}

export function updateTodo(id, updates) {
    return {
        type: types.UPDATE_TODO_CLICK,
        updates,
        id
    };
}

export function moveTodo(dragIndex, hoverIndex, todo) {
    return {
        type: types.MOVE_TODO,
        dragIndex,
        hoverIndex,
        todo
    };
}

export function registerUser(user,history){
    return{
        type: types.REGISTER_USER,
        user: user,
        history: history
    }
}

export function LoginUser(user){
    return{
        type: types.LOGIN_USER,
        user
    }
}

export function setCurrentUser(user){
    return {
        type: types.SET_CURRENT_USER,
        user: user
    }
}

export function logoutUser(history){
    return{
        type: types.LOGOUT_USER,
        history:history
    }
}
