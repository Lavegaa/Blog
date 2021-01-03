import React from 'react';
import { BrowserRouter }  from 'react-router-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import GlobalStyle from './GlobalStyle';


const Root = () => {
    return (
        <Provider store = {store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
            <GlobalStyle />
        </Provider>
    )
}

export default Root;