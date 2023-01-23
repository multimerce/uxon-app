import React, {useEffect, useState} from 'react';
import {Button, FormLayout, Select, Stack, TextStyle} from '@shopify/polaris';
import {SEGMENT_CONDITIONS_TYPES} from '../../../common/constants/constants';
import SegmentConditionSection from '../SegmentConditionsSection/SegmentConditionSection';
import {CancelMajor} from '@shopify/polaris-icons';
import classNames from 'classnames';

const SegmentConditionsStack = (props) => {
    const {
        index,
        conditionsCard,
        hasAdditionalCond,
        handleRemoveCard,
        isAddCond,
        handleSelectType,
        handleSetConditions,
        handleOr,
        additionalCondLength,
    } = props;

    const [isShowOrButton, setIsShowOrButton] = useState(false);

    const {conditionType = ''} = conditionsCard;

    useEffect(() => {
        const isShow = (hasAdditionalCond || (isAddCond && (!conditionType || additionalCondLength !== index)));
        setIsShowOrButton(isShow);
    }, [setIsShowOrButton, hasAdditionalCond, isAddCond, conditionType, additionalCondLength]);

    const buttonClassNames = classNames('OrButton', {'OrButton__disable': isShowOrButton});

    return (
        <>
            <Stack alignment='center' wrap={false}>
                <Stack.Item fill>
                    <FormLayout>
                        <Select
                            labelHidden
                            label='Segment type'
                            options={SEGMENT_CONDITIONS_TYPES}
                            value={conditionType}
                            placeholder='Please, select a condition type...'
                            onChange={(value) => handleSelectType(value, index)}
                        />

                        {
                            conditionType &&
                            <SegmentConditionSection
                                conditionType={conditionType}
                                addConditions={handleSetConditions}
                                conditions={conditionsCard}
                                index={index}
                            />
                        }

                    </FormLayout>
                </Stack.Item>

                {
                    conditionType &&
                    <Stack.Item>
                        <FormLayout>
                            <Stack distribution='center' spacing='baseTight'>
                                <Button
                                    icon={CancelMajor}
                                    plain
                                    onClick={() => {
                                        handleRemoveCard(index);
                                        setIsShowOrButton(true);
                                    }}
                                />
                            </Stack>

                            <div className={buttonClassNames}>
                                <Button
                                    onClick={() => {
                                        handleOr();
                                        setIsShowOrButton(true);
                                    }}
                                    disabled={isShowOrButton}
                                >
                                    <TextStyle variation='strong'>
                                        OR
                                    </TextStyle>
                                </Button>
                            </div>
                        </FormLayout>
                    </Stack.Item>
                }
            </Stack>

            {
                isShowOrButton &&
                <div className='Separator'>
                    <Stack alignment='center'>
                        <Stack.Item>
                            <div className='OrButton'>
                                <Button disabled>
                                    <TextStyle variation='strong'>
                                        OR
                                    </TextStyle>
                                </Button>
                            </div>
                        </Stack.Item>

                        <Stack.Item fill>
                            <div className='Separator__dashedLine'/>
                        </Stack.Item>
                    </Stack>
                </div>

            }
        </>
    );
};

export default SegmentConditionsStack;