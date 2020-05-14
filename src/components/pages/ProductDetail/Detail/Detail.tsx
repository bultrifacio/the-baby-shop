import React from "react";
import {Product} from "../../../../shared/model/Product";
import {SizesList} from "./SizesList";
import {Divider} from "antd";
import Img from "react-image";
import {Price} from "../../../FinalPrice/Price";
import isNil from 'lodash/isNil';

interface DetailProps {
    product?: Product;
}

export const Detail: React.FunctionComponent<DetailProps> = props => {

    const {product} = props;

    if (isNil(product)) return null;

    const {name, originalPrice, finalPrice, description, color, composition, sizes, care} = product;

    return (
        <div className="details-container">
            <div className="product-name">
                <h1>{name}</h1>
            </div>
            <div className="product-price">
                <Price originalPrice={originalPrice} finalPrice={finalPrice}/>
            </div>
            <Divider/>
            <div className="detail-item">
                <span>{description}</span>
            </div>
            <div className="detail-item">
                <span>Color: </span><span>{color}</span>
            </div>
            <div className="detail-item">
                <span>Composition: </span><span>{composition}</span>
            </div>
            <SizesList sizes={sizes}/>
            <Img className="care-image" src={care}/>
        </div>
    );
};