import React from "react";
import {Product} from "../../../shared/model/Product";
import {Card, List} from "antd";
import {navigate, useLocation} from "@reach/router";
import {Image} from "../../Image/Image";
import {FinalPrice} from "../../FinalPrice/FinalPrice";

interface ProductListProps {
    products: Array<Product>
}

export const ProductList: React.FunctionComponent<ProductListProps> = props => {

    const location = useLocation();

    return (
        <div className="product-list-container">
            <List grid={{gutter: 40, column: 2}}
                  dataSource={props.products}
                  pagination={{
                      size: "small",
                      showTotal: (total: number, range: [number, number]) => `${range[0]}-${range[1]} of ${total} items`,
                      defaultCurrent: 1,
                      showSizeChanger: true,
                      className: 'list-pagination'
                  }}
                  renderItem={(product: Product) =>
                      <List.Item>
                          <Card
                              bordered={false}
                              cover={<Image url={product.images}/>}
                              hoverable
                              onClick={() => navigate(`${location.pathname}/${product.modelId}`)}
                          >
                              <div className="product-name">{product.name}</div>
                              <FinalPrice originalPrice={product.originalPrice} finalPrice={product.finalPrice} />
                          </Card>
                      </List.Item>}
            />
        </div>
    );
};