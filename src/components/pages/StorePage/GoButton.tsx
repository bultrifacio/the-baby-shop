import React from "react";
import {Button} from "antd";
import {RightOutlined} from "@ant-design/icons/lib";
import {navigate} from "@reach/router";
import {PathEnum} from "../../../shared/enum/PathEnum";

interface GoButtonProps {
    storeId: string;
}

export const GoButton: React.FunctionComponent<GoButtonProps> = props => {

    const selectStoreView = () => navigate(PathEnum.PRODUCTS, {state: {storeViewId: props.storeId}});

    return <Button type="primary" shape="circle" onClick={selectStoreView} icon={<RightOutlined/>}/>
};
