import React from 'react';
import { Spinner } from '@shopify/polaris';

const Loader = () => {
    return (
        <Spinner accessibilityLabel="Loading page" size="large"/>
    );
}

export default Loader;