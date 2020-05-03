import React from "react";
import {RouteComponentProps} from "@reach/router";
import {getStores} from "./store.service";
import {Store} from "../../../shared/model/Store";
import {StoreList} from "./StoreList";

export const StorePage: React.FunctionComponent<RouteComponentProps> = () => {

    const [stores, setStores] = React.useState<Array<Store>>([]);

    React.useEffect(() => {
        getStores().then((response: Array<Store>) => {
            setStores(response);
        });
    }, []);

    return (
        <div className="store-page">
            <StoreList stores={stores}/>
        </div>);
};