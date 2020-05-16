import { Product } from './Product';
import { Filter } from './Filter';

export interface ProductSearch {
    results: Array<Product>;
    filters: Array<Filter>;
    resultsCount: number;
}
