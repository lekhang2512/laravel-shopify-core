import React, { useCallback, useState } from 'react';
import { Frame, Card, Tabs, Page } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import UserContainer from './features/user/UserContainer'

function TabsExample () {
    const tabs = [
        {
            id: 'all-customers-1',
            content: 'All',
            accessibilityLabel: 'All customers',
            panelID: 'all-customers-content-1',
        },
        {
            id: 'accepts-marketing-1',
            content: 'Accepts marketing',
            panelID: 'accepts-marketing-content-1',
        },
        {
            id: 'repeat-customers-1',
            content: 'Repeat customers',
            panelID: 'repeat-customers-content-1',
        },
        {
            id: 'prospects-1',
            content: 'Prospects',
            panelID: 'prospects-content-1',
        },
    ];

    const [selected, setSelected] = useState(0);
    const [titleBar, setTitleBar] = useState(tabs[0].content);

    const handleTabChange = useCallback(
        (selectedTabIndex) => {
            setSelected(selectedTabIndex)
            setTitleBar(tabs[selectedTabIndex].content)
        },
        [],
    );



    return (
        <Page fullWidth>
            <TitleBar
                title={titleBar}
            />
            <Card>
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    <Card.Section title={tabs[selected].content}>
                        <UserContainer />
                    </Card.Section>
                </Tabs>
            </Card>
        </Page>
    );
}

function AppFrame () {
    return (
        <Frame
        >
            <TabsExample />
        </Frame>
    );
}

export default AppFrame;
