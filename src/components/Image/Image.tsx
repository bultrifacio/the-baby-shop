import React from "react";
import imagePlaceholder from "../../assets/img/image-placeholder.png";
import Img from "react-image";

interface ImageProps {
    className?: string;
    url: Array<string>;
}
export const Image: React.FunctionComponent<ImageProps> = props => {

    return <Img className={props.className} src={[...props.url, imagePlaceholder]}/>;
};