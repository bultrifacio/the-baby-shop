export interface Filter {
    label: string;
    filterName: string;
    type: string;
    options?: Array<FilterOption>;
    min?: number;
    max?: number;
    currency?: string;
}

export interface FilterOption {
    id: string;
    label: string;
    imageUrl?: string;
}
