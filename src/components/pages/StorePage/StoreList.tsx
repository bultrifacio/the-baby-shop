import React from "react";
import {Store} from "../../../shared/model/Store";
import {Card} from "antd";
import {StoreViewList} from "./StoreViewList";

interface StoreListProps {
    stores: Array<Store>;
}

export const StoreList: React.FunctionComponent<StoreListProps> = props => {

    return (
        <React.Fragment>
            {props.stores.map((store: Store) => {
                return (
                    <Card title={store.name} bordered>
                        <StoreViewList storeViews={store.storeViews}/>
                    </Card>
                );
            })}
        </React.Fragment>
    );
};