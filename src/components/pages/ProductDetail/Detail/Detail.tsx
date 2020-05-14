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

    if (isNil(props.product)) return null;

    return (
        <div className="details-container">
            <div className="product-name">
                <h1>{props.product?.name}</h1>
            </div>
            <div className="product-price">
                <Price originalPrice={props.product?.originalPrice} finalPrice={props.product?.finalPrice} />
            </div>
            <Divider/>
            <div className="detail-item">
                <span>{props.product?.description}</span>
            </div>
            <div className="detail-item">
                <span>Color: </span><span>{props.product?.color}</span>
            </div>
            <div className="detail-item">
                <span>Composition: </span><span>{props.product?.composition}</span>
            </div>
            <SizesList sizes={props.product?.sizes}/>
            <Img className="care-image" src={props.product?.care} />
        </div>
    );
};