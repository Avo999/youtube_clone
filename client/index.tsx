import React from 'react'
import { createRoot } from 'react-dom/client'
import App from "./src/App";
import {Provider} from "react-redux";
import { store , persistor} from "./src/redux/store";
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('app-root')!
const root = createRoot(container)

root.render(
    <Provider store={store}>
       <PersistGate persistor={persistor}>
        <App/>
       </PersistGate>
    </Provider>
)