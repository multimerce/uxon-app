import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {createLogger} from 'redux-logger/src';
import createRootReducers from './rootReducers';
// import multiClientMiddleware from './middleware/axios';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';

export const history = createBrowserHistory({
    basename: '/',
});

let applyMiddlewares;
// const middleware = [thunk, multiClientMiddleware];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    });
    middleware.push(logger);
    applyMiddlewares = composeWithDevTools(applyMiddleware(...middleware));
} else applyMiddlewares = applyMiddleware(...middleware);

export const store = createStore(createRootReducers, applyMiddlewares);