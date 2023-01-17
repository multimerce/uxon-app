import React, {useCallback, useEffect, useState} from 'react';
import {Button, Card, FormLayout, Icon, Select, Stack, TextStyle} from '@shopify/polaris';
import {CancelMajor, MobilePlusMajor} from '@shopify/polaris-icons';
import SegmentConditionSection from '../SegmentConditionsSection/SegmentConditionSection';
import {SEGMENT_CONDITIONS_TYPES, CONDITIONS_DEFAULT_VALUES} from '../../../common/constants/constants';
import './SegmentConditionsCard.scss';

const SegmentConditionsCard = ({
                                   index,
                                   conditionsCard,
                                   hasPreviousCond,
                                   addCondition,
                                   removeCondition,
                                   setConditions
                               }) => {
    const [conditionsList, setConditionsList] = useState({});
    const [conditionType, setConditionType] = useState();

    useEffect(() => {
        setConditionsList(conditionsCard);
        if (!!conditionsCard.conditionType) {
            setConditionType(conditionsCard.conditionType);
        }
    }, [conditionsCard, setConditionsList, setConditionType]);

    const handleSelectType = useCallback(
        (value) => {
            const newCond = {
                conditionType: value,
                ...CONDITIONS_DEFAULT_VALUES[value],
            };
            setConditionType(value);
            setConditionsList(newCond);
            setConditions((prevState) => prevState.map((cond, i) => index === i ? newCond : cond));
        },
        [setConditionType, setConditionsList, setConditions],
    );

    const handleAddNewCard = useCallback(() => {
        addCondition({});
    }, [conditionsList, addCondition]);

    const handleRemoveCard = useCallback(() => {
        removeCondition(index);
    }, [removeCondition])

    const placeholder = <TextStyle variation="subdued">Set type...</TextStyle>

    return (
        <div className="ConditionCard">
            <Stack vertical distribution='fill'>
                <Card sectioned>
                    <Stack alignment='center' wrap={false}>
                        <Stack.Item fill>
                            <FormLayout>
                                <Select
                                    labelHidden
                                    label='Segment name'
                                    options={SEGMENT_CONDITIONS_TYPES}
                                    value={conditionType}
                                    placeholder='Please, select a condition type...'
                                    onChange={handleSelectType}
                                />

                                {
                                    conditionType &&
                                    <SegmentConditionSection
                                        conditionType={conditionType}
                                        addConditions={setConditionsList}
                                        conditions={conditionsList}
                                    />
                                }

                            </FormLayout>
                        </Stack.Item>

                        {
                            conditionType &&
                            <Stack.Item>
                                <FormLayout>
                                    <Stack distribution='center' spacing='baseTight'>
                                        <Button icon={CancelMajor} plain onClick={handleRemoveCard}/>
                                    </Stack>

                                    <div className='OrButton'>
                                        <Button disabled>
                                            <TextStyle variation='strong'>
                                                OR
                                            </TextStyle>
                                        </Button>
                                    </div>
                                </FormLayout>
                            </Stack.Item>
                        }
                    </Stack>
                </Card>

                <Button disabled={!conditionType || !hasPreviousCond} onClick={handleAddNewCard}>
                    <Stack alignment='center' spacing='tight'>
                        <Icon source={MobilePlusMajor}/>
                        <TextStyle variation='strong'>
                            AND
                        </TextStyle>
                    </Stack>
                </Button>
            </Stack>
        </div>
    );
};

export default SegmentConditionsCard;