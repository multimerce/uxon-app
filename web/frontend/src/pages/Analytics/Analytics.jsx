import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Page, Stack } from '@shopify/polaris';
import {createStructuredSelector} from 'reselect';
import {analyticsSelector, fetchAnalytics} from '../../store';
import HeaderInfo from '../../components/analytics/HeaderInfo/HeaderInfo';
import CorePerformInfo from '../../components/analytics/CorePerformInfo/CorePerformInfo';
import SegmentsAnalytics from '../../components/analytics/SegmentsAnalytics/SegmentsAnalytics';
import Loader from "../../components/Loader/Loader";

dayjs.extend(utc);

const dateParamsInitial = {
    dateStart: dayjs().utc().subtract(30, 'day').format('YYYY-MM-DD'),
    dateEnd: dayjs().utc().format('YYYY-MM-DD'),
};

const Analytics = ({title, fetchAllAnalytics, allAnalytics: { data = {}, loading }}) => {
    const [dateParams, setDateParams] = useState(dateParamsInitial);
    const [analytics, setAnalytics] = useState({
        commonAnalytics: {},
        fetchedAnalytics: [],
    });
    const isLoading = typeof loading === 'boolean' ? loading : true;

    useEffect(() => {
        fetchAllAnalytics(dateParams);
    }, [dateParams, fetchAllAnalytics]);

    useEffect(() => {
        setAnalytics(data);
    }, [data, setAnalytics]);


    return (
        <Page narrowWidth title={title}>
            {
                isLoading
                    ? <Loader/>
                    : (
                        <Stack vertical spacing='extraLoose'>
                            <HeaderInfo/>
                            <CorePerformInfo
                                setDateParams={setDateParams}
                                analytics={analytics.commonAnalytics}/>
                            <SegmentsAnalytics fetchedAnalytics={analytics.fetchedAnalytics}/>
                        </Stack>
                    )
            }
        </Page>
    );
};

const mapState = createStructuredSelector({
    allAnalytics: analyticsSelector,
});

const mapDispatch = {
    fetchAllAnalytics: fetchAnalytics
};

export default connect(mapState, mapDispatch)(Analytics);
