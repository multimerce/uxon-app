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
            },
        ],
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
                ],
            },
            {
                label: null,
                name: 'ratio',
                type: 'select',
                options: [
                    { label: 'equals', value: 'equals' },
                    { label: 'is greater than', value: 'isGreaterThan' },
                    { label: 'is less than', value: 'isLessThan' },
                ],
            },
            {
                label: null,
                name: 'period',
                type: 'select',
                options: [
                    { label: 'over all time', value: 'overAllTime' },
                    { label: 'in the last', value: 'inTheLast' },
                ],
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
                ],
            },
        ],
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
                ],
            },
            {
                label: null,
                name: 'searchField',
                type: 'textField',
                subtype: 'text',
            },
        ],
    },
};

export const CONDITIONS_DEFAULT_VALUES = {
    userLocation: {
        user: 'is',
        country: 'canada',
        orList: [],
    },
    websiteActivity: {
        userHas: 'visitedPage',
        ratio: 'equals',
        period: 'overAllTime',
        duration: 30,
        unitOfTime: 'days',
        orList: [],
    },
    customerSegments: {
        customerSegment: 'is',
        orList: [],
    },
};

export const SEGMENTS_STATUSES = ['archived', 'ready', 'inUse'];

export const COMMON_ANALYTICS = {
    revenue: {
        title: 'Attributed revenue',
        type: 'money',
        amount: 1000,
    },
    interactions: {
        title: 'Interactions',
        type: 'number',
        amount: 200,
    },
    conversionRate: {
        title: 'Conversion rate',
        type: 'percentage',
        amount: 8.2,
    },
};

export const ANALYTICS_TABS = [
    {
        id: 'all',
        content: 'All'
    }
];

export const SEGMENTS_TABS = [
    {
        id: 'all',
        content: 'All',
    },
    {
        id: 'inUse',
        content: 'In use',
    },
    {
        id: 'ready',
        content: 'Ready',
    },
    {
        id: 'archived',
        content: 'Archived',
    },
];

export const TABLES = {
    analytics: [
        { id: 'segments', heading: 'Segment', type: 'text', sortable: true },
        { id: 'revenue', heading: 'Attributed revenue', type: 'numeric', sortable: true },
        { id: 'interactions', heading: 'Interactions', type: 'numeric', sortable: true },
        { id: 'affinity', heading: 'Affinity', type: 'text', sortable: false },
    ]
}