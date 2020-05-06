import React from "react";
import {Product} from "../../../shared/model/Product";
import {Card, List} from "antd";
import Meta from "antd/es/card/Meta";
import {navigate, useLocation} from "@reach/router";

interface ProductListProps {
    products: Array<Product>
}

export const ProductList: React.FunctionComponent<ProductListProps> = props => {

    const location = useLocation();

    return (
        <div className="product-list-container">
            <List grid={{gutter: 20, column: 3}}
                  dataSource={props.products}
                  renderItem={(product: Product) =>
                      <List.Item>
                          <Card
                              bordered
                              cover={<img alt={product.description} className="product-image" src={"https://cdn.shopify.com/s/files/1/0028/4603/1930/products/Blush_baby_vest_with_silver_bolt_500x500.jpg?v=1539288798"}/>}
                              hoverable
                              onClick={() => navigate(`${location.pathname}/${product.modelId}`)}
                          >
                              <Meta title={product.name} description={`${product.finalPrice} €`}/>
                          </Card>
                      </List.Item>}
            />
        </div>
    );
};