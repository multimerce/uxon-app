import {Badge, Text} from '@shopify/polaris';

const AnalyticsTableRow = (data, columns) => {
    const createRow = (item) =>
        columns.map(({id}) => {
            switch (id) {
                case 'affinity':
                    //TODO: determine how the affinity is calculated
                    return <Badge status="info">200x</Badge>;
                case 'segments':
                    return <Text as='span' variant='bodyLg' fontWeight='bold'>{item[id]}</Text>;
                case 'revenue':
                    return <Text as='span' variant='bodyMd' color='subdued'>{item[id].toFixed(2)}</Text>;
                default:
                    return <Text as='span' variant='bodyMd' color='subdued'>{item[id]}</Text>;
            }
        });
    return Array.isArray(data) ? data.map((item) => createRow(item)) : [];
}

export default AnalyticsTableRow;