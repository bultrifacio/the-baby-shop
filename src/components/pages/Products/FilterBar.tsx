import React from "react";
import {Button, Select} from "antd";
import {DirectionEnum} from "../../../shared/enum/DirectionEnum";
import {OrderEnum} from "../../../shared/enum/OrderEnum";
import Search from "antd/es/input/Search";
import {useIntl} from "react-intl";

interface SortSearchBarProps {
    selectedDirection: DirectionEnum;
    onChangeDirection: Function;
    selectedOrder: OrderEnum;
    onChangeOrder: Function;
    withText: string;
    onChangeWithText: Function;
    onClickDrawerMenu: Function;
}

export const FilterBar: React.FunctionComponent<SortSearchBarProps> = props => {

    const {selectedDirection, onChangeDirection, selectedOrder, onChangeOrder, withText, onChangeWithText, onClickDrawerMenu} = props;

    const {Option} = Select;
    const intl = useIntl();

    const FilterButton: React.FunctionComponent = () => {
        // Only appears in mobile layouts
        return (
            <div className="filter-bar-item drawer-menu-button">
                <Button type="primary"
                        onClick={() => onClickDrawerMenu(true)}>{intl.formatMessage({id: 'filter.bar.button.menu'})}</Button>
            </div>
        );
    }

    const SelectDirection: React.FunctionComponent = () => {
        return (
            <div className="filter-bar-item">
                <Select value={selectedDirection}
                        onChange={(value: DirectionEnum) => onChangeDirection(value)}
                        placeholder={intl.formatMessage({id: 'filter.bar.select.direction.placeholder'})}>
                    <Option
                        value={DirectionEnum.ASC}>{intl.formatMessage({id: 'filter.bar.select.direction.asc'})}</Option>
                    <Option
                        value={DirectionEnum.DESC}>{intl.formatMessage({id: 'filter.bar.select.direction.desc'})}</Option>
                </Select>
            </div>
        );
    }

    const SelectOrder: React.FunctionComponent = () => {
        return (
            <div className="filter-bar-item">
                <Select value={selectedOrder}
                        onChange={(value: OrderEnum) => onChangeOrder(value)}
                        placeholder={intl.formatMessage({id: 'filter.bar.select.order.placeholder'})}>
                    <Option value={OrderEnum.NAME}>{intl.formatMessage({id: 'filter.bar.select.order.name'})}</Option>
                    <Option value={OrderEnum.PRICE}>{intl.formatMessage({id: 'filter.bar.select.order.price'})}</Option>
                    <Option
                        value={OrderEnum.BESTSELLERS}>{intl.formatMessage({id: 'filter.bar.select.order.bestseller'})}</Option>
                </Select>
            </div>
        );
    }

    const SearchBar: React.FunctionComponent = () => {
        return (
            <div className="filter-bar-item">
                <Search placeholder={intl.formatMessage({id: 'filter.bar.search.input.placeholder'})}
                        defaultValue={withText}
                        onSearch={(value: string) => onChangeWithText(value)}
                        enterButton
                        allowClear/>
            </div>
        );
    };

    return (
        <div className="filter-bar">
            <div className="filter-bar-option-container">
                <FilterButton/>
                <SelectDirection/>
                <SelectOrder/>
            </div>
            <SearchBar/>
        </div>
    );
};