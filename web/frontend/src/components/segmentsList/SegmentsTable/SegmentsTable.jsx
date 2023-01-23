import React, {useState, useCallback, useMemo} from 'react';
import {
    IndexTable,
    Card,
    Filters,
    Select,
    useIndexResourceState,
    TextStyle,
    Stack,
    Button,
    Popover,
    ActionList,
    Icon,
    Tag,
} from '@shopify/polaris';
import { MobileVerticalDotsMajor } from '@shopify/polaris-icons';
import styles from './SegmentsTable.module.scss';

/** -----Temporarily----- */
const segmentsList = [
    {
        id: '3417',
        "shopName": "uxondev.myshopify.com",
        "name": "Segment 1",
        "conditions": [{
            "conditionType": "userLocation",
            "user": "is",
            "country": "canada",
            "orList": []
        }, {
            "conditionType": "websiteActivity",
            "userHas": "visitedPage",
            "ratio": "equals",
            "period": "overAllTime",
            "duration": 30,
            "unitOfTime": "days",
            "orList": []
        }],
        "status": "ready",
        "size": 1000,
        "createdAt": {
            "$date": "2023-01-22T22:00:42.203Z"
        }
    },
    {
        id: '2567',
        "shopName": "uxondev.myshopify.com",
        "name": "Segment 2",
        "conditions": [{
            "conditionType": "websiteActivity",
            "userHas": "visitedPage",
            "ratio": "equals",
            "period": "overAllTime",
            "duration": 30,
            "unitOfTime": "days",
            "orList": []
        }, {
            "conditionType": "userLocation",
            "user": "is",
            "country": "canada",
            "orList": []
        }],
        "status": "ready",
        "size": 2000,
        "createdAt": {
            "$date": "2023-01-22T22:01:03.208Z"
        }
    },
    {
        id: '4564',
        "shopName": "uxondev.myshopify.com",
        "name": "Segment 3",
        "conditions": [{
            "conditionType": "websiteActivity",
            "userHas": "visitedPage",
            "ratio": "equals",
            "period": "overAllTime",
            "duration": 30,
            "unitOfTime": "days",
            "orList": [{
                "conditionType": "userLocation",
                "user": "is",
                "country": "canada",
                "orList": []
            }]
        }],
        "status": "ready",
        "size": 3000,
        "createdAt": {
            "$date": "2023-01-22T22:01:17.673Z"
        }
    },
];

const SegmentsTable = () => {
    const [segments, setSegments] = useState(segmentsList);
    const [queryValue, setQueryValue] = useState('');
    const [sortValue, setSortValue] = useState('name');

    const {selectedResources, allResourcesSelected, handleSelectionChange} =
        useIndexResourceState(segmentsList);

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


    const [isActionsActive, setIsActionsActive] = useState(false);
    const toggleActionsList = () => {
        setIsActionsActive((status) => !status);
    };
    const activator = (
        <div onClick={(event) => event.stopPropagation()}>
            <Button
                plain
                icon={<Icon source={MobileVerticalDotsMajor} color="critical" />}
                onClick={toggleActionsList}
                ariaHaspopup
                disabled={false}
            />
        </div>
    );

    const renderTableRows = useMemo(() => {
        return (
            segments.map(
                ({id, name, status, size}, index) => (
                    <IndexTable.Row
                        id={id}
                        key={id}
                        selected={selectedResources.includes(id)}
                        position={index}
                    >
                        <IndexTable.Cell>
                            <TextStyle variation="strong">
                                {name}
                            </TextStyle>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                            <Tag>
                                {status}
                            </Tag>
                        </IndexTable.Cell>
                        <IndexTable.Cell>{size}</IndexTable.Cell>
                        <div className={styles.Popover}>
                            <Popover
                                id="segment-popover"
                                active={isActionsActive}
                                activator={activator}
                                onClose={toggleActionsList}
                            >
                                <Popover.Pane>
                                    <div>
                                        <ActionList items={bulkActions} />
                                    </div>
                                </Popover.Pane>
                            </Popover>
                        </div>
                    </IndexTable.Row>
                ),
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
                bulkActions={bulkActions}
                lastColumnSticky
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