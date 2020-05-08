import React from "react";
import {Breadcrumb, Button} from "antd";
import {useLocation} from "@reach/router";

export const BreadcrumbBar: React.FunctionComponent = () => {

    const location = useLocation();

    const [categoriesPath, setCategoriesPath] = React.useState<string>('');

    React.useEffect(() => {
        const {pathname} = location;
        setCategoriesPath(pathname.slice(0 ,pathname.lastIndexOf('/')));
    }, [location]);

    return (
        <Breadcrumb className="breadcrumb-bar">
            <Breadcrumb.Item>
                Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Button href='/stores'>Stores</Button>
            </Breadcrumb.Item>
            {location.pathname.includes('/products/') ?
                <Breadcrumb.Item>
                    <Button href={categoriesPath}>Products</Button>
                </Breadcrumb.Item>
                : null}
        </Breadcrumb>
    );
};