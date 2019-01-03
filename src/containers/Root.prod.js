import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from '../layout/App';

export default class Root extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    };
    
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
    }
}
