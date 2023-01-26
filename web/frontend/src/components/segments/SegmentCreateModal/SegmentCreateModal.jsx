import React, {useCallback, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Modal} from '@shopify/polaris';
import {createStructuredSelector} from 'reselect';
import SegmentForm from '../SegmentForm/SegmentForm';
import {segmentValidationsSchema} from '../../../utils/validators';
import {segmentSelector, isLoading, createSegment, fetchSegment, updateSegment} from '../../../store';

const SegmentCreateModal = ({isOpenForm = false, closeForm, segment, createNewSegment, editSegment}) => {
    const [conditions, setConditions] = useState([{}]);
    const [segmentName, setSegmentName] = useState('');
    const [segmentErrors, setSegmentsErrors] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isNew, setIsNew] = useState(true);

    useEffect(() => {
        if (segment) {
            setConditions(segment.conditions);
            setSegmentName(segment.name);
            setIsNew(false);
        } else {
            setConditions([{}]);
            setSegmentName('');
            setIsNew(false);
        }
    }, [segment, setConditions, setSegmentName, setIsNew, isOpen]);

    useEffect(() => {
        setSegmentsErrors(null);
    }, [conditions, segmentName, setSegmentsErrors]);

    const addCondition = useCallback((newConditions) => {
        setConditions((prevState) => [...prevState, {...newConditions}]);
    }, [setConditions, setSegmentsErrors]);

    const removeCondition = useCallback((index) => {
        if (index === 0) {
            setConditions([{}]);
        } else {
            setConditions((prevState) => prevState.filter((item, i) => index !== i));
        }
    }, [setConditions]);

    const onCloseActions = useCallback(() => {
        setSegmentsErrors(null);
        setConditions([{}]);
        setSegmentName('');
        closeForm(false);
        setIsNew(true);
    }, [closeForm, setSegmentName, setConditions, setSegmentsErrors, setIsNew]);

    const handleOnClose = () => onCloseActions();

    const handleOnSave = useCallback(async () => {
        const newData = {name: segmentName, conditions};

        await segmentValidationsSchema
            .validate(newData, { abortEarly: false })
            .then((res) => {
                setSegmentsErrors(null);
                !isNew && segment ? editSegment(segment._id, newData) : createNewSegment(newData);
                onCloseActions();
            })
            .catch((err) => {
                const errors = err?.inner?.reduce((acc, item) => {
                    let path;
                    if (item?.path && item.path.startsWith("conditions")) {
                        path = "conditions";
                    } else {
                        path = item.path;
                    }
                    acc[path] = item.message;
                    return acc;
                }, {}) || err;

                setSegmentsErrors(errors);
            });
    }, [segmentName, conditions, createNewSegment, onCloseActions, setSegmentsErrors]);

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
                        errors={segmentErrors}
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
    editSegment: updateSegment,
};

export default connect(mapState, mapDispatch)(SegmentCreateModal);