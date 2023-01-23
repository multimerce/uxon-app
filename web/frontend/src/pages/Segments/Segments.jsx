import React from 'react';
import {Page, Layout} from '@shopify/polaris';
import IntegrateApp from '../../components/IntegrateApp/IntegrateApp';
import SegmentsList from '../../components/segmentsList/SegmentsList/SegmentsList';

const Segments = ({title}) => {
    return (
        <Page narrowWidth title={title}>
            <Layout>
                <Layout.Section>
                    <SegmentsList/>
                </Layout.Section>
                <Layout.Section>
                    <IntegrateApp/>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default Segments;