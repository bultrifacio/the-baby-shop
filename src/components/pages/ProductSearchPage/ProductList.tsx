import React from "react";
import {Product} from "../../../shared/model/Product";
import {Card, List} from "antd";
import {navigate, useLocation} from "@reach/router";
import {Image} from "../../Image/Image";
import {Price} from "../../FinalPrice/Price";

interface ProductListProps {
    products: Array<Product>;
    currentProductPage: number;
    productsPerPage: number;
    onChangePagination: Function;
}

export const ProductList: React.FunctionComponent<ProductListProps> = props => {

    const location = useLocation();

    return (
        <div className="product-list-container">
            <List grid={{gutter: 20, column: 2, xs: 1, sm: 2, md: 2, lg: 2, xl: 2}}
                  dataSource={props.products}
                  pagination={{
                      size: "small",
                      showTotal: (total: number, range: [number, number]) => `${range[0]}-${range[1]} of ${total} items`,
                      defaultCurrent: 1,
                      showSizeChanger: true,
                      current: props.currentProductPage,
                      pageSize: props.productsPerPage,
                      className: 'list-pagination',
                      onChange: (page: number, pageSize?: number) => props.onChangePagination(page, pageSize),
                  }}
                  renderItem={(product: Product) =>
                      <List.Item>
                          <Card
                              bordered
                              cover={<Image url={product.images}/>}
                              hoverable
                              onClick={() => navigate(`${location.pathname}/${product.modelId}`)}
                          >
                              <div className="product-name">{product.name}</div>
                              <Price originalPrice={product.originalPrice} finalPrice={product.finalPrice}/>
                          </Card>
                      </List.Item>}
            />
        </div>
    );
};