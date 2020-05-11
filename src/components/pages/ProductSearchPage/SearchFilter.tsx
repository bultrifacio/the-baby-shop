import React from "react";
import {Button, Cascader, Divider, Select, Slider} from "antd";
import {CascaderOptionType} from "antd/es/cascader";
import shortid from "shortid";
import {ProductVariant} from "../../../shared/model/Product";
import {SliderValue} from "antd/es/slider";
import {CloseOutlined} from "@ant-design/icons/lib";

interface SearchFilterProps {
    categories: Array<CascaderOptionType>;
    colors: Array<string>;
    composition: Array<string>;
    sizes: Array<ProductVariant>;
    selectedSize: Array<string>;
    selectedColor: Array<string>;
    selectedComposition: Array<string>;
    selectedPrice: SliderValue;
    selectedCategory: Array<string>;
    onChangeComposition: Function;
    onChangeColor: Function;
    onChangeSize: Function;
    onChangeCategory: Function;
    onChangePrice: Function;
    onClickClearFilters: () => void;
}

export const SearchFilter: React.FunctionComponent<SearchFilterProps> = props => {

    const {Option} = Select;

    const SLIDER_STEP = 10;

    return (
        <div className="search-filter">
            <div>
                <Divider/>
            </div>
            <div>
                <Cascader options={props.categories}
                          className="select-filter-item"
                          placeholder="Select a category"
                          value={props.selectedCategory}
                          allowClear
                          showSearch
                          onChange={(value: Array<string>) => props.onChangeCategory(value)}/>
            </div>
            <div>
                <div>Select a range of price</div>
                <Slider step={SLIDER_STEP} range value={props.selectedPrice}
                        onChange={(value: SliderValue) => props.onChangePrice(value)}/>
            </div>
            <div>
                <Select
                    mode="multiple"
                    className="select-filter-item"
                    placeholder="Select composition"
                    value={props.selectedComposition}
                    onChange={(option: Array<string>) => props.onChangeComposition(option)}
                >
                    {props.composition.map((composition: string) =>
                        <Option key={shortid.generate()} value={composition}>{composition}</Option>
                    )}
                </Select>
            </div>
            <div>
                <Select
                    mode="multiple"
                    className="select-filter-item"
                    placeholder="Select colors"
                    value={props.selectedColor}
                    onChange={(option: Array<string>) => props.onChangeColor(option)}
                >
                    {props.colors.map((color: string) => <Option key={shortid.generate()}
                                                                 value={color}>{color}</Option>)}
                </Select>
            </div>
            <div>
                <Select
                    mode="multiple"
                    className="select-filter-item"
                    placeholder="Select sizes"
                    value={props.selectedSize}
                    onChange={(value: Array<string>) => props.onChangeSize(value)}
                >
                    {props.sizes.map((size: ProductVariant) => <Option key={shortid.generate()}
                                                                       value={size.variantId}>{size.name}</Option>)}
                </Select>
            </div>
            <div className="filter-buttons-container">
                <Button onClick={props.onClickClearFilters} icon={<CloseOutlined/>}>Clear filters</Button>
            </div>
        </div>
    );
};