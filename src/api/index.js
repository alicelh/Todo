import fetch from 'isomorphic-fetch';

const TODOS_URL = 'http://localhost:3001/todos';
const PROJECTS_URL = 'http://localhost:3001/projects';
const jsonHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export async function getProjects() {
    try {
        const options = { mode: 'cors', method: 'GET' };
        const response = await fetch(PROJECTS_URL, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function postProject(project) {
    try {
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: jsonHeaders,
            body: JSON.stringify(project)
        };

        const response = await fetch(PROJECTS_URL, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function deleteProject(id) {
    try {
        const options = {
            mode: 'cors',
            method: 'DELETE',
            headers: jsonHeaders
        };

        const response = await fetch(`${ PROJECTS_URL }/${id}`, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function getTodosInbox() {
    try {
        const options = { mode: 'cors', method: 'GET' };
        const response = await fetch(`${TODOS_URL}/inbox`, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function getTodosByDay() {
    try {
        const options = { mode: 'cors', method: 'GET' };
        const response = await fetch(`${TODOS_URL}/today`, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function getTodosByWeek() {
    try {
        const options = { mode: 'cors', method: 'GET' };
        const response = await fetch(`${TODOS_URL}/week`, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function postTodo(todo) {
    console.log(todo);
    try {
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: jsonHeaders,
            body: JSON.stringify(todo)
        };

        const response = await fetch(TODOS_URL, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function putTodo(id, update) {
    try {
        const options = {
            mode: 'cors',
            method: 'PUT',
            headers: jsonHeaders,
            body: JSON.stringify(update)
        };

        const response = await fetch(`${ TODOS_URL }/${id}`, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function deleteTodo(id) {
    try {
        const options = {
            mode: 'cors',
            method: 'DELETE',
            headers: jsonHeaders
        };

        const response = await fetch(`${ TODOS_URL }/${id}`, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}
