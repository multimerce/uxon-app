export const SEGMENT_CONDITIONS_TYPES = [
    { label: 'User Location', value: 'userLocation' },
    { label: 'Website Activity', value: 'websiteActivity' },
    { label: 'Customer Segments', value: 'customerSegments' },
];

export const SEGMENT_CONDITIONS = {
    userLocation: {
        blocks: [
            {
                label: 'User',
                name: 'user',
                type: 'select',
                options: [
                    { label: 'is', value: 'is' },
                    { label: 'is not', value: 'isNot' },
                ],
            },
            {
                label: 'in',
                name: 'country',
                type: 'select',
                options: [
                    { label: 'Canada', value: 'canada' },
                    { label: 'United States', value: 'usa' },
                ],
                placeholder: 'Choose a country...',
            }
        ]
    },
    websiteActivity: {
        blocks: [
            {
                label: 'User has',
                name: 'userHas',
                type: 'select',
                options: [
                    { label: 'Visited page', value: 'visitedPage' },
                    { label: 'Added to cart', value: 'addedToCart' },
                    { label: 'Placed order', value: 'placedOrder' },
                ]
            },
            {
                label: null,
                name: 'ratio',
                type: 'select',
                options: [
                    { label: 'equals', value: 'equals' },
                    { label: 'is greater than', value: 'isGreaterThan' },
                    { label: 'is less than', value: 'isLessThan' },
                ]
            },
            {
                label: null,
                name: 'period',
                type: 'select',
                options: [
                    { label: 'over all time', value: 'overAllTime' },
                    { label: 'in the last', value: 'inTheLast' },
                ]
            },
            {
                label: null,
                name: 'duration',
                type: 'textField',
                subtype: 'number',
                defaultValue: 30,
            },
            {
                label: null,
                name: 'unitOfTime',
                type: 'select',
                options: [
                    { label: 'hours', value: 'hours' },
                    { label: 'days', value: 'days' },
                    { label: 'weeks', value: 'weeks' },
                ]
            }
        ]
    },
    customerSegments: {
        blocks: [
            {
                label: 'Customer segment',
                name: 'customerSegment',
                type: 'select',
                options: [
                    { label: 'is', value: 'is' },
                    { label: 'is not', value: 'isNot' },
                ]
            },
        ]
    }
};

export const CONDITIONS_DEFAULT_VALUES = {
    userLocation: {
        user: 'is',
        country: 'canada',
    },
    websiteActivity: {
        userHas: 'visitedPage',
        ratio: 'equals',
        period: 'overAllTime',
        duration: 30,
        unitOfTime: 'days',
    },
    customerSegments: {
        customerSegment: 'is',
    }
};
