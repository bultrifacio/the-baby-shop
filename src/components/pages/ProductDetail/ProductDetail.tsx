import React from "react";
import {RouteComponentProps} from "@reach/router";
import {getProduct} from "./product.service";
import {Product} from "../../../shared/model/Product";
import './ProductDetail.less';
import {ProductImages} from "./ProductImages";
import {Detail} from "./Detail/Detail";
import {BreadcrumbBar} from "../../BreadcrumbBar/BreadcrumbBar";

interface ProductDetailProps extends RouteComponentProps {
    storeViewId?: string;
    productId?: string;
}

export const ProductDetail: React.FunctionComponent<ProductDetailProps> = props => {

    const [product, setProduct] = React.useState<Product>();

    React.useEffect(() => {
        getProduct(props.storeViewId!, props.productId!).then((product: Product) => {
            setProduct(product);
        });
    }, [props.storeViewId, props.productId]);

    return (
        <div className="product-detail">
            <BreadcrumbBar />
            <ProductImages images={product?.images}/>
            <Detail product={product}/>
        </div>
    );
};