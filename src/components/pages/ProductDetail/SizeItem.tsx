import React from 'react';
import { ProductVariant } from '../../../shared/model/Product';

interface SizesItemProps {
    size: ProductVariant;
}

export const SizeItem: React.FunctionComponent<SizesItemProps> = (props) => {
    const { size } = props;
    const { stockQty, name } = size;

    const isOutOfStock = stockQty < 1 ? 'size-item-fade' : '';

    return (
        <div className="size-item-container">
            <span className={`size-item ${isOutOfStock}`}>{name}</span>
        </div>
    );
};
