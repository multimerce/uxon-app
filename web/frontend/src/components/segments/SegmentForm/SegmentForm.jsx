import React, {useCallback} from 'react';
import {TextStyle, FormLayout, TextField} from '@shopify/polaris';
import SegmentConditionsList from '../SegmentConditionsList/SegmentConditionsList';

const SegmentForm = ({conditions, addCondition, removeCondition, setConditions, segmentName, setSegmentName}) => {
    const handleChangeName = useCallback((newName) => {
        setSegmentName(newName)
    }, [setSegmentName]);

    return (
        <FormLayout>
            <TextField
                label='Keep segments organised by giving them a name'
                value={segmentName}
                onChange={handleChangeName}
                placeholder='Title'
                autoComplete='off'
            />

            <hr/>

            <TextStyle variation="strong">
                Conditions:
            </TextStyle>

            <SegmentConditionsList
                conditionsCards={conditions}
                addCondition={addCondition}
                removeCondition={removeCondition}
                setConditions={setConditions}
            />

        </FormLayout>
    );
};

export default SegmentForm;
