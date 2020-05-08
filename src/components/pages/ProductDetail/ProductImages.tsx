import {Carousel} from "antd";
import React from "react";
import {Image} from "../../Image/Image";

interface ProductImagesProps {
    images?: Array<string>;
}

export const ProductImages: React.FunctionComponent<ProductImagesProps> = props => {

    return (
        <div className="carousel-container">
            <Carousel>
                {props.images?.map((url: string) => <Image className="img" url={[url]}/>)}
            </Carousel>
        </div>
    );
};