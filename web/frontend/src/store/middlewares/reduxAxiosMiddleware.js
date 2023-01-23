import {multiClientMiddleware} from 'redux-axios-middleware';
import {axiosClientOptions} from './axiosClientOptions';

const clientOptions = axiosClientOptions();

export default multiClientMiddleware({
    default: clientOptions,
    graphQl: clientOptions,
});