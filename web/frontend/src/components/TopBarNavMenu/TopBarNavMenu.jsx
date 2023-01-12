import React, {useCallback, useEffect, useState} from 'react';
import {Tabs} from '@shopify/polaris';
import {useLocation, useNavigate} from 'react-router-dom';
import styles from './TopBarNavMenu.module.scss';

const tabs = [
    {
        id: 'dashboard',
        content: 'Dashboard',
        // accessibilityLabel: 'All customers',
        // panelID: 'dashboard',
        path: '/',
    },
    {
        id: 'segments',
        content: 'Segments',
        // panelID: 'segments',
        path: '/segments',
    },
    {
        id: 'analytics',
        content: 'Analytics',
        // panelID: 'analytics',
        path: '/analytics',
    },
    {
        id: 'integration',
        content: 'Integration',
        // panelID: 'integration',
        path: '/integration',
    },
    {
        id: 'plans',
        content: 'Plans',
        // panelID: 'plans',
        path: '/plans',
    },
];

const TopBarNavMenu = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [selected, setSelected] = useState(0);

    useEffect(() => {
        const currentPath = location.pathname;
        const newTabIndex = tabs.findIndex((tab) => tab.path === currentPath);

        setSelected(newTabIndex);
    }, [location.pathname]);

    const handleTabChange = useCallback(
        (selectedTabIndex) => {
            setSelected(selectedTabIndex);

            navigate(tabs[selectedTabIndex].path);
        },
        [tabs, navigate],
    );

    return (
        <div className={styles.NavMenuWrapper}>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}/>
        </div>
    );
};

export default TopBarNavMenu;