export interface Store {
    name: string;
    countryCode: string;
    storeCode: string;
    websiteCode: string;
    storeViews: Array<StoreView>
}

export interface StoreView {
    storeId: string;
    name: string;
}
