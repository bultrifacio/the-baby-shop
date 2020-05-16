import React from "react";
import {Product} from "../../../shared/model/Product";
import {Card, List} from "antd";
import {navigate, useLocation} from "@reach/router";
import {Image} from "../../Image/Image";
import {Price} from "../../FinalPrice/Price";

interface ProductListProps {
    products: Array<Product> | undefined;
    currentProductPage: number;
    productsPerPage: number;
    onChangePagination: Function;
}

export const ProductList: React.FunctionComponent<ProductListProps> = props => {

    const {products, currentProductPage, productsPerPage, onChangePagination} = props;

    return (
        <div className="product-list-container">
            <List grid={{gutter: 20, column: 2, xs: 1}}
                  dataSource={products}
                  pagination={{
                      size: "small",
                      defaultCurrent: 1,
                      showSizeChanger: true,
                      current: currentProductPage,
                      pageSize: productsPerPage,
                      className: 'list-pagination',
                      onChange: (page: number, pageSize?: number) => onChangePagination(page, pageSize),
                  }}
                  renderItem={(product: Product) =>
                      <List.Item>
                          <ProductCard product={product} />
                      </List.Item>}
            />
        </div>
    );
};

const ProductCard: React.FunctionComponent<{ product: Product }> = props => {
    const {product} = props;
    const {images, modelId, name, originalPrice, finalPrice, currency} = product;
    const {pathname} = useLocation();

    return (
        <Card
            bordered
            cover={<Image url={images}/>}
            hoverable
            onClick={() => navigate(`${pathname}/${modelId}`)}
        >
            <div className="product-name">{name}</div>
            <Price originalPrice={originalPrice} finalPrice={finalPrice} currency={currency}/>
        </Card>
    );
};