import React from "react";
import {Store} from "../../../shared/model/Store";
import {Card, List} from "antd";
import {StoreViewList} from "./StoreViewList";
import './StorePage.less';

interface StoreListProps {
    stores: Array<Store>;
}

export const StoreList: React.FunctionComponent<StoreListProps> = props => {

    return (
        <React.Fragment>
            <List dataSource={props.stores}
                  grid={{gutter: 40, column: 4}}
                  renderItem={(store: Store) =>
                      <List.Item>
                          <Card title={store.name} bordered>
                              <StoreViewList storeViews={store.storeViews}/>
                          </Card>
                      </List.Item>}/>
        </React.Fragment>
    );
};