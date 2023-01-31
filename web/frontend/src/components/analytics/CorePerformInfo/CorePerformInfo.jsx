import React, {useCallback, useState, useMemo, useEffect} from 'react';
import {Card, Select, Stack, Text} from '@shopify/polaris';
import {moneyFormatting} from '../../../utils/moneyFormatting';
import {COMMON_ANALYTICS} from '../../../common/constants/constants';
import './CorePerformInfo.scss';

const CorePerformInfo = ({analytics}) => {
    const [selected, setSelected] = useState('pastMonth');
    const [commonAnalytics, setCommonAnalytics] = useState({});

    useEffect(() => {
        setCommonAnalytics(analytics);
    }, [setCommonAnalytics, analytics]);

    const handleSelectChange = useCallback((value) => setSelected(value), []);

    const dateOptions = [
        {label: 'Today', value: 'today'},
        {label: 'Past week', value: 'pastWeek'},
        {label: 'Past 30 days', value: 'pastMonth'},
    ];

    const renderCommonAnalytics = useMemo(() => {
        return Object.entries(commonAnalytics).map(([key, value]) => {
            const {title, type} = COMMON_ANALYTICS[key];
            const setValue =
                type === 'money' ? moneyFormatting(value) : type === 'percentage' ? `${value} %` : value;

            return (
                <Stack.Item key={key}>
                    {/*<Card sectioned>*/}
                        <Stack vertical alignment='center' spacing='none'>
                            <Text as='h6' variant='headingMd'>
                                {title}
                            </Text>
                            <Text as='span' variant='heading3xl' color='subdued' fontWeight='regular'>
                                {setValue}
                            </Text>
                        </Stack>
                    {/*</Card>*/}
                </Stack.Item>
            )
        })
    }, [commonAnalytics]);

    return (
        <Card>
            <Card.Section>
                <Stack distribution='equalSpacing' alignment='center'>
                    <Text variant="headingLg" as="h5">
                        Core performance
                    </Text>
                    <Select
                        labelHidden
                        label="Date range"
                        options={dateOptions}
                        onChange={handleSelectChange}
                        value={selected}
                    />
                </Stack>
            </Card.Section>
            <Card.Section>
                <div className='CommonAnalytics'>
                    <Stack distribution='fillEvenly' wrap={false}>
                        {renderCommonAnalytics}
                    </Stack>
                </div>
            </Card.Section>
        </Card>
    );
};

export default CorePerformInfo;