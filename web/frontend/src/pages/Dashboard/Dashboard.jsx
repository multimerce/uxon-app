import React, {useCallback, useState} from 'react';
import {Page, Layout, CalloutCard, Button, Card, Stack, TextStyle} from '@shopify/polaris';
import './Dashboard.scss';
import DashboardIcon from '../../assets/images/dashboardIcon2.png';
import SegmentCreateModal from '../../components/segments/SegmentCreateModal/SegmentCreateModal';

const Dashboard = ({title}) => {
    const [isOpenForm, setIsOpenForm] = useState(false);
    const handleIsOpenForm = useCallback(
        () => setIsOpenForm(true),
        [setIsOpenForm],
    );

    return (
        <Page narrowWidth title={title}>
            <Layout>
                <Layout.Section>
                    <CalloutCard
                        title='Create your first segment'
                        illustration={DashboardIcon}
                        primaryAction={{
                            content: 'Create a segment',
                            onAction: () => handleIsOpenForm()
                        }}
                        secondaryAction={{content: 'Learn more about segments'}}
                    >
                        <p>Tollere odium autem in nostra potestate sint, ab omnibus et contra naturam transferre in
                            nobis. Sed interim toto desiderio</p>
                    </CalloutCard>
                </Layout.Section>
                <Layout.Section>
                    <Card sectioned>
                        <Stack alignment='center'>
                            <Stack.Item fill>
                                <TextStyle>
                                    Integrate you app
                                </TextStyle>
                            </Stack.Item>
                            <Stack.Item>
                                <Button>Learn how</Button>
                            </Stack.Item>
                        </Stack>
                    </Card>
                </Layout.Section>
            </Layout>

            <SegmentCreateModal isOpenForm={isOpenForm} closeForm={setIsOpenForm}/>
        </Page>
    );
};

export default Dashboard;