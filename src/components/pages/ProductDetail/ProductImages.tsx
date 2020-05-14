import {Carousel} from "antd";
import React from "react";
import {Image} from "../../Image/Image";
import shortid from "shortid";
import isNil from 'lodash/isNil';

interface ProductImagesProps {
    images?: Array<string>;
}

export const ProductImages: React.FunctionComponent<ProductImagesProps> = props => {

    if (isNil(props.images)) return null;

    return (
        <div className="carousel-container">
            <Carousel>
                {props.images?.map((url: string) => <Image key={shortid.generate()} className="img" url={[url]}/>)}
            </Carousel>
        </div>
    );
};