import React from 'react';
import { Breadcrumb, Button } from 'antd';
import { useLocation } from '@reach/router';
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
            {page === PageEnum.PRODUCTS ? (
                <Breadcrumb.Item>
                    <Button href={PathEnum.STORE}>{intl.formatMessage({ id: 'breadcrumb.bar.store' })}</Button>
                </Breadcrumb.Item>
            ) : null}
            {page === PageEnum.PRODUCT_DETAIL ? (
                <Breadcrumb.Item>
                    <Button href={categoriesPath}>{intl.formatMessage({ id: 'breadcrumb.bar.products' })}</Button>
                </Breadcrumb.Item>
            ) : null}
        </Breadcrumb>
    );
};
