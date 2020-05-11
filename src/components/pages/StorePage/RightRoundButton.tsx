import React from "react";
import {Button} from "antd";
import {RightOutlined} from "@ant-design/icons/lib";
import {navigate, useLocation} from "@reach/router";
import {PathEnum} from "../../../shared/enum/PathEnum";

interface GoButtonProps {
    storeId: string;
}

export const RightRoundButton: React.FunctionComponent<GoButtonProps> = props => {

    const location = useLocation();

    const selectStoreView = () => navigate(`${location.pathname}/${props.storeId}/${PathEnum.PRODUCTS}`);

    return <Button type="primary" shape="circle" onClick={selectStoreView} icon={<RightOutlined/>}/>
};
