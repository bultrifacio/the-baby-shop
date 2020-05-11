import React from "react";
import {RouteComponentProps} from "@reach/router";
import {getCategories, getProducts} from "./products.service";
import {Category} from "../../../shared/model/Category";
import {CategoriesMenu} from "./CategoriesMenu";
import {Product, ProductVariant} from "../../../shared/model/Product";
import {ProductList} from "./ProductList";
import './ProductSearchPage.less';
import {BreadcrumbBar} from "../../BreadcrumbBar/BreadcrumbBar";
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import flatten from 'lodash/flatten';
import {CascaderOptionType} from "antd/es/cascader";
import isNil from 'lodash/isNil';
import {FilterPayload} from "../../../shared/model/FilterPayload";
import {SearchFilter} from "./SearchFilter";
import {SliderValue} from "antd/es/slider";
import {DirectionEnum} from "../../../shared/enum/DirectionEnum";
import {ProductSearch} from "../../../shared/model/ProductSearch";
import {OrderEnum} from "../../../shared/enum/OrderEnum";
import {SortSearchBar} from "./SortSearchBar";

interface ProductSearchPageProps extends RouteComponentProps {
    storeViewId?: string;
}

export const ProductSearchPage: React.FunctionComponent<ProductSearchPageProps> = props => {

    const [categories, setCategories] = React.useState<Array<Category>>([]);
    const [products, setProducts] = React.useState<Array<Product>>([]);
    const [storeViewId, setStoreViewId] = React.useState<string>('');
    const [sizesList, setSizesList] = React.useState<Array<ProductVariant>>([]);
    const [compositionList, setCompositionList] = React.useState<Array<string>>([]);
    const [colorList, setColorList] = React.useState<Array<string>>([]);

    const [currentProductPage, setCurrentProductPage] = React.useState<number>(1);
    const [productsPerPage, setProductsPerPage] = React.useState<number>(10);
    const [withText, setWithText] = React.useState<string>('');
    const [selectedSize, setSelectedSize] = React.useState<Array<string>>([]);
    const [selectedColor, setSelectedColor] = React.useState<Array<string>>([]);
    const [selectedComposition, setSelectedComposition] = React.useState<Array<string>>([]);
    const [selectedPrice, setSelectedPrice] = React.useState<SliderValue>([0, 150]);
    const [selectedCategory, setSelectedCategory] = React.useState<Array<string>>([]);
    const [selectedDirection, setSelectedDirection] = React.useState<DirectionEnum>(DirectionEnum.ASC);
    const [selectedOrder, setSelectedOrder] = React.useState<OrderEnum>(OrderEnum.NAME);

    const [filterPayload, setFilterPayload] = React.useState<FilterPayload>({});

    React.useEffect(() => {
        const storeViewId = props.storeViewId;

        if (storeViewId) {
            setStoreViewId(storeViewId);
            getCategories(storeViewId).then((categories: Array<Category>) => {
                getProducts(storeViewId, {
                    page: 1,
                    limit: 10,
                    order: OrderEnum.NAME,
                    dir: DirectionEnum.ASC
                }).then((productSearch: ProductSearch) => {
                    const {results} = productSearch;
                    setProducts(results);
                    setSizesList(obtainSizes(results));
                    setColorList(obtainColors(results));
                    setCompositionList(obtainComposition(results));
                });
                setCategories(categories);
            });
        }
    }, [props.storeViewId]);

    React.useEffect(() => {
        if (storeViewId) {
            getProducts(storeViewId, filterPayload).then((productSearch: ProductSearch) => {
                const {results} = productSearch;
                setProducts(results);
            });
        }
    }, [storeViewId, filterPayload]);

    React.useEffect(() => {

        let filtersList = [];
        const minPrice = `[price][min]=${String(selectedPrice).split(',')[0]}`;
        const maxPrice = `[price][max]=${String(selectedPrice).split(',')[1]}`;
        filtersList.push(minPrice);
        filtersList.push(maxPrice);

        selectedColor.map((color: string) => filtersList.push(`[gocco_color_basico][]=${color}`));
        selectedComposition.map((composition: string) => filtersList.push(`[composition][]=${composition}`));
        selectedSize.map((size: string) => filtersList.push(`[gocco_talla][]=${size}`));

        setFilterPayload({
            page: currentProductPage,
            limit: productsPerPage,
            withText: withText,
            categoryId: selectedCategory[selectedCategory.length - 1],
            filters: filtersList,
            order: selectedOrder,
            dir: selectedDirection
        });

    }, [currentProductPage,
        productsPerPage,
        withText,
        selectedSize,
        selectedColor,
        selectedComposition,
        selectedPrice,
        selectedCategory,
        selectedOrder,
        selectedDirection]);

    const onChangePagination = (page: number, pageSize?: number): void => {
        setCurrentProductPage(page);
        if (pageSize) setProductsPerPage(pageSize);
    };

    const obtainSizes = (products: Array<Product>): Array<ProductVariant> =>
        uniqBy(flatten(products.map((product: Product) => product.sizes.map((size: ProductVariant) => size))), 'variantId');

    const obtainColors = (products: Array<Product>): Array<string> =>
        uniq(products.map((product: Product) => product.color));

    const obtainComposition = (products: Array<Product>): Array<string> =>
        uniq(products.map((product: Product) => product.composition));

    const formatCategories = (categories: Array<Category>): Array<CascaderOptionType> =>
        categories.map((category: Category) => {
            const value = category.categoryId;
            const label = category.name;
            if (isNil(category.children)) {
                return {value: value, label: label};
            } else {
                return {value: value, label: label, children: formatCategories(category.children)}
            }
        });

    const onChangeComposition = (values: Array<string>): void => setSelectedComposition(values);
    const onChangeColor = (values: Array<string>): void => setSelectedColor(values);
    const onChangeSize = (values: Array<string>): void => setSelectedSize(values);
    const onChangeCategory = (values: Array<string>): void => setSelectedCategory(values);
    const onChangePrice = (values: SliderValue): void => setSelectedPrice(values);
    const onChangeDirection = (value: DirectionEnum): void => setSelectedDirection(value);
    const onChangeOrder = (value: OrderEnum): void => setSelectedOrder(value);
    const onChangeWithText = (value: string): void => setWithText(value);

    const onClickClearFilters = (): void => {
        setSelectedSize([]);
        setSelectedColor([]);
        setSelectedComposition([]);
        setSelectedCategory([]);
        setSelectedPrice([0, 150]);
    };

    return (
        <div className="product-search-page">
            <BreadcrumbBar/>
            <SortSearchBar selectedDirection={selectedDirection}
                           onChangeDirection={onChangeDirection}
                           selectedOrder={selectedOrder}
                           onChangeOrder={onChangeOrder}
                           withText={withText}
                           onChangeWithText={onChangeWithText}/>

            <CategoriesMenu categories={categories}
                            onSelectCategory={(subCategoryId: string) => setSelectedCategory([subCategoryId])}>
                <SearchFilter sizes={sizesList}
                              colors={colorList}
                              composition={compositionList}
                              categories={formatCategories(categories)}
                              onClickClearFilters={onClickClearFilters}
                              selectedSize={selectedSize}
                              selectedColor={selectedColor}
                              selectedComposition={selectedComposition}
                              selectedPrice={selectedPrice}
                              selectedCategory={selectedCategory}
                              onChangeComposition={onChangeComposition}
                              onChangeColor={onChangeColor}
                              onChangeSize={onChangeSize}
                              onChangeCategory={onChangeCategory}
                              onChangePrice={onChangePrice}
                />
            </CategoriesMenu>
            <ProductList products={products}
                         currentProductPage={currentProductPage}
                         productsPerPage={productsPerPage}
                         onChangePagination={onChangePagination}
            />
        </div>
    );
};

