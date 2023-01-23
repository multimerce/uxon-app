import React, {useCallback, useEffect, useState} from 'react';
import {Button, Card, Icon, Stack, TextStyle} from '@shopify/polaris';
import {MobilePlusMajor} from '@shopify/polaris-icons';
import {CONDITIONS_DEFAULT_VALUES} from '../../../common/constants/constants';
import './SegmentConditionsCard.scss';
import SegmentConditionsStack from '../SegmentConditionsStack/SegmentConditionsStack';

const INIT_ADD_COND_STATE = {
    hasAddCond: false,
    isAddCond: true,
};

const SegmentConditionsCard = (props) => {
    const {
        index,
        conditionsCard,
        hasPreviousCond,
        addCondition,
        removeCondition,
        setConditions,
    } = props;
    const [hasAdditionalCond, setHasAdditionalCond] = useState(INIT_ADD_COND_STATE.hasAddCond);

    //TODO: check if orList is an object
    useEffect(() => {
        if (conditionsCard.hasOwnProperty('orList') && conditionsCard.orList?.length > 0) {
            setHasAdditionalCond(true);
        } else {
            setHasAdditionalCond(false);
        }
    }, [conditionsCard, conditionsCard.orList, setHasAdditionalCond]);


    const handleAddNewCard = () => addCondition({});

    const handleRemoveCard = () => removeCondition(index);

    const handleRemoveAddCond = (condIndex) => {
        setConditions((prevState) => prevState.map((cond, i) => {
            if (index === i) {
                const newOrList = cond?.orList.filter((_, addIndex) => addIndex !== condIndex);

                return {
                    ...cond,
                    orList: newOrList
                }
            } else {
                return cond;
            }
        }));
    };

    const handleSelectType = useCallback(
        (value, condIndex) => {
            const newCond = {
                conditionType: value,
                ...CONDITIONS_DEFAULT_VALUES[value],
            };
            setConditions((prevState) => prevState.map((cond, i) => condIndex === i ? newCond : cond));
        },
        [setConditions],
    );

    const handleSelectAddType = useCallback(
        (value, condIndex) => {
            const newCond = {
                conditionType: value,
                ...CONDITIONS_DEFAULT_VALUES[value],
            };

            setConditions((prevState) => prevState.map((cond, i) => {
                if (index === i) {
                    const newOrList = cond?.orList.map((addCond, addCondIndex) =>
                        addCondIndex === condIndex ? newCond : addCond);
                    return {
                        ...cond,
                        orList: newOrList
                    }
                } else {
                    return cond;
                }
            }));
        },
        [setConditions, index],
    );

    const handleSetConditions = useCallback(
        (value, conditionName, condIndex) => {
            setConditions((prevState) => prevState.map((cond, i) => {
                if (condIndex === i) {
                    return {
                        ...cond,
                        [conditionName]: value,
                    }
                } else {
                    return cond;
                }
            }));
        },
        [setConditions],
    );

    const handleSetAddConditions = useCallback(
        (value, conditionName, condIndex) => {

            setConditions((prevState) => prevState.map((cond, i) => {
                if (index === i) {
                    const newOrList = cond?.orList.map((addCond, addCondIndex) =>
                        addCondIndex === condIndex ? {...addCond, [conditionName]: value,} : addCond);
                    return {
                        ...cond,
                        orList: newOrList
                    }
                } else {
                    return cond;
                }
            }));
        },
        [setConditions, index],
    );

    const handleOr = useCallback(() => {
        setConditions((prevState) => prevState.map((cond, i) => {
            return (index === i ? {...cond, orList: [ ...cond.orList, {}]} : cond);
        }));
    }, [setConditions]);

    const {hasAddCond, isAddCond} = INIT_ADD_COND_STATE;

    const renderAdditionalConditions = () => {
        const addCondArr = conditionsCard?.orList || [];

        return addCondArr.map((condItem, i) => {
            return (
                <SegmentConditionsStack
                    key={i}
                    index={i}
                    isAddCond={isAddCond}
                    conditionsCard={condItem}
                    hasAdditionalCond={hasAddCond}
                    handleRemoveCard={handleRemoveAddCond}
                    handleSelectType={handleSelectAddType}
                    handleSetConditions={handleSetAddConditions}
                    handleOr={handleOr}
                    additionalCondLength={addCondArr?.length - 1}
                />
            );
        });
    };

    const placeholder = <TextStyle variation="subdued">Set type...</TextStyle>

    return (
        <div className="ConditionCard">
            <Stack vertical distribution='fill'>
                <Card sectioned>
                    <SegmentConditionsStack
                        index={index}
                        isAddCond={!isAddCond}
                        conditionsCard={conditionsCard}
                        hasAdditionalCond={hasAdditionalCond}
                        handleRemoveCard={handleRemoveCard}
                        handleSelectType={handleSelectType}
                        handleSetConditions={handleSetConditions}
                        handleOr={handleOr}
                        additionalCondLength={0}
                    />

                    {renderAdditionalConditions()}
                </Card>

                <Button disabled={!conditionsCard?.conditionType || !hasPreviousCond} onClick={handleAddNewCard}>
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