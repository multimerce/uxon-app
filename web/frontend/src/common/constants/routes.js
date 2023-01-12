import {lazy} from 'react';

const Dashboard = lazy(() => import('../../pages/Dashboard/Dashboard'));
const Segments = lazy(() => import('../../pages/Segments/Segments'));
const Analytics = lazy(() => import('../../pages/Analytics/Analytics'));
const Integration = lazy(() => import('../../pages/Integration/Integration'));
const Plans = lazy(() => import('../../pages/Plans/Plans'));

export const ROUTES = [
    {
        url: '/',
        title: 'Get started',
        component: Dashboard,
    },
    {
        url: '/segments',
        title: 'Segments',
        component: Segments,
    },
    {
        url: '/analytics',
        title: 'Analytics',
        component: Analytics,
    },
    {
        url: '/integration',
        title: 'Integration',
        component: Integration,
    },
    {
        url: '/plans',
        title: 'Plans',
        component: Plans,
    },
];