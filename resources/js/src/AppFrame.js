import React, { useCallback, useState } from 'react';
import { Frame, Card, Tabs, Page } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import ProductContainer from './features/product/ProductContainer'
import SettingContainer from './features/setting/SettingContainer'

function TabsContainer () {
    const [selected, setSelected] = useState(0);

    const tabs = [
        {
            id: 'product-list-1',
            content: 'Product List',
            accessibilityLabel: 'Product List',
            panelID: 'product-list-content-1',
        },
        {
            id: 'settings-general-1',
            content: 'Settings General',
            accessibilityLabel: 'Settings General',
            panelID: 'settings-general-content-1',
        },
        // {
        //     id: 'email-settings-1',
        //     content: 'Email Settings',
        //     panelID: 'email-settings-content-1',
        // },
        // {
        //     id: 'instructions-1',
        //     content: 'Instructions',
        //     panelID: 'instructions-content-1',
        // },
    ];

    const [titleBar, setTitleBar] = useState(tabs[0].content);

    const handleTabChange = useCallback(
        (selectedTabIndex) => {
            setSelected(selectedTabIndex)
            setTitleBar(tabs[selectedTabIndex].content)
        },
        [],
    );

    const tabPanels = [
        (
            <ProductContainer />
        ),
        (
            <SettingContainer />
        ),
    ];

    return (
        <Page fullWidth>
            <TitleBar
                title={titleBar}
            />
            <Card>
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    {tabPanels[selected]}
                </Tabs>
            </Card>
        </Page>
    );
}

function AppFrame () {
    return (
        <Frame
        >
            <TabsContainer />
        </Frame>
    );
}

export default AppFrame;
