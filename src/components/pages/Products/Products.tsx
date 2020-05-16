import React from "react";
import {RouteComponentProps} from "@reach/router";
import {getCategories, getProducts} from "./products.service";
import {Category} from "../../../shared/model/Category";
import {FilterMenu} from "./FilterMenu";
import {Product, ProductVariant} from "../../../shared/model/Product";
import {ProductList} from "./ProductList";
import './Products.less';
import {BreadcrumbBar} from "../../BreadcrumbBar/BreadcrumbBar";
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import flatten from 'lodash/flatten';
import isNil from 'lodash/isNil';
import {CascaderOptionType} from "antd/es/cascader";
import {FilterPayload} from "../../../shared/model/FilterPayload";
import {Filter} from "./Filter";
import {SliderValue} from "antd/es/slider";
import {DirectionEnum} from "../../../shared/enum/DirectionEnum";
import {OrderEnum} from "../../../shared/enum/OrderEnum";
import {FilterBar} from "./FilterBar";
import {usePaginatedQuery, useQuery} from "react-query";
import {message} from "antd";
import {PageEnum} from "../../../shared/enum/PageEnum";
import {FilterEnum} from "../../../shared/enum/FilterEnum";

interface ProductSearchPageProps extends RouteComponentProps {
    storeViewId?: string;
}

export const Products: React.FunctionComponent<ProductSearchPageProps> = props => {

        const [storeViewId, setStoreViewId] = React.useState<string>('');

        const [sizesList, setSizesList] = React.useState<Array<ProductVariant>>([]);
        const [compositionList, setCompositionList] = React.useState<Array<string>>([]);
        const [colorList, setColorList] = React.useState<Array<string>>([]);
        const [formattedCategories, setFormattedCategories] = React.useState<Array<CascaderOptionType>>([]);

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

        const [visibleMenu, setVisibleMenu] = React.useState<boolean>(false);

        React.useEffect(() => {
            if (props.storeViewId) setStoreViewId(props.storeViewId);
        }, [props.storeViewId]);

        const {data: categories, failureCount: failureCountCategories} = useQuery({
            queryKey: ['categories', storeViewId],
            queryFn: () => getCategories(storeViewId)
        });

        React.useEffect(() => {
            if (failureCountCategories === 1) message.error("Can't get categories. Please, try it again in a few minutes.");
        }, [failureCountCategories]);

        const {resolvedData: products, failureCount: failureCountProducts} = usePaginatedQuery({
            queryKey: ['products', storeViewId, filterPayload],
            queryFn: () => getProducts(storeViewId, filterPayload)
        });

        React.useEffect(() => {
            if (failureCountProducts === 1) message.error("Can't get products. Please, try it again in a few minutes.");
        }, [failureCountProducts]);

        React.useEffect(() => {
            if (sizesList.length === 0 && products) setSizesList(obtainSizes(products.results));
        }, [sizesList, products]);

        React.useEffect(() => {
            if (colorList.length === 0 && products) setColorList(obtainColors(products.results));
        }, [colorList, products]);

        React.useEffect(() => {
            if (compositionList.length === 0 && products) setCompositionList(obtainComposition(products.results));
        }, [compositionList, products]);

        React.useEffect(() => {
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

            if (!isNil(categories)) {
                setFormattedCategories(formatCategories(categories));
            }
        }, [categories]);

        React.useEffect(() => {

            let filtersList = [];
            const minPrice = `${FilterEnum.MIN_PRICE}=${String(selectedPrice).split(',')[0]}`;
            const maxPrice = `${FilterEnum.MAX_PRICE}=${String(selectedPrice).split(',')[1]}`;
            filtersList.push(minPrice);
            filtersList.push(maxPrice);

            selectedColor.map((color: string) => filtersList.push(`${FilterEnum.COLOR}=${color}`));
            selectedComposition.map((composition: string) => filtersList.push(`${FilterEnum.COMPOSITION}=${composition}`));
            selectedSize.map((size: string) => filtersList.push(`${FilterEnum.SIZE}=${size}`));

            setFilterPayload({
                page: currentProductPage,
                limit: productsPerPage,
                withText: withText,
                categoryId: selectedCategory[selectedCategory.length - 1],
                filters: filtersList,
                order: selectedOrder,
                dir: selectedDirection,
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

        const onChangeComposition = (values: Array<string>): void => setSelectedComposition(values);
        const onChangeColor = (values: Array<string>): void => setSelectedColor(values);
        const onChangeSize = (values: Array<string>): void => setSelectedSize(values);
        const onChangeCategory = (values: Array<string>): void => setSelectedCategory(values);
        const onChangePrice = (values: SliderValue): void => setSelectedPrice(values);
        const onChangeDirection = (value: DirectionEnum): void => setSelectedDirection(value);
        const onChangeOrder = (value: OrderEnum): void => setSelectedOrder(value);
        const onChangeWithText = (value: string): void => setWithText(value);
        const onClickDrawerMenu = (value: boolean): void => setVisibleMenu(value);

        const onClickClearFilters = (): void => {
            setSelectedSize([]);
            setSelectedColor([]);
            setSelectedComposition([]);
            setSelectedCategory([]);
            setSelectedPrice([0, 150]);
        };

        return (
            <div className="product-search-page">
                <BreadcrumbBar page={PageEnum.PRODUCTS}/>
                <FilterBar selectedDirection={selectedDirection}
                           onChangeDirection={onChangeDirection}
                           selectedOrder={selectedOrder}
                           onChangeOrder={onChangeOrder}
                           withText={withText}
                           onChangeWithText={onChangeWithText}
                           onClickDrawerMenu={onClickDrawerMenu}/>

                <FilterMenu categories={categories}
                            onSelectCategory={(subCategoryId: string) => setSelectedCategory([subCategoryId])}
                            visibleMenu={visibleMenu}
                            onClickDrawerMenu={onClickDrawerMenu}>
                    <Filter sizes={sizesList}
                            colors={colorList}
                            composition={compositionList}
                            categories={formattedCategories}
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
                </FilterMenu>
                <ProductList products={products?.results}
                             currentProductPage={currentProductPage}
                             productsPerPage={productsPerPage}
                             onChangePagination={onChangePagination}
                />
            </div>
        );
    }
;

