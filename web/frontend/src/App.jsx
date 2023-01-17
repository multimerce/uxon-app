import {BrowserRouter} from 'react-router-dom';
import {NavigationMenu} from '@shopify/app-bridge-react';
import {Provider} from 'react-redux';
import {store} from './store';
import {
    AppBridgeProvider,
    QueryProvider,
    PolarisProvider,
} from './components';
import AppRoute from './common/routes/AppRoute';
import './App.scss';

export default function App() {
    // Any .tsx or .jsx files in /pages will become a route
    // See documentation for <Routes /> for more info
    const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

    return (
        <Provider store={store}>
            <PolarisProvider>
                <BrowserRouter>
                    <AppBridgeProvider>
                        <QueryProvider>
                            <NavigationMenu
                                navigationLinks={[
                                    {
                                        label: "Segments",
                                        destination: "/segments",
                                    },
                                    {
                                        label: "Analytics",
                                        destination: "/analytics",
                                    },
                                    {
                                        label: "Integration",
                                        destination: "/integration",
                                    },
                                    {
                                        label: "Plans",
                                        destination: "/plans",
                                    },
                                ]}
                            />
                            <AppRoute/>
                        </QueryProvider>
                    </AppBridgeProvider>
                </BrowserRouter>
            </PolarisProvider>
        </Provider>
    );
}
