import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import {StorePage} from "./components/pages/StorePage/StorePage";
import {Router} from "@reach/router";
import {PathEnum} from "./shared/enum/PathEnum";
import {ProductSearchPage} from "./components/pages/ProductSearchPage/ProductSearchPage";
import {NotFound} from "./components/pages/NotFound/NotFound";

const App: React.FunctionComponent = () => {

    return (
        <div className="app">
            <Router>
                <StorePage path={PathEnum.STORE}/>
                <ProductSearchPage path={"/products"}/>
                <NotFound default/>
            </Router>
        </div>
    );
}

export default App;
