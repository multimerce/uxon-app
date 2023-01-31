import React from 'react';
import {Button, Card, Link, Stack, Text} from '@shopify/polaris';
import './HeaderInfo.scss';

const HeaderInfo = () => {
    return (
        <Card sectioned>
            <Stack alignment='center'>
                <Stack.Item>
                    <div className='Analytics__header'>
                        <Text variant="heading3xl" as="h2">
                            300x
                        </Text>
                    </div>
                </Stack.Item>
                <Stack.Item fill>
                    <Stack vertical spacing='tight'>
                        <Stack.Item>
                            <Text variant="headingMd" as="h6">
                                Return on investment
                            </Text>
                            <Text variant='bodyMd' as="p">
                                Your ROI is similar Shopify stores
                            </Text>
                        </Stack.Item>
                        <Stack.Item>
                            <Link>
                                Learn more about analytics
                            </Link>
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
                <Stack.Item>
                    <Button>
                        Review us
                    </Button>
                </Stack.Item>
            </Stack>
        </Card>
    );
};

export default HeaderInfo;