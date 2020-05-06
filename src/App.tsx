import React from 'react';
import './App.scss';
import {StorePage} from "./components/pages/StorePage/StorePage";
import {Redirect, Router} from "@reach/router";
import {ProductSearchPage} from "./components/pages/ProductSearchPage/ProductSearchPage";
import {NotFound} from "./components/pages/NotFound/NotFound";
import {ProductDetail} from "./components/pages/ProductDetail/ProductDetail";
import {Header} from "./components/Header/Header";

const App: React.FunctionComponent = () => {


    return (
        <main className="app">
            <Header/>
            <Router>
                <StorePage path={`stores`}/>
                <ProductSearchPage path={`stores/:storeViewId/products`}/>
                <ProductDetail path={`stores/:storeViewId/products/:productId`}/>
                <NotFound default/>
                <Redirect from={'/'} to={`stores`} noThrow/>
            </Router>
        </main>
    );
}

export default App;
