import React from "react";
import {IntlProvider} from 'react-intl';
import esTranslations from "../../assets/translations/es";
import enTranslations from "../../assets/translations/en";
import * as locale2 from 'locale2';
import get from 'lodash/get';
import has from 'lodash/has';

interface ContextState {
    locale: string;
    messages: Record<string, string>;
    switchLanguage(languageKey: string): void;
}

const translations: { en: Record<string, string>; es: Record<string, string>; } = {
    en: enTranslations,
    es: esTranslations,
};

const getDefaultLocale = (): string => {
    const browserLocale = locale2.split('-')[0];
    if (has(translations, browserLocale)) {
        return browserLocale;
    }
    return 'en';
};

const defaultLocale = getDefaultLocale();

const Context = React.createContext<ContextState>({
    locale: defaultLocale,
    messages: get(translations, defaultLocale),
    switchLanguage: () => {},
});

const IntlProviderWrapper: React.FunctionComponent = props => {

    const [locale, setLocale] = React.useState<string>(defaultLocale);
    const [messages, setMessages] = React.useState<Record<string, string>>(get(translations, defaultLocale));

    const switchLanguage = (languageKey: string): void => {
        setLocale(languageKey);
        setMessages(get(translations, languageKey));
    };

    const currentState = {
        locale: locale,
        messages: get(translations, locale),
        switchLanguage,
    };

    return (
        <Context.Provider value={currentState}>
            <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale={defaultLocale}>
                {props.children}
            </IntlProvider>
        </Context.Provider>
    );
};

export {IntlProviderWrapper, Context as IntlContext};