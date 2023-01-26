import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from './routes/Routes';
import NotificationProvider from "use-toast-notification";


function App() {
    return (
        <BrowserRouter>
            <NotificationProvider config={{
                position: 'top-right',
                isCloseable: false,
                showTitle: true,
                showIcon: true,
                duration: 5,
            }}>
                <Routes/>
            </NotificationProvider>
        </BrowserRouter>
    );
}

export default App;
