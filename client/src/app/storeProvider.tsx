'use client'

import { ReactNode } from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";

import { store } from '../server/store'

const persistor = persistStore(store)

export default function StoreProvider({ children }: { children: ReactNode }) {

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                {children}
            </PersistGate>
        </Provider>
    )

}