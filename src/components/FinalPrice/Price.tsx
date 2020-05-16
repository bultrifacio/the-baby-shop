import React, {useContext} from "react";
import './Price.less';
import isNil from 'lodash/isNil';
import {IntlContext} from "../IntlProviderWrapper/IntlProviderWrapper";

interface FinalPriceProps {
    originalPrice: number | undefined;
    finalPrice: number | undefined;
    currency: string;
    originalPriceClassName?: string;
    finalPriceClassName?: string;
}

export const Price: React.FunctionComponent<FinalPriceProps> = props => {

    const {originalPrice, finalPrice, currency, originalPriceClassName, finalPriceClassName} = props;

    const {locale} = useContext(IntlContext);

    if (isNil(originalPrice) || isNil(finalPrice)) return null;

    const hasDiscount = originalPrice !== finalPrice;

    const formatPrice = (price: number): string => {
        const priceWithDecimals = price / 100;
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(priceWithDecimals);
    };

    const originalPriceClass = originalPriceClassName ? originalPriceClassName : 'original-price';
    const finalPriceClass = finalPriceClassName ? finalPriceClassName : 'final-price';

    return (
        <div className="final-price-container">
            {hasDiscount ? <span className={originalPriceClass}>{formatPrice(originalPrice)}</span> : null}
            <span className={finalPriceClass}>{formatPrice(finalPrice)}</span>
        </div>
    );
};