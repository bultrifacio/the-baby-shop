import React from "react";
import {Link} from "@reach/router";
import './Header.less';
import {PathEnum} from "../../shared/enum/PathEnum";

export const Header: React.FunctionComponent = () => {

    return (
        <nav className="header">
            <Link to={PathEnum.STORE}><span className="title">THE BABY SHOP</span></Link>
        </nav>
    );
}
