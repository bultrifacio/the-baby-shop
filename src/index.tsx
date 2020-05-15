import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'moment/locale/es';
import {IntlProviderWrapper} from "./components/IntlProviderWrapper/IntlProviderWrapper";

ReactDOM.render(
    <IntlProviderWrapper>
        <App/>
    </IntlProviderWrapper>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
