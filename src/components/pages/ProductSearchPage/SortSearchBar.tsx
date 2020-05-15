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

    return (
        <div className="sort-search-bar">
            <div className="sort-search-bar-filter-container">
                <FilterButton onClickDrawerMenu={onClickDrawerMenu}/>
                <SelectDirection selectedDirection={selectedDirection} onChangeDirection={onChangeDirection}/>
                <SelectOrder selectedOrder={selectedOrder} onChangeOrder={onChangeOrder}/>
            </div>
            <SearchBar withText={withText} onChangeWithText={onChangeWithText}/>
        </div>
    );
};

const FilterButton: React.FunctionComponent<{ onClickDrawerMenu: Function }> = props => {
    const {onClickDrawerMenu} = props;

    return (
        <div className="sort-search-bar-item drawer-menu-button">
            <Button type="primary" onClick={() => onClickDrawerMenu(true)}>Filters</Button>
        </div>
    );
}

const SelectDirection: React.FunctionComponent<{ selectedDirection: DirectionEnum, onChangeDirection: Function }> = props => {
    const {selectedDirection, onChangeDirection} = props;
    const {Option} = Select;

    return (
        <div className="sort-search-bar-item">
            <Select value={selectedDirection}
                    onChange={(value: DirectionEnum) => onChangeDirection(value)}
                    placeholder="Sort order">
                <Option value={DirectionEnum.ASC}>{capitalize(DirectionEnum.ASC)}</Option>
                <Option value={DirectionEnum.DESC}>{capitalize(DirectionEnum.DESC)}</Option>
            </Select>
        </div>
    );
}

const SelectOrder: React.FunctionComponent<{ selectedOrder: OrderEnum, onChangeOrder: Function }> = props => {
    const {selectedOrder, onChangeOrder} = props;
    const {Option} = Select;

    return (
        <div className="sort-search-bar-item">
            <Select value={selectedOrder}
                    onChange={(value: OrderEnum) => onChangeOrder(value)}
                    placeholder="Select order">
                <Option value={OrderEnum.NAME}>{capitalize(OrderEnum.NAME)}</Option>
                <Option value={OrderEnum.PRICE}>{capitalize(OrderEnum.PRICE)}</Option>
                <Option value={OrderEnum.BESTSELLERS}>{capitalize(OrderEnum.BESTSELLERS)}</Option>
            </Select>
        </div>
    );
}

const SearchBar: React.FunctionComponent<{ withText: string, onChangeWithText: Function }> = props => {
    const {withText, onChangeWithText} = props;
    return (
        <div className="sort-search-bar-item">
            <Search placeholder="Search"
                    defaultValue={withText}
                    onSearch={(value: string) => onChangeWithText(value)}
                    enterButton
                    allowClear/>
        </div>
    );
};