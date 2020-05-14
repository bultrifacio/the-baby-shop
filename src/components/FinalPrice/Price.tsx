import React from "react";
import './Price.less';
import isNil from 'lodash/isNil';

interface FinalPriceProps {
    originalPrice: number | undefined;
    finalPrice: number | undefined;
    originalPriceClassName?: string;
    finalPriceClassName?: string;
}

export const Price: React.FunctionComponent<FinalPriceProps> = props => {
    
    const {originalPrice, finalPrice, originalPriceClassName, finalPriceClassName} = props;

    if (isNil(originalPrice) || isNil(finalPrice)) return null;

    const hasDiscount = originalPrice !== finalPrice;

    const formatPrice = (price: number): string => {
        return `${price / 100} €`;
    };

    const originalPriceClass = originalPriceClassName ? originalPriceClassName : 'original-price';
    const finalPriceClass = finalPriceClassName ? originalPriceClassName : 'final-price';

    return (
        <div className="final-price-container">
            {hasDiscount ? <span className={originalPriceClass}>{formatPrice(originalPrice)}</span> : null}
            <span className={finalPriceClass}>{formatPrice(finalPrice)}</span>
        </div>
    );
};