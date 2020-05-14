import React from "react";
import {Breadcrumb, Button} from "antd";
import {useLocation} from "@reach/router";
import {PageEnum} from "../../shared/enum/PageEnum";

interface BreadcrumbBarProps {
    page: PageEnum;
}

export const BreadcrumbBar: React.FunctionComponent<BreadcrumbBarProps> = props => {

    const location = useLocation();

    const [categoriesPath, setCategoriesPath] = React.useState<string>('');

    const {page} = props;

    React.useEffect(() => {
        const {pathname} = location;
        setCategoriesPath(pathname.slice(0, pathname.lastIndexOf('/')));
    }, [location]);

    return (
        <Breadcrumb className="breadcrumb-bar">
            <Breadcrumb.Item>
                Home
            </Breadcrumb.Item>
            {page === PageEnum.PRODUCTS ?
                <Breadcrumb.Item>
                    <Button href='/stores'>Stores</Button>
                </Breadcrumb.Item>
                : null}
            {page === PageEnum.PRODUCT_DETAIL ?
                <Breadcrumb.Item>
                    <Button href={categoriesPath}>Products</Button>
                </Breadcrumb.Item>
                : null}
        </Breadcrumb>
    );
};