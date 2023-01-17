import React, {useMemo} from 'react';
import SegmentConditionsCard from '../SegmentConditionsCard/SegmentConditionsCard';

const SegmentConditionsList = (props) => {
    const {conditionsCards = []} = props;

    if (conditionsCards.length === 0) {
        conditionsCards.push({});
    }

    const renderConditionsCards = useMemo(
        () => conditionsCards.map((card, index) => {
            const hasPreviousCond = (conditionsCards.length - 1) === index;

            return (
                <SegmentConditionsCard
                    key={index}
                    index={index}
                    conditionsCard={card}
                    hasPreviousCond={hasPreviousCond}
                    {...props}
                />
            )
        }),
        [conditionsCards],
    );

    return (
        <>
            {renderConditionsCards}
        </>
    );
};

export default SegmentConditionsList;