import React from "react";
import {Button, Result} from "antd";
import {RouteComponentProps} from "@reach/router";
import {PathEnum} from "../../../shared/enum/PathEnum";

export const NotFound: React.FunctionComponent<RouteComponentProps> = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" href={PathEnum.STORE}>Back Home</Button>}
        />
    );
};