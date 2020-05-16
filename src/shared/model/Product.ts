export interface Product {
    modelId: string;
    name: string;
    type: string;
    sky: string;
    description: string;
    url: string;
    color: string;
    composition: string;
    care: string; //image url
    originalPrice: number;
    finalPrice: number;
    finalPriceType: string;
    currency: string;
    images: Array<string>; //image url
    sizes: Array<ProductVariant>;
}

export interface ProductVariant {
    variantId: string;
    name: string;
    stockQty: number;
}
