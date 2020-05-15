import React, {useContext} from "react";
import {Link} from "@reach/router";
import './Header.less';
import {PathEnum} from "../../shared/enum/PathEnum";
import {Select} from "antd";
import {IntlContext} from "../IntlProviderWrapper/IntlProviderWrapper";

export const Header: React.FunctionComponent = () => {

    const {locale, switchLanguage} = useContext(IntlContext);

    const {Option} = Select;
/*
    @types/jest @types/node @types/reach__router @types/react @types/react-dom @types/react-helmet @types/react-query @types/shortid
 */
    return (
        <nav className="header">
            <Link to={PathEnum.STORE}><span className="title">THE BABY SHOP</span></Link>
            <Select value={locale} className="language-select" onChange={(value: string) => switchLanguage(value)}>
                <Option value="en">EN</Option>
                <Option value="es">ES</Option>
            </Select>
        </nav>
    );
}
