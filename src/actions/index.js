import * as types from './types';

export function getProject(){
    return {
        type: types.GET_PROJECT,
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

export function getTodoInbox(){
    return {
        type: types.GET_TODO_INBOX,
    }
}

export function getTodoToday(){
    return {
        type: types.GET_TODO_TODAY,
    }
}

export function getTodoWeek(){
    return {
        type: types.GET_TODO_WEEK,
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
