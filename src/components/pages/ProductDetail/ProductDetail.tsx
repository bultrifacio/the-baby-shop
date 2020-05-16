import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { getProduct } from './product.service';
import './ProductDetail.less';
import { ProductImages } from './ProductImages';
import { Detail } from './Detail';
import { BreadcrumbBar } from '../../BreadcrumbBar/BreadcrumbBar';
import { useQuery } from 'react-query';
import { message } from 'antd';
import { PageEnum } from '../../../shared/enum/PageEnum';
import { useIntl } from 'react-intl';

interface ProductDetailProps extends RouteComponentProps {
    storeViewId?: string;
    productId?: string;
}

export const ProductDetail: React.FunctionComponent<ProductDetailProps> = (props) => {
    const [storeViewId, setStoreViewId] = React.useState<string>('');
    const [productId, setProductId] = React.useState<string>('');

    const intl = useIntl();

    React.useEffect(() => {
        if (props.storeViewId) setStoreViewId(props.storeViewId);
    }, [props.storeViewId]);

    React.useEffect(() => {
        if (props.productId) setProductId(props.productId);
    }, [props.productId]);

    const { data: product, failureCount } = useQuery({
        queryKey: ['product', { storeViewId, productId }],
        queryFn: () => getProduct(storeViewId, productId),
    });

    React.useEffect(() => {
        if (failureCount === 1) message.error(intl.formatMessage({ id: 'product.details.request.error' }));
    }, [failureCount, intl]);

    return (
        <div className="product-detail">
            <BreadcrumbBar page={PageEnum.PRODUCT_DETAIL} />
            <ProductImages images={product?.images} />
            <Detail product={product} />
        </div>
    );
};
