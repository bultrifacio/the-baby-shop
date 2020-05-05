import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import {StorePage} from "./components/pages/StorePage/StorePage";
import {Redirect, Router} from "@reach/router";
import {ProductSearchPage} from "./components/pages/ProductSearchPage/ProductSearchPage";
import {NotFound} from "./components/pages/NotFound/NotFound";
import {ProductDetail} from "./components/pages/ProductDetail/ProductDetail";

const App: React.FunctionComponent = () => {


    return (
        <div className="app">
            <Router>
                <StorePage path={`stores`}/>
                <ProductSearchPage path={`stores/:storeViewId/products`}/>
                <ProductDetail path={`stores/:storeViewId/products/:productId`}/>
                <NotFound default/>
                <Redirect from={'/'} to={`stores`} noThrow/>
            </Router>
        </div>
    );
}

export default App;
