import React from 'react'
import { Provider } from 'react-redux'
import { AppProvider } from '@shopify/polaris'
import { Provider as ProviderAppBridge } from '@shopify/app-bridge-react';
import store from './redux/store'
import translations from "@shopify/polaris/locales/en.json"
import AppFrame from "./AppFrame"

function App () {
    const config = {
        apiKey: document.getElementById("apiKey").value,
        shopOrigin: document.getElementById("shopOrigin").value,
        forceRedirect: false
    };

    return (
        <Provider store={store}>
            <AppProvider i18n={translations}>
                <ProviderAppBridge config={config}>
                    <AppFrame />
                </ProviderAppBridge>
            </AppProvider>
        </Provider>
    );
}

export default App
