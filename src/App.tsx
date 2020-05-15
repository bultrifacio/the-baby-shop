import React from 'react';
import {Redirect, Router} from "@reach/router";
import {Products} from "./components/pages/Products/Products";
import {NotFound} from "./components/pages/NotFound/NotFound";
import {ProductDetail} from "./components/pages/ProductDetail/ProductDetail";
import {Header} from "./components/Header/Header";
import './App.less';
import {StoreSelection} from "./components/pages/StoreSelection/StoreSelection";
import {PathEnum} from "./shared/enum/PathEnum";

const App: React.FunctionComponent = () => {
    return (
        <main className="app">
            <Header/>
            <Router>
                <StoreSelection path={PathEnum.STORE}/>
                <Products path={`${PathEnum.STORE}/:storeViewId/${PathEnum.PRODUCTS}`}/>
                <ProductDetail path={`${PathEnum.STORE}/:storeViewId/${PathEnum.PRODUCTS}/:productId`}/>
                <NotFound default/>
                <Redirect from={'/'} to={`stores`} noThrow/>
            </Router>
        </main>
    );
}

export default App;
