import React, {useCallback, useState} from 'react';
import {Select} from '@shopify/polaris';

const FormSelect = ({name, isLabelHidden, label, options, value, onChange, addConditions}) => {
    const [conditionValue, setConditionValue] = useState();

    const handleSelectConditionChange = useCallback(
        (newValue, conditionName) => {
            setConditionValue(newValue);
            addConditions((prevState) => {
                return {
                    ...prevState,
                    [conditionName]: newValue,
                }
            });
        },
        [setConditionValue, addConditions],
    );

    return (
        <Select
            label={label}
            labelHidden={isLabelHidden}
            options={options}
            value={value}
            onChange={(newValue) => handleSelectConditionChange(newValue, name)}
        />
    );
};

export default FormSelect;