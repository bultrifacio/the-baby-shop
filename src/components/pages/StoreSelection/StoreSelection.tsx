import React from 'react';
import { navigate, RouteComponentProps, useLocation } from '@reach/router';
import { Button, message, Select } from 'antd';
import shortid from 'shortid';
import { Store, StoreView } from '../../../shared/model/Store';
import isNil from 'lodash/isNil';
import find from 'lodash/find';
import { PathEnum } from '../../../shared/enum/PathEnum';
import { getStores } from './store.service';
import { useQuery } from 'react-query';
import { useIntl } from 'react-intl';
import './StoreSelection.less';

export const StoreSelection: React.FunctionComponent<RouteComponentProps> = () => {
    const [selectedCountry, setSelectedCountry] = React.useState<string>();
    const [selectedCountryStores, setSelectedCountryStores] = React.useState<Array<StoreView>>();
    const [selectedStore, setSelectedStore] = React.useState<number>();
    const location = useLocation();
    const intl = useIntl();

    const { data: stores, failureCount } = useQuery('stores', getStores);

    React.useEffect(() => {
        if (failureCount === 1) message.error(intl.formatMessage({ id: 'store.selection.request.error' }));
    }, [failureCount, intl]);

    React.useEffect(() => {
        const country = find(stores, { name: selectedCountry });
        if (country) setSelectedCountryStores(country.storeViews);
    }, [selectedCountry, stores]);

    const { Option } = Select;

    const selectStoreView = () => navigate(`${location.pathname}/${selectedStore}/${PathEnum.PRODUCTS}`);

    const Welcome: React.FunctionComponent = () => (
        <div className="welcome-heading">
            <h1>{intl.formatMessage({ id: 'store.selection.welcome.message' })}</h1>
        </div>
    );

    const SelectCountry: React.FunctionComponent = () => {
        return (
            <div className="select-store-item">
                <Select
                    placeholder={intl.formatMessage({
                        id: 'store.selection.select.country.placeholder',
                    })}
                    value={selectedCountry}
                    onChange={(option: string) => setSelectedCountry(option)}
                >
                    {stores?.map((store: Store) => (
                        <Option key={shortid.generate()} value={store.name}>
                            {store.name}
                        </Option>
                    ))}
                </Select>
            </div>
        );
    };

    const SelectStore: React.FunctionComponent = () => {
        return (
            <div className="select-store-item">
                <Select
                    placeholder={intl.formatMessage({
                        id: 'store.selection.select.store.placeholder',
                    })}
                    disabled={isNil(selectedCountry)}
                    value={selectedStore}
                    onChange={(storeViewId: number) => setSelectedStore(storeViewId)}
                >
                    {selectedCountryStores?.map((storeView: StoreView) => (
                        <Option key={shortid.generate()} value={storeView.storeId}>
                            {storeView.name}
                        </Option>
                    ))}
                </Select>
            </div>
        );
    };

    const AcceptButton: React.FunctionComponent = () => {
        return (
            <Button type="primary" disabled={isNil(selectedStore) || isNil(selectedCountry)} onClick={selectStoreView}>
                {intl.formatMessage({ id: 'store.selection.accept.button' })}
            </Button>
        );
    };

    return (
        <div className="store-selection-container">
            <div className="store-selection">
                <Welcome />
                <div className="select-store-container">
                    <SelectCountry />
                    <SelectStore />
                </div>
                <div className="accept-button-container">
                    <AcceptButton />
                </div>
            </div>
        </div>
    );
};
