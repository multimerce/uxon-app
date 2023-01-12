import React, {useMemo} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ROUTES} from '../constants/routes';
import PagesTopBarHOC from '../../components/hocs/PagesTopBarHOC/PagesTopBarHOC';

const NestedRoutes = () => {

    const routes = useMemo(() => ROUTES.map(({url, title, component}) => {
        return <Route key={title} path={url} element={PagesTopBarHOC(component, title)} />
    }), [ROUTES]);

    return (
        <Routes>
            {routes}
        </Routes>
    );
};

export default NestedRoutes;