import React from 'react';
import {Select} from '@shopify/polaris';

const FormSelect = ({name, index, isLabelHidden, label, options, value, addConditions}) => {

    return (
        <Select
            label={label}
            labelHidden={isLabelHidden}
            options={options}
            value={value}
            onChange={(newValue) => addConditions(newValue, name, index)}
        />
    );
};

export default FormSelect;