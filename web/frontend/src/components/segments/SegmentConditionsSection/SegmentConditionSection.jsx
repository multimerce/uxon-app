import React, {useCallback, useEffect, useState} from 'react';
import {Stack} from '@shopify/polaris';
import {SEGMENT_CONDITIONS} from '../../../common/constants/constants';
import FormSelect from "../../common/FormSelect/FormSelect";
import FormTextField from "../../common/FormTextField/FormTextField";

const SegmentConditionSection = ({conditionType, addConditions, conditions}) => {
    const renderConditionsSelects = useCallback(() => {
        return SEGMENT_CONDITIONS[conditionType].blocks.map((block, index) => {
            if (conditionType === 'websiteActivity'
                && conditions.period === 'overAllTime'
                && (block.name === 'duration' || block.name === 'unitOfTime')) {
                return null;
            }

            switch (block.type) {
                case 'select':
                    return (
                        <FormSelect
                            key={index}
                            name={block.name}
                            isLabelHidden={true}
                            label={block.label}
                            options={block.options}
                            value={conditions[block.name] || block.options[0].value}
                            addConditions={addConditions}
                        />
                    )
                case 'textField':
                    return (
                        <FormTextField
                            key={index}
                            name={block.name}
                            subtype={block.subtype}
                            isLabelHidden={true}
                            label={block.label}
                            value={conditions[block.name] || block.defaultValue}
                            addConditions={addConditions}
                        />
                    )
                default:
                    return null;
            }
        });
    }, [SEGMENT_CONDITIONS, conditionType, conditions, addConditions])

    return (
        <Stack distribution="fill" wrap={false}>
            {renderConditionsSelects()}
        </Stack>
    );
};

export default SegmentConditionSection;