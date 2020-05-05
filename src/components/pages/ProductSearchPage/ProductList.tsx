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
            <List grid={{gutter: 40, column: 4}}
                  dataSource={props.products}
                  renderItem={(product: Product) =>
                      <List.Item>
                          <Card
                              bordered
                              cover={<img alt={product.description} src={product.images[0]}/>}
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