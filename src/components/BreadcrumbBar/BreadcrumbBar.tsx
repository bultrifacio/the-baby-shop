import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from '@reach/router';
import { PageEnum } from '../../shared/enum/PageEnum';
import { PathEnum } from '../../shared/enum/PathEnum';
import { useIntl } from 'react-intl';

interface BreadcrumbBarProps {
    page: PageEnum;
}

export const BreadcrumbBar: React.FunctionComponent<BreadcrumbBarProps> = (props) => {
    const location = useLocation();

    const [categoriesPath, setCategoriesPath] = React.useState<string>('');

    const { page } = props;

    const intl = useIntl();

    React.useEffect(() => {
        const { pathname } = location;
        setCategoriesPath(pathname.slice(0, pathname.lastIndexOf('/')));
    }, [location]);

    return (
        <Breadcrumb className="breadcrumb-bar">
            <Breadcrumb.Item>{intl.formatMessage({ id: 'breadcrumb.bar.home' })}</Breadcrumb.Item>
            {page === PageEnum.PRODUCTS || page === PageEnum.PRODUCT_DETAIL ? (
                <Breadcrumb.Item>
                    <Link to={PathEnum.STORE}>
                        <span>{intl.formatMessage({ id: 'breadcrumb.bar.store' })}</span>
                    </Link>
                </Breadcrumb.Item>
            ) : null}
            {page === PageEnum.PRODUCT_DETAIL ? (
                <Breadcrumb.Item>
                    <Link to={categoriesPath}>
                        <span>{intl.formatMessage({ id: 'breadcrumb.bar.products' })}</span>
                    </Link>
                </Breadcrumb.Item>
            ) : null}
        </Breadcrumb>
    );
};
