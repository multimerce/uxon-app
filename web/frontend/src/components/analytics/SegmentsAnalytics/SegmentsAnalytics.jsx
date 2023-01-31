import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Card, DataTable, Stack, Tabs, Text} from '@shopify/polaris';
import {ANALYTICS_TABS, TABLES} from '../../../common/constants/constants';
import AnalyticsTableRow from '../AnalyticsTableRow/AnalyticsTableRow';

const SegmentsAnalytics = ({fetchedAnalytics}) => {
    const [selected, setSelected] = useState(0);
    const [sortedAnalytics, setSortedAnalytics] = useState(null);

    const rows = useMemo(() =>
        AnalyticsTableRow(sortedAnalytics, TABLES.analytics), [sortedAnalytics, TABLES]
    );

    useEffect(() => {
        setSortedAnalytics(fetchedAnalytics);
    }, [setSortedAnalytics, fetchedAnalytics]);

    const columnTypes = useMemo(() => TABLES.analytics.map((item) => item.type), [TABLES]);
    const sortableColumns= useMemo(() => TABLES.analytics.map((item) => item.sortable), [TABLES]);
    const headings = useMemo(() => TABLES.analytics.map((item) =>
        <Text as='span' variant='bodyMd' fontWeight='bold'>{item.heading}</Text>), [TABLES]
    );

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [setSelected],
    );

    const sortRow = useCallback((sortedAnalytics, index, direction, columns) => {
        return sortedAnalytics.sort((rowA, rowB) => {
            const a = rowA[columns[index].id];
            const b = rowB[columns[index].id];

            if (typeof rowA[index] === 'string') {
                return direction === 'descending' ? a.localeCompare(b) : b.localeCompare(a)
            }
            return direction === 'descending' ? b - a : a - b;
        });
    }, [sortedAnalytics]);

    const handleSort = useCallback(
        (index, direction) => setSortedAnalytics(sortRow(sortedAnalytics, index, direction, TABLES.analytics)),
        [sortedAnalytics, setSortedAnalytics, sortRow],
    );

    return (
        <Stack vertical>
            <Text as='h2' variant='headingLg'>
                Segments analytics
            </Text>
            <Card>
                <Tabs tabs={ANALYTICS_TABS} selected={selected} onSelect={handleTabChange}>
                    <DataTable
                        columnContentTypes={columnTypes}
                        headings={headings}
                        rows={rows}
                        sortable={sortableColumns}
                        defaultSortDirection='descending'
                        initialSortColumnIndex={1}
                        onSort={handleSort}
                    />
                </Tabs>
            </Card>
        </Stack>
    );
};

export default SegmentsAnalytics;