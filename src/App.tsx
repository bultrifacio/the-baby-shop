import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import {StorePage} from "./components/pages/StorePage/StorePage";
import {Router} from "@reach/router";
import {PathEnum} from "./shared/enum/PathEnum";

const App: React.FunctionComponent = () => {

    return (
        <div className="app">
            <Router>
                <StorePage path={PathEnum.STORE} />
            </Router>
        </div>
    );
}

export default App;
