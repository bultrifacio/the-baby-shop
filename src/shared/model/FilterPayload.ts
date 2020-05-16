export interface FilterPayload {
    categoryId?: string;
    withText?: string;
    order?: string;
    dir?: string;
    page?: number;
    limit?: number;
    filters?: Array<string>;
}