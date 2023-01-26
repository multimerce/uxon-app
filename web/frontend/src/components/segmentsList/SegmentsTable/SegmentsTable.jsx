import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
    IndexTable,
    Card,
    Filters,
    Select,
    useIndexResourceState,
    Button,
} from '@shopify/polaris';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {changeSegmentStatus, deleteSegment, duplicateSegment} from '../../../store';
import SegmentsTableRow from '../SegmentsTableRow/SegmentsTableRow';
import {SEGMENTS_STATUSES} from '../../../common/constants/constants';
import SegmentCreateModal from '../../segments/SegmentCreateModal/SegmentCreateModal';
import styles from './SegmentsTable.module.scss';

const SegmentsTable = ({segmentsList = [], onDelete, onChangeStatus, onDuplicate}) => {
    const [segments, setSegments] = useState([]);
    const [queryValue, setQueryValue] = useState('');
    const [sortValue, setSortValue] = useState('name');
    const [selectedSegment, setSelectedSegment] = useState(null);
    // const [isActionsDisable, setIsActionsDisable] = useState(false);
    const [isOpenForm, setIsOpenForm] = useState(false);

    useEffect(() => {
        setSegments((prevState) => prevState.sort((segA, segB) => segB[sortValue] - segA[sortValue]));
    }, [sortValue, queryValue, segments])

    useEffect(() => {
        setSegments(segmentsList);
    }, [setSegments, segmentsList]);


    useEffect(() => {
        if (!isOpenForm) {
            setSelectedSegment(null);
        }
    }, [isOpenForm, segmentsList, setSelectedSegment]);

    // useEffect(() => {
    //     setIsActionsDisable(false);
    // }, [setIsActionsDisable]);

    const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(segments);

    const resourceName = {
        singular: 'segment',
        plural: 'segments',
    };

    const editStatus = useCallback((id) => {
        const prevStatus = segments.find((segment) => segment.id === id).status;
        const newStatus = prevStatus === SEGMENTS_STATUSES[0] ? SEGMENTS_STATUSES[1] : SEGMENTS_STATUSES[0];

        onChangeStatus(id, newStatus)
    }, [segments, onChangeStatus]);

    const handleCreate = useCallback(() => {
        setIsOpenForm(true);
    }, [setIsOpenForm]);

    const bulkActions = [
        {
            id: 'edit',
            content: 'Edit',
            onAction: (id) => {
                setSelectedSegment(id);
                setIsOpenForm(true);
            },
        },
        {
            id: 'delete',
            content: 'Delete',
            onAction: (id) => onDelete(id),
        },
        {
            id: 'duplicate',
            content: 'Duplicate',
            onAction: (id) => onDuplicate(id),
        },
        {
            id: 'status',
            content: 'Archive',
            onAction: (id) => editStatus(id),
        },
    ];

    const filters = [];
    const appliedFilters = [];

    const sortOptions = [
        {label: 'Name', value: 'name'},
        {label: 'Status', value: 'status'},
        {label: 'Size', value: 'size'},
    ];

    const handleQueryValueRemove = useCallback(() => setQueryValue(''), [setQueryValue]);
    const handleClearAll = useCallback(() => {
        handleQueryValueRemove();
    }, [handleQueryValueRemove]);
    const handleSortChange = useCallback((value) => setSortValue(value), [setSortValue]);

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
                        // isActionsDisable={isActionsDisable}
                        // setIsActionsDisable={setIsActionsDisable}
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
                <Button primary onClick={handleCreate}>Create</Button>
            </div>

            <IndexTable
                resourceName={resourceName}
                itemCount={segments.length}
                selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                hasMoreItems
                headings={[
                    {title: 'Name'},
                    {title: 'Status'},
                    {title: 'Size'},
                ]}
                selectable={false}
            >
                {renderTableRows}
            </IndexTable>

            <SegmentCreateModal
                isOpenForm={isOpenForm}
                closeForm={setIsOpenForm}
                segment={segments.find(({id}) => id === selectedSegment)}
            />
        </Card>
    );
};

const mapState = createStructuredSelector({});

const mapDispatch = {
    onDelete: deleteSegment,
    onChangeStatus: changeSegmentStatus,
    onDuplicate: duplicateSegment,
};

export default connect(mapState, mapDispatch)(SegmentsTable);