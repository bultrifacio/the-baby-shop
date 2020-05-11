import {Carousel} from "antd";
import React from "react";
import {Image} from "../../Image/Image";
import shortid from "shortid";

interface ProductImagesProps {
    images?: Array<string>;
}

export const ProductImages: React.FunctionComponent<ProductImagesProps> = props => {

    return (
        <div className="carousel-container">
            <Carousel>
                {props.images?.map((url: string) => <Image key={shortid.generate()} className="img" url={[url]}/>)}
            </Carousel>
        </div>
    );
};