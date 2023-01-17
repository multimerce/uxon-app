import React, {useCallback, useState} from 'react';
import {TextField} from '@shopify/polaris';
import classNames from 'classnames';
import styles from './FormTextField.module.scss';

const FormTextField = ({name, subtype, isLabelHidden, label, value, onChange, addConditions}) => {
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

    const handleChange = useCallback((data) => {
        onChange(data);
    }, [onChange]);

    const classnames = classNames((subtype === 'number') && styles.TextFieldNumberType);

    return (
        <div className={classnames}>
            <TextField
                label={label}
                type={subtype}
                labelHidden={isLabelHidden}
                value={value}
                onChange={(newValue) => handleSelectConditionChange(newValue, name)}
                autoComplete='off'
            />
        </div>
    );
};

export default FormTextField;