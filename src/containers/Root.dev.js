import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from '../layout/App';
import DevTools from './DevTools';

export default class Root extends Component {
    render() {
        const { store } = this.props;
        console.log(store);
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
                { window.devToolsExtension ? null : <DevTools /> }
            </Provider>
        );
    }
}
