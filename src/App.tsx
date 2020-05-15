import React from 'react';
import {Redirect, Router} from "@reach/router";
import {Products} from "./components/pages/Products/Products";
import {NotFound} from "./components/pages/NotFound/NotFound";
import {ProductDetail} from "./components/pages/ProductDetail/ProductDetail";
import {Header} from "./components/Header/Header";
import './App.less';
import {StoreSelection} from "./components/pages/StoreSelection/StoreSelection";

const App: React.FunctionComponent = () => {
    return (
        <main className="app">
            <Header/>
            <Router>
                <StoreSelection path={`stores`}/>
                <Products path={`stores/:storeViewId/products`}/>
                <ProductDetail path={`stores/:storeViewId/products/:productId`}/>
                <NotFound default/>
                <Redirect from={'/'} to={`stores`} noThrow/>
            </Router>
        </main>
    );
}

export default App;
