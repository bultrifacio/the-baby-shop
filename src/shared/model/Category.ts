export interface Category {
    categoryId: string;
    name: string;
    children: Array<Category>;
}
