import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../features/game/store/gameSlice'

export const store = configureStore({
    reducer: {
        game: gameReducer,
    },
    // Redux Toolkit checks for serializability by default.
    // Since we aren't storing class instances yet, this is fine.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: true,
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;