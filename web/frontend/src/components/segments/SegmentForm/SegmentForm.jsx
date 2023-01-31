import React, {useCallback} from 'react';
import {TextStyle, FormLayout, TextField, Icon, Stack, Text} from '@shopify/polaris';
import {AlertMinor} from '@shopify/polaris-icons';
import SegmentConditionsList from '../SegmentConditionsList/SegmentConditionsList';
import styles from './SegmentForm.module.scss';

const SegmentForm = (props) => {
    const {conditions, addCondition, removeCondition, setConditions, segmentName, setSegmentName, errors, segmentHandles, setSegmentHandles} = props;
    const handleChangeName = useCallback((newName) => {
        setSegmentName(newName)
    }, [setSegmentName]);

    const setErrors = (fieldName) => (errors && errors[fieldName]) && errors[fieldName];

    const renderHandles = segmentHandles.map((handle) => {
        return <Text as='span' variant='bodyMd' fontWeight='bold'>{handle}</Text>
    });

    return (
        <FormLayout>
            <TextField
                label='Keep segments organised by giving them a name'
                value={segmentName}
                onChange={handleChangeName}
                placeholder='Title'
                autoComplete='off'
                error={setErrors('name')}
            />

            {/*<Text as='span' variant='bodyMd'>Handle:</Text>*/}

            {/*{renderHandles}*/}

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

            {
                (errors && errors.hasOwnProperty('conditions')) &&
                <Stack wrap={false} alignment='leading' vertical={false}>
                    <div className={styles.ErrorIcon}>
                        <Icon
                            source={AlertMinor}
                            color="critical"
                        />
                    </div>
                    <TextStyle variation="negative">
                        {setErrors('conditions')}
                    </TextStyle>
                </Stack>
            }

        </FormLayout>
    );
};

export default SegmentForm;
