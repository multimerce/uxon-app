import * as Yup from 'yup';

export const segmentValidationsSchema = Yup.object().shape({
    name: Yup.string().max(100, 'Segment name is too long').required('Field is required'),
    conditions: Yup.array().of(Yup.object().shape({
        conditionType: Yup.string().required('Please, fill all conditions fields'),
    }))
});