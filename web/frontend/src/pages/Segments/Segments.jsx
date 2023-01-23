import React, {useCallback, useState} from 'react';
import { Page, Layout, Tabs } from "@shopify/polaris";
import SegmentsTable from '../../components/segmentsList/SegmentsTable/SegmentsTable';
import IntegrateApp from "../../components/IntegrateApp/IntegrateApp";

const Segments = ({title}) => {
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const tabs = [
        {
            id: 'all',
            content: 'All',
        },
        {
            id: 'inUse',
            content: 'In use',
        },
        {
            id: 'ready',
            content: 'Ready',
        },
        {
            id: 'archived',
            content: 'Archived',
        },
    ];

    return (
        <Page narrowWidth title={title}>
            <Layout>
                <Layout.Section>
                    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                        <SegmentsTable/>
                    </Tabs>
                </Layout.Section>
                <Layout.Section>
                    <IntegrateApp/>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default Segments;