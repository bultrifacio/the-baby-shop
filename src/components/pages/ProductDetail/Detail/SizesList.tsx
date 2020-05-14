import React from "react";
import {ProductVariant} from "../../../../shared/model/Product";
import {SizeItem} from "./SizeItem";
import shortid from "shortid";
import isNil from 'lodash/isNil';

interface SizesListProps {
    sizes?: Array<ProductVariant>;
}

export const SizesList: React.FunctionComponent<SizesListProps> = props => {

    const {sizes} = props;

    if (isNil(sizes)) return null;

    return (
        <div className="size-item-list-container">
            {sizes.map((size: ProductVariant) => <SizeItem key={shortid.generate()} size={size}/>)}
        </div>
    );
};