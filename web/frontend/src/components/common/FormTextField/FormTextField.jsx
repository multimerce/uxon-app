import React from 'react';
import {TextField} from '@shopify/polaris';
import classNames from 'classnames';
import styles from './FormTextField.module.scss';

const FormTextField = ({name, subtype, isLabelHidden, label, value, addConditions}) => {
    const classnames = classNames((subtype === 'number') && styles.TextFieldNumberType);

    return (
        <div className={classnames}>
            <TextField
                label={label}
                type={subtype}
                labelHidden={isLabelHidden}
                value={value}
                onChange={(newValue) => addConditions(newValue, name)}
                autoComplete='off'
            />
        </div>
    );
};

export default FormTextField;