module.exports.getCommonAnalytics = (fetchedAnalytics) => {
    let attributedRevenue = 0;
    let interactions = 0;

    fetchedAnalytics.forEach((item) => {
        attributedRevenue += item.revenue;
        interactions += item.interactions;
    });

    //TODO: determine how the conversionRate is calculated
    return {
        revenue: +attributedRevenue.toFixed(2),
        interactions,
        conversionRate: 0
    };
};