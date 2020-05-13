import React from "react";
import {Button, Select} from "antd";
import shortid from "shortid";
import {Store, StoreView} from "../../../shared/model/Store";
import isNil from 'lodash/isNil';
import find from 'lodash/find';
import {navigate, RouteComponentProps, useLocation} from "@reach/router";
import {PathEnum} from "../../../shared/enum/PathEnum";
import {getStores} from "./store.service";
import './StoreSelection.less';

export const StoreSelection: React.FunctionComponent<RouteComponentProps> = () => {

    const [stores, setStores] = React.useState<Array<Store>>([]);
    const [selectedCountry, setSelectedCountry] = React.useState<string>();
    const [selectedCountryStores, setSelectedCountryStores] = React.useState<Array<StoreView>>();
    const [selectedStore, setSelectedStore] = React.useState<number>();
    const location = useLocation();

    React.useEffect(() => {
        getStores().then((response: Array<Store>) => {
            setStores(response);
        });
    }, []);

    React.useEffect(() => {
        const country = find(stores, {name: selectedCountry});
        if (country) setSelectedCountryStores(country.storeViews);
    }, [selectedCountry, stores]);

    const {Option} = Select;

    const selectStoreView = () => navigate(`${location.pathname}/${selectedStore}/${PathEnum.PRODUCTS}`);

    return (
        <div className="store-selection-container">
            <div className="store-selection">
                <div className="welcome-heading">
                    <h1>Welcome to The Baby Shop, please select a store</h1>
                </div>
                <div className="select-store-container">
                    <div className="select-store-item">
                        <Select placeholder="Select a country" value={selectedCountry}
                                onChange={(option: string) => setSelectedCountry(option)}>
                            {stores.map((store: Store) => <Option key={shortid.generate()}
                                                                  value={store.name}>{store.name}</Option>)}
                        </Select>
                    </div>
                    <div className="select-store-item">
                        <Select
                            placeholder="Select a store"
                            disabled={isNil(selectedCountry)}
                            value={selectedStore}
                            onChange={(storeViewId: number) => setSelectedStore(storeViewId)}
                        >
                            {selectedCountryStores?.map((storeView: StoreView) => <Option key={shortid.generate()}
                                                                                          value={storeView.storeId}>{storeView.name}</Option>)}
                        </Select>
                    </div>
                </div>
                <div className="accept-button-container">
                    <Button type="primary" disabled={isNil(selectedStore) || isNil(selectedCountry)}
                            onClick={selectStoreView}>Accept</Button>
                </div>
            </div>
        </div>
    );
};