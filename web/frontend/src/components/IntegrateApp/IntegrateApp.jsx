import React from 'react';
import {Button, Card, Stack, TextStyle} from '@shopify/polaris';

const IntegrateApp = () => {
    return (
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
    );
};

export default IntegrateApp;