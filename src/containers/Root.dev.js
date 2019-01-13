import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import { Switch } from 'react-router';
import App from '../layout/App';
import LoginContainer from '../containers/LoginContainer';
import DevTools from './DevTools';
import configureStore from '../store/configureStore';
import { getTodoToday, getProject } from '../actions';
import '../styles/main.scss';
import {setAuthToken} from '../api';
import jwt_decode from 'jwt-decode';
import {setCurrentUser,logoutUser} from '../actions';

const store = configureStore();

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
    store.dispatch(getTodoToday({userId:decoded.id}));
    store.dispatch(getProject({userId:decoded.id}));
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
      store.dispatch(logoutUser(store.history));
      window.location.href = '/login';
    }
} else{
    if(window.location.href==='http://localhost:3000/'){
        window.location.replace('/login');
    }
}


export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                    <Route path="/main" component={ App } />
                    <Route exact path="/login" component={ LoginContainer } />
                    </Switch>
                </BrowserRouter>
                { window.devToolsExtension ? null : <DevTools /> }
            </Provider>
        );
    }
}
