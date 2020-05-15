import React from "react";
import {Button, Cascader, Divider, Select, Slider} from "antd";
import {CascaderOptionType} from "antd/es/cascader";
import shortid from "shortid";
import {ProductVariant} from "../../../shared/model/Product";
import {SliderValue} from "antd/es/slider";
import {CloseOutlined} from "@ant-design/icons/lib";
import CONSTANTS from "../../../shared/constants";

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

    const {categories, colors, composition, sizes} = props;
    const {selectedSize, selectedColor, selectedComposition, selectedPrice, selectedCategory} = props;
    const {onChangeComposition, onChangeColor, onChangeSize, onChangeCategory, onChangePrice, onClickClearFilters} = props;

    const {Option} = Select;

    const Categories: React.FunctionComponent = () => {
        return (
            <Cascader options={categories}
                      className="select-filter-item"
                      placeholder="Select a category"
                      value={selectedCategory}
                      allowClear
                      showSearch
                      onChange={(value: Array<string>) => onChangeCategory(value)}/>
        );
    }

    const PriceSlider: React.FunctionComponent = () => {
        return (
            <React.Fragment>
                <div>Select a range of price</div>
                <Slider step={CONSTANTS.SLIDE_STEP} range value={selectedPrice}
                        onChange={(value: SliderValue) => onChangePrice(value)}/>
            </React.Fragment>
        );
    }

    const SelectComposition: React.FunctionComponent = () => {
        return (
            <Select
                mode="multiple"
                className="select-filter-item"
                placeholder="Select composition"
                value={selectedComposition}
                onChange={(option: Array<string>) => onChangeComposition(option)}
            >
                {composition.map((composition: string) =>
                    <Option key={shortid.generate()} value={composition}>{composition}</Option>
                )}
            </Select>
        );
    }

    const SelectColor: React.FunctionComponent = () => {
        return (
            <Select
                mode="multiple"
                className="select-filter-item"
                placeholder="Select colors"
                value={selectedColor}
                onChange={(option: Array<string>) => onChangeColor(option)}
            >
                {colors.map((color: string) => <Option key={shortid.generate()}
                                                       value={color}>{color}</Option>)}
            </Select>
        );
    }

    const SelectSize: React.FunctionComponent = () => {
        return (
            <Select
                mode="multiple"
                className="select-filter-item"
                placeholder="Select sizes"
                value={selectedSize}
                onChange={(value: Array<string>) => onChangeSize(value)}
            >
                {sizes.map((size: ProductVariant) => <Option key={shortid.generate()}
                                                             value={size.variantId}>{size.name}</Option>)}
            </Select>
        );
    }

    const ClearButton: React.FunctionComponent = () =>
        <Button onClick={onClickClearFilters} icon={<CloseOutlined/>}>Clear filters</Button>

    return (
        <div className="search-filter">
            <div>
                <Divider/>
            </div>
            <div>
                <Categories/>
            </div>
            <div>
                <PriceSlider/>
            </div>
            <div>
                <SelectComposition/>
            </div>
            <div>
                <SelectColor/>
            </div>
            <div>
                <SelectSize/>
            </div>
            <div className="filter-buttons-container">
                <ClearButton/>
            </div>
        </div>
    );
};