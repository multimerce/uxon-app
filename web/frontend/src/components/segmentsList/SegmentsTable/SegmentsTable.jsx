import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
    IndexTable,
    Card,
    Filters,
    Select,
    useIndexResourceState,
    Button,
} from '@shopify/polaris';
import styles from './SegmentsTable.module.scss';
import SegmentsTableRow from "../SegmentsTableRow/SegmentsTableRow";

const SegmentsTable = ({segmentsList = []}) => {
    const [segments, setSegments] = useState([]);
    const [queryValue, setQueryValue] = useState('');
    const [sortValue, setSortValue] = useState('name');

    useEffect(() => {
        setSegments(segmentsList);
    }, [segmentsList]);

    const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(segments);

    const resourceName = {
        singular: 'segment',
        plural: 'segments',
    };

    const bulkActions = [
        {
            content: 'Edit',
            onAction: () => console.log('Edit segment'),
        },
        {
            content: 'Delete',
            onAction: () => console.log('Delete segment'),
        },
        {
            content: 'Duplicate',
            onAction: () => console.log('Duplicate segment'),
        },
        {
            content: 'Archive',
            onAction: () => console.log('Archive segment'),
        },
    ];

    const filters = [];
    const appliedFilters = [];

    const sortOptions = [
        {label: 'Name', value: 'name'},
        {label: 'Status', value: 'status'},
        {label: 'Size', value: 'size'},
    ];

    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
    const handleClearAll = useCallback(() => {
        handleQueryValueRemove();
    }, [handleQueryValueRemove]);
    const handleSortChange = useCallback((value) => setSortValue(value), []);

    const renderTableRows = useMemo(() => {
        return (
            segments.map(
                ({id, name, status, size}, index) =>
                    <SegmentsTableRow
                        id={id}
                        key={id}
                        index={index}
                        selectedResources={selectedResources}
                        name={name}
                        status={status}
                        size={size}
                        bulkActions={bulkActions}
                    />
            )
        )
    }, [segments, selectedResources]);

    return (
        <Card>
            <div className={styles.FiltersContainer}>
                <div style={{flex: 1}}>
                    <Filters
                        queryValue={queryValue}
                        filters={filters}
                        appliedFilters={appliedFilters}
                        onQueryChange={setQueryValue}
                        onQueryClear={handleQueryValueRemove}
                        onClearAll={handleClearAll}
                    />
                </div>
                <div className={styles.FiltersContainer__select}>
                    <Select
                        labelInline
                        label="Sort"
                        options={sortOptions}
                        value={sortValue}
                        onChange={handleSortChange}
                    />
                </div>
                <Button primary>Create</Button>
            </div>

            <IndexTable
                resourceName={resourceName}
                itemCount={segments.length}
                selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                hasMoreItems
                // bulkActions={bulkActions}
                // lastColumnSticky
                headings={[
                    {title: 'Name'},
                    {title: 'Status'},
                    {title: 'Size'},
                ]}
            >
                {renderTableRows}
            </IndexTable>
        </Card>
    );
};

export default SegmentsTable;