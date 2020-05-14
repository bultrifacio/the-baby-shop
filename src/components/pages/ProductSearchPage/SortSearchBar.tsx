import React from "react";
import {Button, Select} from "antd";
import {DirectionEnum} from "../../../shared/enum/DirectionEnum";
import capitalize from "lodash/capitalize";
import {OrderEnum} from "../../../shared/enum/OrderEnum";
import Search from "antd/es/input/Search";

interface SortSearchBarProps {
    selectedDirection: DirectionEnum;
    onChangeDirection: Function;
    selectedOrder: OrderEnum;
    onChangeOrder: Function;
    withText: string;
    onChangeWithText: Function;
    onClickDrawerMenu: Function;
}

export const SortSearchBar: React.FunctionComponent<SortSearchBarProps> = props => {

    const {selectedDirection, onChangeDirection, selectedOrder, onChangeOrder, withText, onChangeWithText, onClickDrawerMenu} = props;

    const {Option} = Select;

    return (
        <div className="sort-search-bar">
            <div className="sort-search-bar-filter-container">
                <div className="sort-search-bar-item drawer-menu-button">
                    <Button type="primary" onClick={() => onClickDrawerMenu(true)}>Filters</Button>
                </div>
                <div className="sort-search-bar-item">
                    <Select value={selectedDirection}
                            onChange={(value: DirectionEnum) => onChangeDirection(value)}
                            placeholder="Sort order">
                        <Option value={DirectionEnum.ASC}>{capitalize(DirectionEnum.ASC)}</Option>
                        <Option value={DirectionEnum.DESC}>{capitalize(DirectionEnum.DESC)}</Option>
                    </Select>
                </div>
                <div className="sort-search-bar-item">
                    <Select value={selectedOrder}
                            onChange={(value: OrderEnum) => onChangeOrder(value)}
                            placeholder="Select order">
                        <Option value={OrderEnum.NAME}>{capitalize(OrderEnum.NAME)}</Option>
                        <Option value={OrderEnum.PRICE}>{capitalize(OrderEnum.PRICE)}</Option>
                        <Option value={OrderEnum.BESTSELLERS}>{capitalize(OrderEnum.BESTSELLERS)}</Option>
                    </Select>
                </div>
            </div>
            <div className="sort-search-bar-item">
                <Search placeholder="Search"
                        defaultValue={withText}
                        onSearch={(value: string) => onChangeWithText(value)}
                        enterButton
                        allowClear/>
            </div>
        </div>
    );
};