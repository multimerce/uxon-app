import React, {Suspense} from 'react';
import {useLocation} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import NestedRoutes from "./NestedRoutes";

const AppRoute = () => {
    const location = useLocation();

    return (
        <Suspense fallback={<Loader/>}>
            <NestedRoutes/>
        </Suspense>
    );
};

export default AppRoute;