import React from "react";
import {StoreView} from "../../../shared/model/Store";
import {List} from "antd";
import {GoButton} from "./GoButton";

interface StoreInfoProps {
    storeViews: Array<StoreView>;
}

export const StoreViewList: React.FunctionComponent<StoreInfoProps> = props => {

    return (
        <List
            size="small"
            dataSource={props.storeViews}
            renderItem={(storeView: StoreView) =>
                <List.Item actions={[<GoButton storeId={storeView.storeId}/>]}>
                    {storeView.name}
                </List.Item>}
        />
    );
};