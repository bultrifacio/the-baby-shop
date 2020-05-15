import React, {useContext} from "react";
import {Link} from "@reach/router";
import './Header.less';
import {PathEnum} from "../../shared/enum/PathEnum";
import {Select} from "antd";
import {IntlContext} from "../IntlProviderWrapper/IntlProviderWrapper";

export const Header: React.FunctionComponent = () => {

    const {locale, switchLanguage} = useContext(IntlContext);

    const {Option} = Select;

    return (
        <nav className="header">
            <div className="link-container">
                <Link to={PathEnum.STORE}><span className="title">THE BABY SHOP</span></Link>
            </div>
            <div className="language-container">
                <Select value={locale} className="language-select" onChange={(value: string) => switchLanguage(value)}>
                    <Option value="en">EN</Option>
                    <Option value="es">ES</Option>
                </Select>
            </div>
        </nav>
    );
}
