import React, {useCallback, useEffect, useState} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {Tabs} from '@shopify/polaris';
import SegmentsTable from '../SegmentsTable/SegmentsTable';
import {fetchSegments, segmentsSelector} from '../../../store';
import './SegmentsList.scss';

const SegmentsList = ({segmentsList, fetchSegmentsList}) => {
    const [selected, setSelected] = useState(0);
    const [segments, setSegments] = useState({})

    useEffect(() => {
        const preparedSegments = segmentsList.data.map((item) => ({...item, id: item._id})) || [];
        setSegments({...segmentsList, data: preparedSegments})
    }, [setSegments, segmentsList]);

    useEffect(() => {
        fetchSegmentsList({
            skip: 0,
            limit: 1,
        })
    }, [fetchSegmentsList]);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [setSelected],
    );

    const tabs = [
        {
            id: 'all',
            content: 'All',
        },
        {
            id: 'inUse',
            content: 'In use',
        },
        {
            id: 'ready',
            content: 'Ready',
        },
        {
            id: 'archived',
            content: 'Archived',
        },
    ];

    const prepareSegmentsList = useCallback(() => {
        if (segments?.data && Array.isArray(segments.data)) {
            if (selected === 0) {
                return segments.data;
            } else {
                return segments.data.filter(({status}) => status === tabs[selected].id);
            }
        }
    }, [segments, selected]);

    return (
        <div className='ListMainContainer'>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                <SegmentsTable segmentsList={prepareSegmentsList()}/>
            </Tabs>
        </div>
    );
};

const mapState = createStructuredSelector({
    segmentsList: segmentsSelector,
});

const mapDispatch = {
    fetchSegmentsList: fetchSegments,
};

export default connect(mapState, mapDispatch)(SegmentsList);