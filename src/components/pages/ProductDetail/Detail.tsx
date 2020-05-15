import React from "react";
import {Product} from "../../../shared/model/Product";
import {SizesList} from "./SizesList";
import Img from "react-image";
import {Price} from "../../FinalPrice/Price";
import isNil from 'lodash/isNil';
import {useIntl} from "react-intl";

interface DetailProps {
    product?: Product;
}

export const Detail: React.FunctionComponent<DetailProps> = props => {

    const {product} = props;

    const intl = useIntl();

    if (isNil(product)) return null;

    const {name, originalPrice, finalPrice, description, color, composition, sizes, care} = product;

    const Name: React.FunctionComponent = () => <h1>{name}</h1>;

    const FinalPrice: React.FunctionComponent = () => <Price originalPrice={originalPrice} finalPrice={finalPrice}/>;

    const Description: React.FunctionComponent = () => <span>{description}</span>;

    const Color: React.FunctionComponent = () => {
        return (
            <React.Fragment>
                <span>{intl.formatMessage({id: 'detail.color.message'})} </span>
                <span>{color}</span>
            </React.Fragment>);
    }

    const Composition: React.FunctionComponent = () => {
        return (
            <React.Fragment>
                <span>{intl.formatMessage({id: 'detail.composition.message'})} </span>
                <span>{composition}</span>
            </React.Fragment>);
    }

    return (
        <div className="details-container">
            <div className="product-name">
                <Name/>
            </div>
            <div className="product-price">
                <FinalPrice/>
            </div>
            <div className="detail-item">
                <Description/>
            </div>
            <div className="detail-item">
                <Color/>
            </div>
            <div className="detail-item">
                <Composition/>
            </div>
            <SizesList sizes={sizes}/>
            <Img className="care-image" src={care}/>
        </div>
    );
};