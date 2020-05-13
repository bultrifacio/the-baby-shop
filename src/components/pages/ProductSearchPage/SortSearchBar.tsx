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

    const {Option} = Select;

    return (
        <div className="sort-search-bar">
            <div className="sort-search-bar-filter-container">
                <div className="sort-search-bar-item drawer-menu-button">
                    <Button type="primary" onClick={() => props.onClickDrawerMenu(true)}>Filters</Button>
                </div>
                <div className="sort-search-bar-item">
                    <Select value={props.selectedDirection}
                            onChange={(value: DirectionEnum) => props.onChangeDirection(value)}
                            placeholder="Sort order">
                        <Option value={DirectionEnum.ASC}>{capitalize(DirectionEnum.ASC)}</Option>
                        <Option value={DirectionEnum.DESC}>{capitalize(DirectionEnum.DESC)}</Option>
                    </Select>
                </div>
                <div className="sort-search-bar-item">
                    <Select value={props.selectedOrder}
                            onChange={(value: OrderEnum) => props.onChangeOrder(value)}
                            placeholder="Select order">
                        <Option value={OrderEnum.NAME}>{capitalize(OrderEnum.NAME)}</Option>
                        <Option value={OrderEnum.PRICE}>{capitalize(OrderEnum.PRICE)}</Option>
                        <Option value={OrderEnum.BESTSELLERS}>{capitalize(OrderEnum.BESTSELLERS)}</Option>
                    </Select>
                </div>
            </div>
            <div className="sort-search-bar-item">
                <Search placeholder="Search"
                        defaultValue={props.withText}
                        onSearch={(value: string) => props.onChangeWithText(value)}
                        enterButton
                        allowClear/>
            </div>
        </div>
    );
};