import React, {useCallback, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Modal} from '@shopify/polaris';
import {createStructuredSelector} from 'reselect';
import SegmentForm from '../SegmentForm/SegmentForm';
import {segmentSelector, isLoading, createSegment, fetchSegment} from '../../../store';

const SegmentCreateModal = ({isOpenForm = false, closeForm, createNewSegment, fetchSegmentData}) => {
    const [segmentData, setSegmentData] = useState({});
    const [conditions, setConditions] = useState([]);
    const [segmentName, setSegmentName] = useState('');

    const addCondition = useCallback((newConditions) => {
        setConditions((prevState) => [...prevState, {...newConditions}]);
    }, [setConditions]);

    const removeCondition = useCallback((index) => {
        setConditions((prevState) => prevState.filter((item, i) => index !== i));
    }, [setConditions]);

    const [isOpen, setIsOpen] = useState(false);

    const handleOnClose = useCallback(() => {
        setConditions([]);
        closeForm(false);
    }, [closeForm, setConditions]);

    const handleOnSave = useCallback(() => {
        // setConditions((prevState) => prevState.filter((item) => item.hasOwnProperty('conditionType')));
        const newData = {name: segmentName, conditions};
        createNewSegment(newData)
        closeForm(false);
    }, [closeForm, segmentName, conditions]);

    useEffect(() => {
        if (typeof isOpenForm !== 'undefined') {
            setIsOpen(isOpenForm);
        }
    }, [isOpenForm]);

    return (
        <>
            <Modal
                title='Create a new segment'
                open={isOpen}
                onClose={handleOnClose}
                primaryAction={{
                    content: 'Save',
                    onAction: () => handleOnSave(),
                }}
                noScroll
            >
                <Modal.Section>
                    <SegmentForm
                        conditions={conditions}
                        addCondition={addCondition}
                        removeCondition={removeCondition}
                        setConditions={setConditions}
                        segmentName={segmentName}
                        setSegmentName={setSegmentName}
                    />
                </Modal.Section>
            </Modal>
        </>
    );
};

const mapState = createStructuredSelector({
    segmentData: segmentSelector,
    isLoading: isLoading,
});

const mapDispatch = {
    fetchSegmentData: fetchSegment,
    createNewSegment: createSegment,
};

export default connect(mapState, mapDispatch)(SegmentCreateModal);