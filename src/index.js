import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import { getTodoToday, getProject } from './actions'
import './styles/main.scss';

const store = configureStore();
store.dispatch(getTodoToday());
store.dispatch(getProject());

ReactDom.render(
    <AppContainer>
        <Root store={store}/>
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const NewRoot = require('./containers/Root').default;
        ReactDom.render(
            <AppContainer>
                <NewRoot store={store}/>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
