import React from "react";
import {Product} from "../../../shared/model/Product";
import {SizeList} from "./SizeList";
import {Divider} from "antd";
import Img from "react-image";
import {Price} from "../../FinalPrice/Price";
import isNil from 'lodash/isNil';

interface DetailProps {
    product?: Product;
}

export const Detail: React.FunctionComponent<DetailProps> = props => {

    const {product} = props;

    if (isNil(product)) return null;

    const {name, originalPrice, finalPrice, description, color, composition, sizes, care} = product;

    const Name: React.FunctionComponent = () => <div className="product-name"><h1>{name}</h1></div>;

    const FinalPrice: React.FunctionComponent = () => <div className="product-price"><Price originalPrice={originalPrice} finalPrice={finalPrice}/></div>

    const Description: React.FunctionComponent = () => <div className="detail-item"><span>{description}</span></div>

    const Color: React.FunctionComponent = () => <div className="detail-item"><span>Color: </span><span>{color}</span></div>

    const Composition: React.FunctionComponent = () => <div className="detail-item"><span>Composition: </span><span>{composition}</span></div>

    return (
        <div className="details-container">
            <Name/>
            <FinalPrice/>
            <Divider/>
            <Description/>
            <Color/>
            <Composition/>
            <SizeList sizes={sizes}/>
            <Img className="care-image" src={care}/>
        </div>
    );
};