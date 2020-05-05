import React from "react";
import {RouteComponentProps} from "@reach/router";
import {getCategories, getProducts} from "./products.service";
import {Category} from "../../../shared/model/Category";
import {CategoriesMenu} from "./CategoriesMenu";
import './ProductSearchPage.scss';
import {Product} from "../../../shared/model/Product";
import {ProductList} from "./ProductList";

interface ProductSearchPageProps extends RouteComponentProps {
    storeViewId?: string;
}

export const ProductSearchPage: React.FunctionComponent<ProductSearchPageProps> = props => {

    const [categories, setCategories] = React.useState<Array<Category>>([]);
    const [products, setProducts] = React.useState<Array<Product>>([]);
    const [storeViewId, setStoreViewId] = React.useState<string>('');

    React.useEffect(() => {
        const storeViewId = props.storeViewId;

        if (storeViewId) {
            setStoreViewId(storeViewId);
            getCategories(storeViewId).then((categories: Array<Category>) => {
                getProducts(storeViewId, categories[0].categoryId).then((products: Array<Product>) => {
                    setProducts(products);
                });
                setCategories(categories);
            });
        }
    }, [props.storeViewId]);

    const onSelectCategory = (subCategoryId: string) => {
        getProducts(storeViewId, subCategoryId).then((products: Array<Product>) => {
            setProducts(products);
        });
    };

    return (
        <div className="product-search-page">
            <CategoriesMenu categories={categories} onSelectCategory={onSelectCategory}/>
            <ProductList products={products}/>
        </div>
    );
};

