import React from "react";
import './FinalPrice.less';
import isNil from 'lodash/isNil';

interface FinalPriceProps {
    originalPrice: number | undefined;
    finalPrice: number | undefined;
    originalPriceClassName?: string;
    finalPriceClassName?: string;
}

export const FinalPrice: React.FunctionComponent<FinalPriceProps> = props => {

    if (isNil(props.originalPrice) || isNil(props.finalPrice)) return null;

    const hasDiscount = props.originalPrice === props.finalPrice;

    const formatPrice = (price: number): string => {
        return `${price / 100} €`;
    };

    const originalPriceClassName = props.originalPriceClassName ? props.originalPriceClassName : 'original-price';
    const finalPriceClassName = props.finalPriceClassName ? props.originalPriceClassName : 'final-price';

    return (
        <div className="final-price-container">
            {hasDiscount ? <span className={originalPriceClassName}>{formatPrice(props.originalPrice)}</span> : null}
            <span className={finalPriceClassName}>{formatPrice(props.finalPrice)}</span>
        </div>
    );
};