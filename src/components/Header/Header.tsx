import React from "react";
import {Link} from "@reach/router";
import './Header.scss';

export const Header: React.FunctionComponent = () => {

    return (
        <nav className="header">
            <Link to={'/stores'}><span className="title">THE BABY SHOP</span></Link>
        </nav>
    );
}
