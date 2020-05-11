import React from "react";
import {StoreView} from "../../../shared/model/Store";
import {List} from "antd";
import {RightRoundButton} from "./RightRoundButton";

interface StoreInfoProps {
    storeViews: Array<StoreView>;
}

export const StoreViewList: React.FunctionComponent<StoreInfoProps> = props => {

    return (
        <List
            size="small"
            dataSource={props.storeViews}
            renderItem={(storeView: StoreView) =>
                <List.Item actions={[<RightRoundButton storeId={storeView.storeId}/>]}>
                    {storeView.name}
                </List.Item>}
        />
    );
};