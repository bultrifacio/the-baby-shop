import React from "react";
import {ProductVariant} from "../../../../shared/model/Product";
import {SizeItem} from "./SizeItem";
import shortid from "shortid";

interface SizesListProps {
    sizes?: Array<ProductVariant>;
}

export const SizesList: React.FunctionComponent<SizesListProps> = props => {

    return (
        <div className="size-item-list-container">
            {props.sizes?.map((size: ProductVariant) => <SizeItem key={shortid.generate()} size={size}/>)}
        </div>
    );
};