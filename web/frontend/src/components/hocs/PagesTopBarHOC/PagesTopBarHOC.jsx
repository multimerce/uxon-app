import React from 'react';
import { Page } from '@shopify/polaris';
import TopBarNavMenu from '../../TopBarNavMenu/TopBarNavMenu';
import './PagesTopBarHOC.scss';

const PagesTopBarHOC = (Component, title) => {

    return (
        <div className='TopBarWrapper'>
            <Page fullWidth title={ <TopBarNavMenu/> } >
                <div>
                    <Component title={title}/>
                </div>
            </Page>
        </div>
    )
};

export default PagesTopBarHOC;