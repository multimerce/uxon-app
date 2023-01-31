import React from 'react';
import { Spinner, Stack } from '@shopify/polaris';

const Loader = () => {
    return (
        <Stack alignment='center' vertical>
            <Spinner accessibilityLabel="Loading page" size="large"/>
        </Stack>
    );
}

export default Loader;