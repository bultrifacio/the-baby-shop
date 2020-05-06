import React from "react";
import {RouteComponentProps} from "@reach/router";
import {getProduct} from "./product.service";
import {Product} from "../../../shared/model/Product";

interface ProductDetailProps extends RouteComponentProps {
    storeViewId?: string;
    productId?: string;
}

export const ProductDetail: React.FunctionComponent<ProductDetailProps> = props => {

    const [product, setProduct] = React.useState<Product>();
    console.log(props.storeViewId, props.productId)
    React.useEffect(() => {
        getProduct(props.storeViewId!, props.productId!).then((product: Product) => {
            setProduct(product);
        });
    }, [props.storeViewId, props.productId]);

    return <div>{product?.description}</div>

};