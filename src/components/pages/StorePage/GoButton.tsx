import React from "react";
import {Button} from "antd";
import {RightOutlined} from "@ant-design/icons/lib";

interface GoButtonProps {
    url: string;
}

export const GoButton: React.FunctionComponent<GoButtonProps> = props => {
    return <Button type="primary" shape="circle" href={props.url} icon={<RightOutlined/>}/>
};
