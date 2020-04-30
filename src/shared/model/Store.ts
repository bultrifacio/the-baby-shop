export interface Store {
    name: string;
    countryCode: string;
    storeCode: string;
    websiteCode: string;
    storeViews: Array<StoreView>
}

interface StoreView {
    storeId: string;
    name: string;
}
